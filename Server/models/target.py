from pydantic import BaseModel, Field, BeforeValidator
from typing import List, Optional, Annotated
from models.Indian_astrology import IndianAstrology

PyObjectId = Annotated[str, BeforeValidator(str)]

class targetName(BaseModel):
    fisrtName: str = None
    middleName: str = None
    lastName: str = None

class Target(BaseModel):
    #target created by
    created_by : Optional[PyObjectId] = Field(default=None, alias="created_by")
    #target updated by
    updated_by : Optional[PyObjectId] = Field(default=None, alias="updated_by")
    # Person Basic Details
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name : Optional[targetName] = None
    dob : Optional[str] = None
    birthTime:Optional[str]=None
    birthPlace:Optional[str]=None
    birthLatitude:Optional[str]=None
    birthLongitude:Optional[str]=None
    birthTimezone: Optional[str] = None
    age : Optional[str] = None
    gender : Optional[str] = None
    email:str=None

    # Person Address Details :
    address :  Optional[str] = None
    city : Optional[str] = None
    state : Optional[str] = None
    country : Optional[str] = None
    pincode : Optional[str] = None

    # Person Contact Details :
    phone : Optional[str] = None
    email : Optional[str] = None

    # Person family Details :
    fatherName : Optional[str] = None
    fatherOccupation : Optional[str] = None
    motherName : Optional[str] = None
    motherOccupation : Optional[str] = None

    # Person Financial Details :
    jobRole: Optional[str] = None
    jobType: Optional[str] = None
    income : Optional[str] = None
    assets : Optional[str] = None
    liabilities : Optional[str] = None

    # Person birth Details :
    birthDate : Optional[str] = None
    birthTime : Optional[str] = None
    birthPlace : Optional[str] = None

    # Person health Details :
    height : Optional[str] = None
    weight : Optional[str] = None
    bloodGroup : Optional[str] = None

    #Indian Astrology Details :
    indianAstrology : List[IndianAstrology] = []


