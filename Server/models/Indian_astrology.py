from bs4.builder._html5lib import Element
from pydantic import BaseModel
from typing import List, Optional

class PadaDetails(BaseModel):
    padaName: str = ""
    padaNumber: int = 0
    akshara:str=""
    navamsaSign:str=""
    rashiName:str=""
    rashiNumber:int=0

class RashiDetails(BaseModel):
    rashiName:str=""
    rashiNumber:int=0
    bodyPart:str=""
    direction:str=""
    dosha:str=""
    element:str=""
    gender:str=""
    nature:str=""
    quality:str=""
    ruler:str=""
    vashya:str=""


class PlanetDetails(BaseModel):
    _isAscendant:bool=False
    planetName:str=""
    planetNumber:int=0
    planetPosition:int=0
    combust:str=""
    dms:str=""
    degree:str=""
    minute:str=""
    second:str=""
    latitude:str=""
    longitude:str=""
    nakshatraName:str=""
    nakshatraSign:str=""
    nakshatraNumber:int=0
    nakshatraLord:str=""
    status:str=""
    house:int=0

class VimshottariPlanetaryInfo(BaseModel):
    planet:str=""
    startDate:str=""
    endDate:str=""

class VimshottariDasha(BaseModel):
    MoonPlanetInfo:List[VimshottariPlanetaryInfo] = []
    SunPlanetInfo:List[VimshottariPlanetaryInfo] = []
    MarsPlanetInfo:List[VimshottariPlanetaryInfo] = []
    MercuryPlanetInfo:List[VimshottariPlanetaryInfo] = []
    JupiterPlanetInfo:List[VimshottariPlanetaryInfo] = []
    VenusPlanetInfo:List[VimshottariPlanetaryInfo] = []
    SaturnPlanetInfo:List[VimshottariPlanetaryInfo] = []
    KetuPlanetInfo:List[VimshottariPlanetaryInfo] = []
    RahuPlanetInfo:List[VimshottariPlanetaryInfo] = []
    UranusPlanetInfo:List[VimshottariPlanetaryInfo] = []
    NeptunePlanetInfo:List[VimshottariPlanetaryInfo] = []
    PlutoPlanetInfo:List[VimshottariPlanetaryInfo] = []

class IndianAstrology(BaseModel):
    nakshatra: str = ""
    ayanamasa: str = ""
    julianDay: str = ""

    #nakshatra details
    nakshatraName: str = ""
    nakshatraNumber: int = 0
    nakshatraPada:int = 0
    nakshatraLord: str = ""
    nakshatraPosition: int = 0
    nakshatraLordPosition: int = 0
    nakshatraLordSign: str = ""
    nakshatraLordSignPosition: int = 0
    nakshatraLordSignLord: str = ""

    varna:str=""
    nadi:str=""
    prakriti:str=""
    gana:str=""
    guna:str=""
    yoni:str=""
    paya:str=""
    deity:str=""
    fastDay:str=""
    dosha:str=""
    direction:str=""
    favoriteAlphabet:str=""
    mantra:str=""
    rullingPalnet:str=""
    symbol:str=""
    tara:str=""
    yog:str=""

    #Pada Details
    pada1Details:List[PadaDetails] = []
    pada2Details:List[PadaDetails] = []
    pada3Details:List[PadaDetails] = []
    pada4Details:List[PadaDetails] = []

    #Rashi Details
    rashiDetails:List[RashiDetails] = []

    #Planet Details
    accidentalPlanetDetails:List[PlanetDetails] = []
    sunPlanetDetails:Optional[PlanetDetails] = None
    moonPlanetDetails:Optional[PlanetDetails] = None
    marsPlanetDetails:Optional[PlanetDetails] = None
    mercuryPlanetDetails:Optional[PlanetDetails] = None
    jupiterPlanetDetails:Optional[PlanetDetails] = None
    VenusPlanetDetails:Optional[PlanetDetails] = None
    SaturnPlanetDetails:Optional[PlanetDetails] = None
    ketuPlanetDetails:Optional[PlanetDetails] = None
    RahuPlanetDetails:Optional[PlanetDetails] = None
    uranusPlanetDetails:Optional[PlanetDetails] = None
    NeptunePlanetDetails:Optional[PlanetDetails] = None
    PlutoPlanetDetails:Optional[PlanetDetails] = None

    #Vimshottari Dasha
    mahadasgaDetails:Optional[VimshottariDasha] = None
    antardashaDetails:Optional[VimshottariDasha] = None
    pratyantardashaDetails:Optional[VimshottariDasha] = None
    sookshmaDashaDetails:Optional[VimshottariDasha] = None