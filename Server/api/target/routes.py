from fastapi import APIRouter, Depends, HTTPException, status
from api.auth.helpers import get_current_user
from database.connection import get_mongo_db
from models.target import Target
from models.user import User
from utils.response_helper import make_response
from utils.http_constants import HTTP_STATUS, HTTP_CODE
from datetime import datetime
from bson import ObjectId
from utils.common import flatten_dict

router = APIRouter()

@router.post("/", response_description="Create a new target")
async def create_target(target: Target, user: User = Depends(get_current_user), db = Depends(get_mongo_db)):
    try:
        # Check if target already exists for this user
        existing_target = db.targets.find_one({"created_by": user.id})
        if existing_target:
            return make_response(
                status_code=HTTP_STATUS.BAD_REQUEST,
                code=HTTP_CODE["BAD_REQUEST"],
                message="Target already exists for this user",
                data=None
            )

        target_dict = target.dict(by_alias=True, exclude_none=True)
        target_dict["created_by"] = user.id
        target_dict["updated_by"] = user.id

        # Remove _id if it's None so Mongo generates one
        if "_id" in target_dict and target_dict["_id"] is None:
            del target_dict["_id"]

        new_target = db.targets.insert_one(target_dict)
        created_target = db.targets.find_one({"_id": new_target.inserted_id})

        return make_response(
            status_code=HTTP_STATUS.CREATED,
            code=HTTP_CODE["CREATED"],
            message="Target created successfully",
            data=Target(**created_target).dict(by_alias=True)
        )
    except Exception as e:
        return make_response(
            status_code=HTTP_STATUS.INTERNAL_SERVER_ERROR,
            code=HTTP_CODE["INTERNAL_SERVER_ERROR"],
            message=str(e),
            data=None
        )

@router.get("/", response_description="Get current user target")
async def get_target(user: User = Depends(get_current_user), db = Depends(get_mongo_db)):
    try:
        target = db.targets.find_one({"created_by": user.id})
        if target:
            return make_response(
                status_code=HTTP_STATUS.OK,
                code=HTTP_CODE["OK"],
                message="Target fetched successfully",
                data=Target(**target).dict(by_alias=True)
            )
        return make_response(
            status_code=HTTP_STATUS.NOT_FOUND,
            code=HTTP_CODE["NOT_FOUND"],
            message="Target not found",
            data=None
        )
    except Exception as e:
        return make_response(
            status_code=HTTP_STATUS.INTERNAL_SERVER_ERROR,
            code=HTTP_CODE["INTERNAL_SERVER_ERROR"],
            message=str(e),
            data=None
        )

@router.put("/", response_description="Update current user target")
async def update_target(target_update: Target, user: User = Depends(get_current_user), db = Depends(get_mongo_db)):
    try:
        existing_target = db.targets.find_one({"created_by": user.id})
        if not existing_target:
            return make_response(
                status_code=HTTP_STATUS.NOT_FOUND,
                code=HTTP_CODE["NOT_FOUND"],
                message="Target not found",
                data=None
            )

        update_data = target_update.dict(exclude_unset=True, exclude={"id", "created_by"})
        update_data["updated_by"] = user.id
        
        # Flatten the dictionary to support nested updates (dot notation)
        update_data = flatten_dict(update_data)

        if not update_data:
            return make_response(
                status_code=HTTP_STATUS.BAD_REQUEST,
                code=HTTP_CODE["BAD_REQUEST"],
                message="No data provided for update",
                data=None
            )

        result = db.targets.update_one(
            {"_id": existing_target["_id"]},
            {"$set": update_data}
        )

        if result.modified_count == 0:
            return make_response(
                status_code=HTTP_STATUS.OK,
                code=HTTP_CODE["OK"],
                message="No changes made",
                data=None
            )

        updated_target = db.targets.find_one({"_id": existing_target["_id"]})
        return make_response(
            status_code=HTTP_STATUS.OK,
            code=HTTP_CODE["OK"],
            message="Target updated successfully",
            data=Target(**updated_target).dict(by_alias=True)
        )

    except Exception as e:
        return make_response(
            status_code=HTTP_STATUS.INTERNAL_SERVER_ERROR,
            code=HTTP_CODE["INTERNAL_SERVER_ERROR"],
            message=str(e),
            data=None
        )
