from mongoengine import *


class Category(Document):
    _id = ObjectIdField(required=True)
    name = StringField(required=True)
    normal_name = StringField(required=True)
    parent = IntField()
