import json
import bson
import unittest
from mongoengine import connect, disconnect

import config
from app import app
from myapp.database import Mongo


class TestProduct(unittest.TestCase):
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
                                          'parent_id': bson.ObjectId(cat['parent_id']) if cat['parent_id'] else None}
                                         for cat in data)

            self.db.product.delete_many({})
            with open('tests/products_test_data.json') as _file:
                data = json.load(_file)
            self.db.product.insert_many({'_id': bson.ObjectId(prod['_id']),
                                         'title': prod['title'],
                                         'price': prod['price'],
                                         'description': prod['description'],
                                         'picture': prod['picture'],
                                         'category_id': bson.ObjectId(prod['category_id']),
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

    def test_success_get_products(self):
        resp = self.app.get('/api/v1/products/')
        self.assertEqual(resp.status_code, 200)
        json_data = resp.get_json()

    def test_success_get_product_by_id(self):
        resp = self.app.get('/api/v1/products/5d0909d47da46a70431dd578')
        self.assertEqual(resp.status_code, 200)

    def test_fail_get_product_by_id(self):
        resp = self.app.get('/api/v1/products/000000000000000000000000')
        self.assertEqual(resp.status_code, 404)

    def test_success_put_product_by_id(self):
        resp = self.app.put('/api/v1/products/5d0909d47da46a70431dd578', json={'title': 'updated_fruit',
                                                                               'price': 10.5,
                                                                               'description': 'f',
                                                                               'picture': "https://more-vsego.net/wp-content/uploads/2018/01/rjazhenka-polza-i-vred-dlja-zdorovja-organizma.jpg",
                                                                               'category_id': '5d00ffbcedc0ef0a350fd1e5',
                                                                               'volume': 1.1,
                                                                               'units': 'литр',
                                                                               'producer': 'ООО '
                                                                               })
        self.assertEqual(resp.status_code, 200)

    def test_fail_put_description_is_None(self):
        resp = self.app.put('/api/v1/products/5d0909d47da46a70431dd578', json={'title': 'updated_fruit',
                                                                               'price': 1.1,
                                                                               'description': None,
                                                                               'picture': "https://more-vsego.net/wp-content/uploads/2018/01/rjazhenka-polza-i-vred-dlja-zdorovja-organizma.jpg",
                                                                               'category_id': '5d078e806bc6c411efbdb54f',
                                                                               'volume': 1.2,
                                                                               'units': '',
                                                                               'producer': ''
                                                                               })
        self.assertEqual(resp.status_code, 400)

    def test_fail_put_float_field_with_string(self):
        resp = self.app.put('/api/v1/products/5d0909d47da46a70431dd578', json={'title': 'updated_fruit',
                                                                               'price': 1.1,
                                                                               'description': 'Description',
                                                                               'picture': "https://more-vsego.net/wp-content/uploads/2018/01/rjazhenka-polza-i-vred-dlja-zdorovja-organizma.jpg",
                                                                               'category_id': '5d078e806bc6c411efbdb54f',
                                                                               'volume': 1.2,
                                                                               'units': '',
                                                                               'producer': ''
                                                                               })
        self.assertEqual(resp.status_code, 200)

    def test_fail_put_product_id_is_absent(self):
        resp = self.app.put('/api/v1/products/')
        self.assertEqual(resp.status_code, 404)

    def test_fail_put_product_doesnt_exist_without_arguments(self):
        resp = self.app.put('/api/v1/products/000000000000000000000000')
        self.assertEqual(resp.status_code, 400)

    def test_fail_put_product_without_necessary_argument(self):
        resp = self.app.put('/api/v1/products/000000000000000000000000', json={'title': 'updated_fruit'})
        self.assertEqual(resp.status_code, 400)

    def test_fail_put_product_doesnt_exist_with_arguments(self):
        resp = self.app.put('/api/v1/products/000000000000000000000000', json={'title': 'updated_fruit',
                                                                               'price': 2.2,
                                                                               'description': 'descr',
                                                                               'picture': "https://more-vsego.net/wp-content/uploads/2018/01/rjazhenka-polza-i-vred-dlja-zdorovja-organizma.jpg",
                                                                               'category_id': '5d078e806bc6c411efbdb551',
                                                                               'volume': 1.4,
                                                                               'units': 'литр',
                                                                               'producer': 'ООО'
                                                                               })
        self.assertEqual(resp.status_code, 404)

    def test_success_post_product(self):
        resp = self.app.post('/api/v1/products/', json={'title': 'updated_fruit',
                                                        'price': 2.2,
                                                        'description': 'descr',
                                                        'picture': "https://more-vsego.net/wp-content/uploads/2018/01/rjazhenka-polza-i-vred-dlja-zdorovja-organizma.jpg",
                                                        'category_id': '5d078e806bc6c411efbdb551',
                                                        'volume': 1.5,
                                                        'units': 'литр',
                                                        'producer': 'ООО'
                                                        })
        self.assertEqual(resp.status_code, 201)

    def test_success_post_product_producer_has_null_length(self):
        resp = self.app.post('/api/v1/products/', json={'title': 'updated_fruit',
                                                        'price': 2.2,
                                                        'description': 'descr',
                                                        'picture': "https://more-vsego.net/wp-content/uploads/2018/01/rjazhenka-polza-i-vred-dlja-zdorovja-organizma.jpg",
                                                        'category_id': '5d078e806bc6c411efbdb551',
                                                        'volume': 1.1,
                                                        'units': 'литр',
                                                        'producer': ''
                                                        })
        self.assertEqual(resp.status_code, 201)

    def test_fail_post_product_without_name(self):
        resp = self.app.post('/api/v1/products/', json={'normal_name': 'TestCategory POST Item',
                                                        'parent_id': None})
        self.assertEqual(resp.status_code, 400)

    def test_fail_post_product_without_normalname(self):
        resp = self.app.post('/api/v1/products/', json={'name': 'test_post_item',
                                                        'parent_id': None})
        self.assertEqual(resp.status_code, 400)

    def test_success_delete_product(self):
        resp = self.app.delete('/api/v1/products/5d0909d47da46a70431dd578')
        self.assertEqual(resp.status_code, 200)

    def test_fails_delete_product_id_is_absent(self):
        resp = self.app.delete('/api/v1/products/')
        self.assertEqual(resp.status_code, 404)

    def test_fail_delete_product_doesnt_exist(self):
        resp = self.app.delete('/api/v1/products/000000000000000000000000')
        self.assertEqual(resp.status_code, 404)

    def test_success_get_products_previous_link_in_results(self):
        resp = self.app.get('/api/v1/products/', json={'offset': 4,
                                                       'limit': 2
                                                       })
        self.assertEqual(resp.status_code, 200)
        json_data = resp.get_json()
        self.assertTrue('previous' in json_data)

    def test_success_get_products_with_offset_limit(self):
        offset = 3
        limit = 2
        resp = self.app.get('/api/v1/products/', json={'offset': offset,
                                                       'limit': limit
                                                       })
        self.assertEqual(resp.status_code, 200)
        json_data = resp.get_json()
        self.assertEqual((json_data['from'], json_data['to']), (offset, offset + limit))
        self.assertTrue('previous' in json_data)

    def test_success_get_products_previous_link_not_in_results(self):
        resp = self.app.get('/api/v1/products/', json={'offset': 0,
                                                       'limit': 2
                                                       })
        self.assertEqual(resp.status_code, 200)
        json_data = resp.get_json()
        self.assertFalse('previous' in json_data)

    def test_success_get_products_by_category(self):
        resp = self.app.get('/api/v1/categories/5d078e806bc6c411efbdb54f/products')
        self.assertEqual(resp.status_code, 200)

    def test_fail_get_products_by_category_doesnt_exist(self):
        resp = self.app.get('/api/v1/categories/000000000000000000000000/products')
        self.assertEqual(resp.status_code, 404)


if __name__ == '__main__':
    unittest.main()
