from typing import Optional, Dict
from uuid import uuid4

from mimesis import Person
from pydantic import UUID4

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

    @classmethod
    def get_by_id(cls, id: UUID4):
        result = session().query(
            q.map_(
                q.lambda_('journey', q.get(q.var('journey'))),
                q.paginate(
                    q.match(q.index('get_journey_by_id'), str(id))
                )
            )
        )

        if len(result["data"]) == 0:
            return None

        journey = result['data'][0]
        sellers = {k: ImageSeller(**v) for k, v in journey['data']['sellers'].items()}
        winner = ImageSeller(**journey['data']['winner']) if journey['data'].get('winner', None) else None

        return Journey(
            id=id,
            ref=journey['ref'],
            sellers=sellers,
            winner=winner
        )
