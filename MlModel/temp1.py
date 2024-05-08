import requests

url = "https://fra1.blynk.cloud/api/v1/organization/device/datastream/history"
headers = {
    "Authorization": "Bearer asKr-NMlkysxjqczEW7mFWvNDldciFg6"
}
params = {
    "deviceId": "1",
    "pin": "v1"
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print("Error:", response.status_code)