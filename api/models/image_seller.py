from typing import List, Any
from pydantic import UUID4

from core.engine import session
from .document_base import DocumentBase, q


class ImageSeller(DocumentBase):
    _collection_name = 'sellers'
    seller_name: str
    points: int = 0
    collected_images: List[str] = []

    class Config:
        extra = "allow"

    def __init__(self, **data: Any):
        super(ImageSeller, self).__init__(**data)

    def delete(self):
        session().query(q.delete(self.ref))

    @classmethod
    def get_sellers(cls):
        result = session().query(q.paginate(q.match(q.index('list_sellers'))))

        if len(result['data']) == 0:
            return None

        return result['data']

    @classmethod
    def get_seller_by_id(cls, id: UUID4):
        result = session().query(
            q.map_(
                q.lambda_('seller', q.get(q.var('seller'))),
                q.paginate(
                    q.match(q.index('get_seller_by_id'), str(id))
                )
            )
        )

        if len(result["data"]) == 0:
            return None

        user = result['data'][0]

        return ImageSeller(
            ref=user['ref'],
            **user['data']
        )
