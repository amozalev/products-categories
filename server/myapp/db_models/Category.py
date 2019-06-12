from mongoengine import *


class Category(Document):
    _id = ObjectIdField(required=True)
    name = StringField(required=True, unique=True)
    normal_name = StringField(required=True)
    parent = StringField(required=True)
