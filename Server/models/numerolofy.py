from pydantic import BaseModel
from typing import List


class luckyList(BaseModel):
    luckyNumbers: List[int] = []
    luckyDays: List[str] = []
    luckyColors: List[str] = []
    luckyStones: List[str] = []

class unluckyList(BaseModel):
    unluckyNumbers: List[int] = []
    unluckyDays: List[str] = []
    unluckyColors: List[str] = []
    unluckyStones: List[str] = []

class numerlogyDetails(BaseModel):
    rootNumber: int = 0
    birthNumber: int = 0
    lifePathNumber: int = 0
    destinyNumber: int = 0
    expressionNumber: int = 0
    nameNumber: int = 0
    # lucky list
    luckyList: luckyList = None
    # unlucky list
    unluckyList: unluckyList = None
    # special list
    kuaNumber: int = 0
    connectorNumber: int = 0
    driverNumber: int = 0
    soulUrgeNumber: int = 0
    loShuGridMatrix: List[int] = []