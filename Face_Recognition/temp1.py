import cv2
import face_recognition
import time

# Load known image
known_image = face_recognition.load_image_file("kashish.jpg")
known_encoding = face_recognition.face_encodings(known_image)[0]

# Initialize variables for calculating success rate
success_count = 0
total_count = 0

# Capture frames from webcam
video_capture = cv2.VideoCapture(0)

# Set timeout (in seconds)
timeout = 30
start_time = time.time()

while time.time() - start_time < timeout:
    remaining_time = int(timeout - (time.time() - start_time))
    ret, frame = video_capture.read()
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_frame)
    
    if face_locations:
        unknown_encoding = face_recognition.face_encodings(rgb_frame, face_locations)[0]
        results = face_recognition.compare_faces([known_encoding], unknown_encoding)
        total_count += 1
        
        if results[0]:
            success_count += 1
            success_rate = (success_count / total_count) * 100
            cv2.putText(frame, f"Verified! Success rate: {success_rate:.2f}%", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            color = (0, 255, 0) if success_rate > 80 else (0, 0, 255)
        else:
            cv2.putText(frame, f"Not verified. Success rate: {success_rate:.2f}%", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
            color = (0, 0, 255)
        
        for (top, right, bottom, left) in face_locations:
            # Draw a rectangle around the face
            cv2.rectangle(frame, (left, top), (right, bottom), color, 2)

    else:
        cv2.putText(frame, f"Time remaining: {remaining_time} seconds", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    # Display the frame
    cv2.imshow('Video', frame)
    
    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close all OpenCV windows
video_capture.release()
cv2.destroyAllWindows()