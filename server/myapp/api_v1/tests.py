# import unittest
# from server.app import app
# from server.myapp.database import db
#
#
# class Test(unittest.TestCase):
#     def setUp(self):
#         self.app = app.test_client()
#
#         db.shop.delete_many({})
#         db.product.delete_many({})
#         db.shop.insert_many([
#             {
#                 'title': 'Пятёрочка',
#                 'type': 'food',
#                 'address': {
#                     'street': 'ул. Кантемировская',
#                     'building': '37 А'
#                 },
#                 'schedule': '9:00 - 23:00'
#             },
#             {
#                 'title': 'Перекрёсток',
#                 'type': 'food',
#                 'address': {
#                     'street': 'ул. Ивановская',
#                     'building': '15'
#                 },
#                 'schedule': '8:00 - 23:00'
#             }
#         ])
#         db.product.insert_many([
#             {
#                 'title': 'Молоко',
#                 'description': 'Топлёное молоко',
#                 'volume': 1,
#                 'units': 'литр',
#                 'producer': 'Пискарёвский молокозавод',
#             },
#             {
#                 'title': 'Хлеб',
#                 'description': 'Ржаной из муки крупного помола',
#                 'volume': 200,
#                 'units': 'грамм',
#                 'producer': 'Каравай',
#             }
#         ])
#
#     def tearDown(self):
#         pass
#
#     def test_get_products(self):
#         pass
#
#
# if __name__ == '__main__':
#     unittest.main()