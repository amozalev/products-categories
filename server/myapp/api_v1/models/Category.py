from flask_restful import Resource


class Category(Resource):
    def get(self, category_id):
        print('get categories')
        return {'category': 1}

    def post(self):
        pass
