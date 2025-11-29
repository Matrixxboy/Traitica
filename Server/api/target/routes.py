from models.target import UpdateTarget, Target
from fastapi import APIRouter, Depends, HTTPException, status
from api.auth.helpers import get_current_user
from database.connection import get_mongo_db
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
        target_dict = target.model_dump(by_alias=True, exclude_none=True)
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
            data=Target(**created_target).model_dump(by_alias=True)
        )
    except Exception as e:
        return make_response(
            status_code=HTTP_STATUS.INTERNAL_SERVER_ERROR,
            code=HTTP_CODE["INTERNAL_SERVER_ERROR"],
            message=str(e),
            data=None
        )

@router.get("/", response_description="Get current user targets")
async def get_targets(user: User = Depends(get_current_user), db = Depends(get_mongo_db)):
    try:
        targets = list(db.targets.find({"created_by": user.id}))
        return make_response(
            status_code=HTTP_STATUS.OK,
            code=HTTP_CODE["OK"],
            message="Targets fetched successfully",
            data=[Target(**target).model_dump(by_alias=True) for target in targets]
        )
    except Exception as e:
        return make_response(
            status_code=HTTP_STATUS.INTERNAL_SERVER_ERROR,
            code=HTTP_CODE["INTERNAL_SERVER_ERROR"],
            message=str(e),
            data=None
        )

@router.put("/{target_id}", response_description="Update a target")
async def update_target(
    target_id: str,
    target_update: UpdateTarget,   # <-- Partial model
    user: User = Depends(get_current_user),
    db = Depends(get_mongo_db)
):
    try:
        existing_target = db.targets.find_one({
            "_id": ObjectId(target_id),
            "created_by": user.id
        })

        if not existing_target:
            return make_response(
                status_code=HTTP_STATUS.NOT_FOUND,
                code=HTTP_CODE["NOT_FOUND"],
                message="Target not found",
                data=None
            )

        # Only include fields user actually sent
        update_data = target_update.model_dump(exclude_unset=True)

        # Prevent internal fields from being modified
        update_data.pop("id", None)
        update_data.pop("created_by", None)

        update_data["updated_by"] = user.id

        # Flatten nested objects if needed
        update_data = flatten_dict(update_data)

        if not update_data:
            return make_response(
                status_code=HTTP_STATUS.BAD_REQUEST,
                code=HTTP_CODE["BAD_REQUEST"],
                message="No data provided for update",
                data=None
            )

        result = db.targets.update_one(
            {"_id": ObjectId(target_id)},
            {"$set": update_data}
        )

        updated_target = db.targets.find_one({"_id": ObjectId(target_id)})

        return make_response(
            status_code=HTTP_STATUS.OK,
            code=HTTP_CODE["OK"],
            message="Target updated successfully",
            data=Target(**updated_target).model_dump(by_alias=True)
        )

    except Exception as e:
        return make_response(
            status_code=HTTP_STATUS.INTERNAL_SERVER_ERROR,
            code=HTTP_CODE["INTERNAL_SERVER_ERROR"],
            message=str(e),
            data=None
        )
