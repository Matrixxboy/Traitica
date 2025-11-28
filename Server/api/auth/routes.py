from utils.http_constants import HTTP_STATUS , HTTP_CODE
from utils.response_helper import make_response
import os
import re
from fastapi import APIRouter, HTTPException, status, Depends
from models.user import UserCreate, UserLogin, UserResponse , UserResetPassword
from database.connection import get_mongo_db
from datetime import timedelta
from dotenv import load_dotenv
load_dotenv()

from api.auth.helpers import create_access_token, get_password_hash, verify_password

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 30

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate):
    try:
        db = get_mongo_db()
        if not re.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", user.email):
            return make_response(
                status_code=HTTP_STATUS.BAD_REQUEST,
                code=HTTP_CODE["BAD_REQUEST"],
                message="Invalid email format",
                data=None,
                )
        existing_user_email = db.users.find_one({"email": user.email})
        if existing_user_email:
            return make_response(
                status_code=HTTP_STATUS.BAD_REQUEST,
                code=HTTP_CODE["BAD_REQUEST"],
                message="Email already registered",
                data=None,
                )
        existing_user = db.users.find_one({"username": user.username})
        if existing_user:
            return make_response(
                status_code=HTTP_STATUS.BAD_REQUEST,
                code=HTTP_CODE["BAD_REQUEST"],
                message="Username already registered",
                data=None,
                )
        user_password_pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        if not re.match(user_password_pattern, user.password):
            return make_response(
                status_code=HTTP_STATUS.BAD_REQUEST,
                code=HTTP_CODE["BAD_REQUEST"],
                message="Invalid password format",
                data=None,
                )
        hashed_password = get_password_hash(user.password)
        user_dict = user.dict()
        user_dict["hashed_password"] = hashed_password
        del user_dict["password"]

        new_user = db.users.insert_one(user_dict)
        created_user = db.users.find_one({"_id": new_user.inserted_id})
        return make_response(
            status_code=HTTP_STATUS.CREATED,
            code=HTTP_CODE["CREATED"],
            message="User created successfully",
            data=UserResponse(**created_user),
            )
    except Exception as e:
        return make_response(
            status_code=HTTP_STATUS.INTERNAL_SERVER_ERROR,
            code=HTTP_CODE["INTERNAL_SERVER_ERROR"],
            message=str(e),
            data=None,
            )

@router.post("/login")
def login(user: UserLogin):
    db = get_mongo_db()
    db_user = db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        return make_response(
            status_code=HTTP_STATUS.UNAUTHORIZED,
            code=HTTP_CODE["UNAUTHORIZED"],
            message="Incorrect email or password",
            data=None,
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user["email"]}, expires_delta=access_token_expires
    )
    data = {"access_token": access_token, "token_type": "bearer"}
    return make_response(
        status_code=HTTP_STATUS.OK,
        code=HTTP_CODE["OK"],
        message="Login successful",
        data=data,
    )

@router.post("/resetpassword")
def reset_password(user: UserResetPassword):
    try:
        db = get_mongo_db()
        db_user = db.users.find_one({"email": user.email})
        if not db_user:
            return make_response(
                status_code=HTTP_STATUS.NOT_FOUND,
                code=HTTP_CODE["NOT_FOUND"],
                message="User not found",
                data=None,
            )
        hashed_password = get_password_hash(user.password)
        user_dict = user.dict()
        user_dict["hashed_password"] = hashed_password
        del user_dict["password"]
        user_password_pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        if not re.match(user_password_pattern, user.password):
            return make_response(
                status_code=HTTP_STATUS.BAD_REQUEST,
                code=HTTP_CODE["BAD_REQUEST"],
                message="Invalid password format",
                data=None,
                )
        updated_user = db.users.update_one({"_id": db_user["_id"]}, {"$set": user_dict})
        if updated_user.modified_count == 0:
            return make_response(
                status_code=HTTP_STATUS.BAD_REQUEST,
                code=HTTP_CODE["BAD_REQUEST"],
                message="User not found",
                data=None,
            )
        return make_response(
            status_code=HTTP_STATUS.OK,
            code=HTTP_CODE["OK"],
            message="Password reset successfully",
            data=None,
        )
    except Exception as e:
        return make_response(
            status_code=HTTP_STATUS.INTERNAL_SERVER_ERROR,
            code=HTTP_CODE["INTERNAL_SERVER_ERROR"],
            message=str(e),
            data=None,
        )