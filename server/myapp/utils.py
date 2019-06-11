from bson import ObjectId


def bson_to_json(dct: dict) -> dict:
    for i in dct:
        if isinstance(dct[i], ObjectId):
            dct[i] = str(dct[i])
    return dct
