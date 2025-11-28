from pydantic import BaseModel, EmailStr, Field, BeforeValidator
from typing import Optional, Annotated

PyObjectId = Annotated[str, BeforeValidator(str)]

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserInDB(UserCreate):
    hashed_password: str

class UserResponse(BaseModel):
    id: PyObjectId = Field(alias="_id")
    username: str
    email: EmailStr

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


class UserResetPassword(BaseModel):
    email: EmailStr
    password: str