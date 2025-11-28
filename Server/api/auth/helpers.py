from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import HTTPException
import os
import hashlib
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 30

if not SECRET_KEY:
    raise ValueError("SECRET_KEY not found in environment variables (.env)")

# Stronger bcrypt policy (cost=12)
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12                     # Recommended for modern servers
)

# -----------------------------------------
# PASSWORD HASHING (Secure + 72-byte safe)
# -----------------------------------------
def get_password_hash(password: str):
    if not isinstance(password, str):
        raise ValueError("Password must be a string")

    # SHA-256 binary digest (32 bytes only)
    pre_hash = hashlib.sha256(password.encode('utf-8')).digest()

    return pwd_context.hash(pre_hash)



# -----------------------------------------
# PASSWORD VERIFICATION
# -----------------------------------------
def verify_password(plain_password: str, hashed_password: str):
    try:
        pre_hash = hashlib.sha256(plain_password.encode('utf-8')).digest()
        return pwd_context.verify(pre_hash, hashed_password)
    except Exception:
        return False


# -----------------------------------------
# JWT TOKEN CREATION
# -----------------------------------------
def create_access_token(data: dict , expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire_time = datetime.utcnow() + expires_delta
    else:
        expire_time = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire_time})

    try:
        token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return token
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Could not create access token"
        )
