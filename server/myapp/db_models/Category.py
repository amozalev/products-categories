from mongoengine import *


class Category(Document):
    name = StringField(required=True)
    displayName = StringField(required=True)
    parentId = ObjectIdField()
