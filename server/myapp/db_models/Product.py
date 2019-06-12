from mongoengine import *


class Product(Document):
    _id = ObjectIdField(required=True)
    title = StringField(required=True)
    description = StringField(required=True)
    volume = FloatField(required=True)
    units = StringField(required=True)
    producer = StringField(required=True)
    price = DecimalField(required=True)
    picture = URLField(required=True)
    category = ListField(required=True)
