from typing import Optional, Dict
from uuid import uuid4

from mimesis import Person
from pydantic import UUID4, BaseModel

from core import session, config
from .document_base import DocumentBase, q
from .image_seller import ImageSeller
from .user import User
from .utils import to_camel

person = Person('en')

POINTS_TO_WIN = 20


# TODO: List journeys for leaderboard
class Journey(DocumentBase):
    _collection_name = 'journeys'
    winner: Optional[ImageSeller]
    sellers: Dict[str, ImageSeller] = {}
    user: Optional[User]

    def delete(self):
        session().query(q.delete(self.ref))

    def update(self):
        has_winner = any(map(lambda s: s.points >= POINTS_TO_WIN, self.sellers.values()))
        # No winner, just update
        if not has_winner:
            return super().update()

        # There's a winner, set it
        for seller in self.sellers.values():
            if seller.points >= POINTS_TO_WIN:
                self.winner = seller
                break
            continue
        for seller in self.sellers.values():
            if seller.id == self.winner.id:
                continue
            self.winner.collected_images.extend(seller.collected_images)
        self.winner.points = sum([s.points for s in list(self.sellers.values())])
        super().update()

    @classmethod
    def create(cls):
        sellers = {}

        for _ in range(config.SELLER_MAX_COUNT):
            seller_id = uuid4()
            sellers.setdefault(str(seller_id), ImageSeller(id=str(seller_id), sellerName=person.full_name()))

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
        user = User(**journey['data'].get('user')) if journey['data'].get('user') else None

        return Journey(
            id=id,
            ref=journey['ref'],
            sellers=sellers,
            winner=winner,
            user=user
        )

    @classmethod
    def get_active_journeys_by_email(cls, email: str):
        result = session().query(
            q.map_(
                q.lambda_('journey', q.get(q.var('journey'))),
                q.paginate(
                    q.match(q.index('get-active-journeys'), str(email))
                )
            )
        )

        if len(result["data"]) == 0:
            return []

        active_journeys = []

        for journey in result.get('data'):
            sellers = {k: ImageSeller(**v) for k, v in journey['data']['sellers'].items()}
            winner = ImageSeller(**journey['data']['winner']) if journey['data'].get('winner', None) else None
            user = User(**journey['data'].get('user')) if journey['data'].get('user') else None

            active_journeys.append(Journey(
                id=id,
                ref=journey['ref'],
                sellers=sellers,
                winner=winner,
                user=user
            ))

        return active_journeys


class JourneyDTO(BaseModel):
    id: Optional[UUID4]
    winner: Optional[ImageSeller]
    sellers: Dict[str, ImageSeller] = {}
    user: Optional[User]

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
