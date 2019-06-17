from mongoengine import *


class Category(Document):
    name = StringField(required=True)
    normal_name = StringField(required=True)
    parent = ObjectIdField()
