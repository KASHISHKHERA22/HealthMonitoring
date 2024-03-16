from deepface import DeepFace
result = DeepFace.verify("IMG-20210113-WA0086.jpg", "download.jpg")

print("Is verified: ", result["verified"])