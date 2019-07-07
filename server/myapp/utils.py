from bson import ObjectId
from flask import request, make_response, jsonify
from functools import wraps


def bson_to_json(dct: dict) -> dict:
    for i in dct:
        if isinstance(dct[i], ObjectId):
            dct[i] = str(dct[i])
    return dct


def api_key_required(api_method):
    result = {'message': 'Authorization token is missed'}

    @wraps(api_method)
    def check_api_key(*args, **kwargs):
        apikey = request.headers.get('Authorization')
        if apikey:
            return api_method(*args, **kwargs)
        else:
            return make_response(jsonify(result), 401)

    return check_api_key
