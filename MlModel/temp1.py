import http.client
import json

conn = http.client.HTTPSConnection("account.uipath.com")

headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)",
 "Content-Type": "application/json" 
}

payload = json.dumps({
  "grant_type": "refresh_token",
  "client_id": "8DEv1AMNXczW3y4U15LL3jYf62jK93n5",
  "refresh_token": "1Rwu_hP3L4ClX1CYgG-Uo2pDrwlflXG22LCkgf3vMZdbp"
})

conn.request("POST", "/oauth/token", payload, headersList)
response = conn.getresponse()
result = response.read().decode("utf-8")
result = json.loads(result)

print(result["access_token"])