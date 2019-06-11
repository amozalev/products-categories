from pymongo import MongoClient
from server import config


class Mongo(object):
    def __init__(self, host: str, port: int, dbase: str):
        self._client = MongoClient(host, port)
        self.db = self._client[dbase]


db = Mongo(config.Config.DB_HOST, config.Config.DB_PORT, config.Config.DB_DB).db
