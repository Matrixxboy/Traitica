from utils.http_constants import HTTP_CODE ,HTTP_STATUS
from utils.response_helper import make_response
from fastapi import APIRouter
from api.auth.helpers import get_current_user
from database.connection import get_mongo_db
from utils.http_constants import HTTP_CODE ,HTTP_STATUS
from utils.response_helper import make_response

router = APIRouter()

@router.post("/getIndianAstrologyDetails")
def get_astrology_details(user = Depends(get_current_user),target=Depends(get_current_target),db = Depends(get_mongo_db)):
    req_dob = target.dob
    req_tob = target.birthTime
    req_lob = target.birthPlace
    req_timezone = target.birthTimezone

    if not req_dob:
        return make_response(
            status_code=HTTP_STATUS.BAD_REQUEST,
            code=HTTP_CODE["BAD_REQUEST"],
            message="Empty Date of birth",
            data=None,
        )
    if not req_tob:
        return make_response(
            status_code=HTTP_STATUS.BAD_REQUEST,
            code=HTTP_CODE["BAD_REQUEST"],
            message="Empty time of birth",
            data=None,
        )
    if not req_lob:
        return make_response(
            status_code=HTTP_STATUS.BAD_REQUEST,
            code=HTTP_CODE["BAD_REQUEST"],
            message="Empty Location of birth",
            data=None,
        )
    try:
        report =[]
        report.append(final_astro_report(req_dob,req_tob,req_lob))
        report.append(planet_position_details(req_dob,req_tob,req_lob,req_timezone))
        moon_info = report[1]["Moon"]
        moon_nak_deg = moon_info["Degree in sign"]
        moon_nak_lord = moon_info["NakLord"]
        rashi_sign = next(iter(report[0]["rashi_all_details"]))
        dasha_data = find_vimashotry_dasha(req_dob, req_tob, moon_nak_deg, rashi_sign, moon_nak_lord)
        report.append(dasha_data)

        return app.response_class(
            response=json.dumps(report, indent=2, sort_keys=False),
            status=200,
            mimetype='application/json'
        )
    except Exception as e :
        return jsonify({"error":str(e)}),500
    try:
        return make_response(
            status_code=HTTP_STATUS.OK,
            code=HTTP_CODE["OK"],
            message="Indian Astrology Details fetched successfully",
            data=None,
        )
    except Exception as e:
        return make_response(
            status_code=HTTP_STATUS.INTERNAL_SERVER_ERROR,
            code=HTTP_CODE["INTERNAL_SERVER_ERROR"],
            message=str(e),
            data=None,
        )
