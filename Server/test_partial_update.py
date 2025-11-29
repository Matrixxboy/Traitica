import requests
import json

BASE_URL = "http://localhost:8080"

def test_partial_update():
    # 1. Register
    email = "test_partial@example.com"
    password = "Test@123"
    username = "test_partial"
    
    print("Registering...")
    res = requests.post(f"{BASE_URL}/auth/register", json={
        "username": username,
        "email": email,
        "password": password
    })
    # Ignore error if already exists
    
    # 2. Login
    print("Logging in...")
    res = requests.post(f"{BASE_URL}/auth/login", json={
        "email": email,
        "password": password
    })
    if res.status_code != 200:
        print("Login failed:", res.text)
        return
    
    token = res.json()["data"]["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 3. Create Target
    print("Creating target...")
    target_data = {
        "name": {"fisrtName": "OriginalFirst", "lastName": "OriginalLast"},
        "age": "25",
        "city": "OriginalCity"
    }
    res = requests.post(f"{BASE_URL}/target/", json=target_data, headers=headers)
    if res.status_code != 201:
        print("Create failed:", res.text)
        return
    
    target_id = res.json()["data"]["_id"]
    print(f"Target created with ID: {target_id}")
    
    # 4. Partial Update
    print("Updating target (partial)...")
    update_data = {
        "name": {"fisrtName": "UpdatedFirst"}
    }
    # Note: We are NOT sending lastName, age, or city
    
    res = requests.put(f"{BASE_URL}/target/?target_id={target_id}", json=update_data, headers=headers)
    if res.status_code != 200:
        print("Update failed:", res.text)
        return
    
    updated_target = res.json()["data"]
    print("Updated Target:", json.dumps(updated_target, indent=2))
    
    # 5. Verify
    success = True
    if updated_target["name"]["fisrtName"] != "UpdatedFirst":
        print("FAIL: firstName not updated")
        success = False
    if updated_target["name"].get("lastName") != "OriginalLast":
        print(f"FAIL: lastName lost or changed: {updated_target['name'].get('lastName')}")
        success = False
    if updated_target.get("age") != "25":
        print(f"FAIL: age lost: {updated_target.get('age')}")
        success = False
    
    if success:
        print("SUCCESS: Partial update worked correctly!")
    else:
        print("FAILURE: Partial update failed.")

if __name__ == "__main__":
    test_partial_update()
