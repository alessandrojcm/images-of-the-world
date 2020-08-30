from typing import Optional, Dict
from uuid import uuid4

from mimesis import Person

from core import session, config
from .document_base import DocumentBase, q
from .image_seller import ImageSeller

person = Person('en')


# TODO: List journeys for leaderboard
class Journey(DocumentBase):
    _collection_name = 'journeys'
    winner: Optional[ImageSeller]
    sellers: Dict[str, ImageSeller] = {}

    def delete(self):
        session().query(q.delete(self.ref))

    @classmethod
    def create(cls):
        sellers = {}

        for _ in range(config.SELLER_MAX_COUNT):
            sellers.setdefault(str(uuid4()), ImageSeller(id=str(uuid4()), sellerName=person.full_name()))

        return Journey(sellers=sellers, winner=None)
