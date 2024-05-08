import requests

# Replace these with your Blynk Auth Token and Device ID
auth_token = "asKr-NMlkysxjqczEW7mFWvNDldciFg6"
device_id = "1"


url = "https://fra1.blynk.cloud/api/v1/organization/device/datastream/history"
headers = {
    "Authorization": "Bearer asKr-NMlkysxjqczEW7mFWvNDldciFg6"
}
params = {
    "deviceId": "0",
    "pin": "v0"
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    print(data)  # or do whatever you want with the data
else:
    print("Error:", response.status_code)
    print(response.text)
