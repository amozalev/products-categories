import json
import bson
import unittest
from mongoengine import connect, disconnect

import config
from app import app
from myapp.database import Mongo


class TestCategory(unittest.TestCase):
    mongodb_uri = f'mongodb://{config.Config.DB_USER}:{config.Config.DB_USER_PASSWORD}@' \
        f'{config.Config.DB_HOST}:{config.Config.DB_PORT}/{config.Config.DB_DB}'

    def setUp(self):
        # Simple Pymongo DB connection is used in order to eliminate ODM validation during data
        # creation, because ODM models doesn't include _id fields, but it's necessary to add
        # references in some documents. ODM is used after creation of testing data.

        self.db_conn = Mongo(self.mongodb_uri, config.Config.DB_PORT, config.Config.DB_DB)
        self.db = self.db_conn.db
        self.app = app.test_client()
        self.app.testing = True

        with app.app_context():
            self.db.category.delete_many({})
            with open('tests/categories_test_data.json') as _file:
                data = json.load(_file)
            self.db.category.insert_many({'_id': bson.ObjectId(cat['_id']),
                                          'name': cat['name'],
                                          'normal_name': cat['normal_name'],
                                          'parent': bson.ObjectId(cat['parent']) if cat['parent'] else None}
                                         for cat in data)

            self.db.product.delete_many({})
            with open('tests/products_test_data.json') as _file:
                data = json.load(_file)
            self.db.product.insert_many({
                                            'title': prod['title'],
                                            'price': prod['price'],
                                            'description': prod['description'],
                                            'picture': prod['picture'],
                                            'category': prod['category'],
                                            'volume': prod['volume'],
                                            'units': prod['units'],
                                            'producer': prod['producer']
                                        } for prod in data)
            self.db_conn.close()
            connect(config.Config.DB_DB, host=self.mongodb_uri)

    def tearDown(self):
        # Category.objects.delete()
        # Product.objects.delete()
        self.setUp()
        disconnect()

    def test_success_get_categories(self):
        resp = self.app.get('/api/v1/categories/')
        self.assertEqual(resp.status_code, 200)
        json_data = resp.get_json()

    def test_success_get_category_by_id(self):
        resp = self.app.get('/api/v1/categories/5d00ffbcedc0ef0a350fd1e5')
        self.assertEqual(resp.status_code, 200)

    def test_fail_get_category_by_id(self):
        resp = self.app.get('/api/v1/categories/000000000000000000000000')
        self.assertEqual(resp.status_code, 404)

    def test_success_put_category_by_id(self):
        resp = self.app.put('/api/v1/categories/5d00ffbcedc0ef0a350fd1e5', json={'name': 'updated_fruit',
                                                                                 'normal_name': 'Updated fruits',
                                                                                 'parent': None})
        self.assertEqual(resp.status_code, 200)

    def test_success_put_category_parent_has_null_length(self):
        resp = self.app.put('/api/v1/categories/5d00ffbcedc0ef0a350fd1e5', json={'name': 'test_put_item1',
                                                                                 'normal_name': 'TestCategory PUT Item1',
                                                                                 'parent': ''})
        self.assertEqual(resp.status_code, 200)

    def test_fail_put_category_id_is_absent(self):
        resp = self.app.put('/api/v1/categories/')
        self.assertEqual(resp.status_code, 404)

    def test_fail_put_category_doesnt_exist_without_arguments(self):
        resp = self.app.put('/api/v1/categories/000000000000000000000000')
        self.assertEqual(resp.status_code, 400)

    def test_fail_put_category_without_necessary_argument(self):
        resp = self.app.put('/api/v1/categories/000000000000000000000000',
                            json={'normal_name': 'TestCategory PUT Item1'})
        self.assertEqual(resp.status_code, 400)

    def test_fail_put_category_doesnt_exist_with_arguments(self):
        resp = self.app.put('/api/v1/categories/000000000000000000000000', json={'name': 'test_put_item1',
                                                                                 'normal_name': 'TestCategory PUT Item1',
                                                                                 'parent': None})
        self.assertEqual(resp.status_code, 404)

    def test_success_post_category(self):
        resp = self.app.post('/api/v1/categories/', json={'name': 'test_post_item1',
                                                          'normal_name': 'TestCategory POST Item1',
                                                          'parent': None})
        self.assertEqual(resp.status_code, 201)

    def test_success_post_category_parent_has_null_length(self):
        resp = self.app.post('/api/v1/categories/', json={'name': 'test_post_item1',
                                                          'normal_name': 'TestCategory PUT Item1',
                                                          'parent': ''})
        self.assertEqual(resp.status_code, 201)

    def test_fail_post_category_without_name(self):
        resp = self.app.post('/api/v1/categories/', json={'normal_name': 'TestCategory POST Item',
                                                          'parent': None})
        self.assertEqual(resp.status_code, 400)

    def test_fail_post_category_without_normalname(self):
        resp = self.app.post('/api/v1/categories/', json={'name': 'test_post_item',
                                                          'parent': None})
        self.assertEqual(resp.status_code, 400)

    def test_success_delete_category(self):
        resp = self.app.delete('/api/v1/categories/5d00ffbcedc0ef0a350fd1e5')
        self.assertEqual(resp.status_code, 200)

    def test_fails_delete_category_id_is_absent(self):
        resp = self.app.delete('/api/v1/categories/')
        self.assertEqual(resp.status_code, 404)

    def test_fail_delete_category_doesnt_exist(self):
        resp = self.app.delete('/api/v1/categories/000000000000000000000000')
        self.assertEqual(resp.status_code, 404)

    def test_success_get_categories_previous_link_in_results(self):
        resp = self.app.get('/api/v1/categories/', json={'offset': 4,
                                                         'limit': 2
                                                         })
        self.assertEqual(resp.status_code, 200)
        json_data = resp.get_json()
        self.assertTrue('previous' in json_data)

    def test_success_get_categories_with_offset_limit(self):
        offset = 3
        limit = 2
        resp = self.app.get('/api/v1/categories/', json={'offset': offset,
                                                         'limit': limit
                                                         })
        self.assertEqual(resp.status_code, 200)
        json_data = resp.get_json()
        self.assertEqual((json_data['from'], json_data['to']), (offset, offset + limit))
        self.assertTrue('previous' in json_data)

    def test_success_get_categories_previous_link_not_in_results(self):
        resp = self.app.get('/api/v1/categories/', json={'offset': 0,
                                                         'limit': 2
                                                         })
        self.assertEqual(resp.status_code, 200)
        json_data = resp.get_json()
        self.assertFalse('previous' in json_data)


if __name__ == '__main__':
    unittest.main()
