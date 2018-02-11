from mongoengine import (Document,
                         connect,
                         StringField,
                         SequenceField,
                         ReferenceField,
                         DateTimeField,
                         )
from utils import log, gen_session_id
from datetime import datetime

connect('vote')


class BaseDocument(Document):
    meta = {
        'abstract': True,
    }

    def __str__(self):
        name = self.__class__.__name__
        properties = ('{}=({})'.format(k, v) for k, v in dict(self.to_mongo()).items())
        s = '\n<{} \n  {}>'.format(name, '\n  '.join(properties))
        return s

    @classmethod
    def get_by_id(cls, _id):
        return cls.objects(Id=_id).first()


if __name__ == '__main__':
    pass
