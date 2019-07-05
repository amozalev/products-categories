import json
import bson
import unittest
from flask_bcrypt import generate_password_hash
from mongoengine import connect, disconnect

import config
from app import app
from myapp.database import Mongo


class TestUser(unittest.TestCase):
    mongodb_uri = f'mongodb://{config.Config.DB_USER}:{config.Config.DB_USER_PASSWORD}@' \
        f'{config.Config.DB_HOST}:{config.Config.DB_PORT}/{config.Config.DB_DB}'

    def setUp(self):
        # Simple Pymongo DB connection is used in order to eliminate ODM validation during data
        # creation, because ODM shared doesn't include _id fields, but it's necessary to add
        # references in some documents. ODM is used after creation of testing data.

        self.db_conn = Mongo(self.mongodb_uri, config.Config.DB_PORT, config.Config.DB_DB)
        self.db = self.db_conn.db
        self.app = app.test_client()
        self.app.testing = True

        with app.app_context():
            self.db.user.delete_many({})
            with open('tests/users_test_data.json') as _file:
                data = json.load(_file)
            self.db.user.insert_many({'email': user['email'],
                                      'password': generate_password_hash(user['password']).decode(),
                                      'isAdmin': user['isAdmin']
                                      }
                                     for user in data)

    def tearDown(self):
        self.setUp()
        disconnect()

    def test(self):
        pass
