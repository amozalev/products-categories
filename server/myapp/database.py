from pymongo import MongoClient
from server import config


class Mongo(object):
    def __init__(self, host: str, port: int, dbase: str):
        self._client = MongoClient(host, port)
        self.db = self._client[dbase]


# Create DB connection
mongodb_uri = f'mongodb://{config.Config.DB_USER}:{config.Config.DB_USER_PASSWORD}@' \
    f'{config.Config.DB_HOST}:{config.Config.DB_PORT}/{config.Config.DB_DB}'
db = Mongo(mongodb_uri, config.Config.DB_PORT, config.Config.DB_DB).db
