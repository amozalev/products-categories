import json
import unittest
import bson
from mongoengine import connect, disconnect

import config
from app import app
from myapp.database import Mongo


class Test(unittest.TestCase):
    mongodb_uri = f'mongodb://{config.Config.DB_USER}:{config.Config.DB_USER_PASSWORD}@' \
        f'{config.Config.DB_HOST}:{config.Config.DB_PORT}/{config.Config.DB_DB}'

    def setUp(self):
        self.db_conn = Mongo(self.mongodb_uri, config.Config.DB_PORT, config.Config.DB_DB).db

        self.app = app.test_client()
        self.app.testing = True

        with app.app_context():
            self.db_conn.category.delete_many({})
            with open('tests/categories.json') as _file:
                data = json.load(_file)
            self.db_conn.category.insert_many({'_id': cat['_id'],
                                               'name': cat['name'],
                                               'normal_name': cat['normal_name'],
                                               'parent': bson.ObjectId(cat['parent']) if cat['parent'] else None}
                                              for cat in data)

            self.db_conn.product.delete_many({})
            with open('tests/products.json') as _file:
                data = json.load(_file)
            self.db_conn.product.insert_many({
                                                 'title': prod['title'],
                                                 'price': prod['price'],
                                                 'description': prod['description'],
                                                 'picture': prod['picture'],
                                                 'category': prod['category'],
                                                 'volume': prod['volume'],
                                                 'units': prod['units'],
                                                 'producer': prod['producer']
                                             } for prod in data)

    def tearDown(self):
        disconnect()

    def test_get_categories(self):
        resp = self.app.get('/api/v1/categories/')
        self.assertEqual(resp.status_code, 200)

        json_data = resp.get_json()
        print('json_data', json_data)

    if __name__ == '__main__':
        unittest.main()
