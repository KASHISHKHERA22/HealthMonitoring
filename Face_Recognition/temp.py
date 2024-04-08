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

# Prompt user to input name
person_name = input("Enter the name of the person: ")

while time.time() - start_time < timeout:
    remaining_time = int(timeout - (time.time() - start_time))
    # Capture frame-by-frame
    ret, frame = video_capture.read()

    # Convert frame to RGB (face_recognition uses RGB images)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Find face locations and encodings in the current frame
    face_locations = face_recognition.face_locations(rgb_frame)
    if face_locations:
        unknown_encoding = face_recognition.face_encodings(rgb_frame, face_locations)[0]

        # Compare the encoding of the unknown face with the known encoding
        results = face_recognition.compare_faces([known_encoding], unknown_encoding)

        # Increment total count
        total_count += 1

        if results[0]:
            success_count += 1

        # Draw a rectangle around the face
        for (top, right, bottom, left) in face_locations:
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

    # Display the remaining time
    cv2.putText(frame, f"Time remaining: {remaining_time} seconds", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

    # Display the frame
    cv2.imshow('Video', frame)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close all OpenCV windows
video_capture.release()
cv2.destroyAllWindows()

# Calculate success rate
success_rate = (success_count / total_count) * 100 if total_count != 0 else 0

# Print verification result
if success_rate > 80:
    print(f"{person_name} - Verified! Success rate: {success_rate:.2f}%")
else:
    print(f"{person_name} - Not verified. Success rate: {success_rate:.2f}%")