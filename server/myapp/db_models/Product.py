from mongoengine import *


class Product(Document):
    title = StringField(required=True)
    price = DecimalField(required=True)
    description = StringField(required=True)
    picture = URLField(required=True)
    category = ObjectIdField(required=True)
    volume = FloatField(required=True)
    units = StringField(required=True)
    producer = StringField(required=True)
