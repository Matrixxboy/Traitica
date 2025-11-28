from pydantic import BaseModel
from typing import List

class targetName(BaseModel):
    fisrtName: str = None
    middleName: str = None
    lastName: str = None

class targetBasicModel(BaseModel):
    # Person Basic Details :
    name : List[targetName] = []
    dob : str = None
    age : str = None
    gender : str = None

    # Person Address Details :
    address : str = None
    city : str = None
    state : str = None
    country : str = None
    pincode : str = None

    # Person Contact Details :
    phone : str = None
    email : str = None

    # Person family Details :
    fatherName : str = None
    fatherOccupation : str = None
    motherName : str = None
    motherOccupation : str = None

    # Person Financial Details :
    jobRole: str = None
    jobType: str = None
    income : str = None
    assets : str = None
    liabilities : str = None

    # Person birth Details :
    birthDate : str = None
    birthTime : str = None
    birthPlace : str = None

    # Person health Details :
    height : str = None
    weight : str = None
    bloodGroup : str = None

    


