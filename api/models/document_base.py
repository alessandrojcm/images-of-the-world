from abc import abstractmethod
from typing import Any, Optional
from uuid import uuid4

from core.engine import session
from faunadb import query as q
from faunadb.objects import Ref
from pydantic import BaseModel, UUID4

from .utils import to_camel


class DocumentBase(BaseModel):
    """
    Base class to handle FaunaDB Documents, has some abstract methods for CRUD operations and
    generating indexes and schemas. A little ORM-ish
    """

    _collection_name: str
    id: Optional[UUID4]
    ref: Optional[Ref]
    ts: Optional[str]

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
        alias_generator = to_camel
        allow_population_by_field_name = True

    def __init__(self, **data: Any):
        super().__init__(**data)

    def save(self):
        """
        Saves the document in the collection,
        the attributes are serialized utilizing Pydantic's dict method, which
        traverses trough the child class attributes
        :return: An instance of the newly saved object.
        """
        attributes = {**self.dict(), 'id': str(uuid4())}
        result = session().query(
            q.create(q.collection(self._collection_name), {"data": attributes}, )
        )

        return self.__class__(ref=result["ref"], ts=result["ts"], **result["data"])

    @abstractmethod
    def delete(self):
        """Subclasses must override this method since they use their own indexes for deleting"""
        pass

    def update(self):
        updated_vals = self.dict(exclude={"ref", "ts"})

        session().query(q.update(self.ref, {"data": {**updated_vals}}))
