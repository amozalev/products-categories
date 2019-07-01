from mongoengine import *


class Product(Document):
    name = StringField(required=True)
    price = FloatField(required=True)
    description = StringField(required=True)
    picture = StringField(required=True)
    categoryId = ObjectIdField(required=True)
    volume = FloatField(required=True)
    units = StringField(required=True)
    producer = StringField(required=True)
