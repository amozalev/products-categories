from mongoengine import *


class Product(Document):
    title = StringField(required=True)
    price = FloatField(required=True)
    description = StringField(required=True)
    picture = StringField(required=True)
    category = ObjectIdField(required=True)
    volume = FloatField(required=True)
    units = StringField(required=True)
    producer = StringField(required=True)
