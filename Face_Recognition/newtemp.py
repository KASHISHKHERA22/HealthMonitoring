import cv2
import face_recognition

# Load known image
known_image = face_recognition.load_image_file("kashish.jpg")
known_encoding = face_recognition.face_encodings(known_image)[0]

# Load another image for comparison
comparison_image = face_recognition.load_image_file("image2.jpg")
comparison_encoding = face_recognition.face_encodings(comparison_image)[0]

# Compare the encodings
results = face_recognition.compare_faces([known_encoding], comparison_encoding)

# Print verification result
if results[0]:
    print("Verified!!!")
else:
    print("Not verified!!")
