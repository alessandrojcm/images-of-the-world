from typing import List, Union

from pydantic import BaseModel, UUID4

from .utils import to_camel


class ImageSeller(BaseModel):
    id: UUID4
    seller_name: str
    points: int = 0
    collected_images: List[str] = []

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True

    def dict(self, **kwargs):
        properties = super().dict(by_alias=True, **{k: v for k, v in kwargs.items() if k != 'by_alias'})
        properties.update({'id': str(properties['id'])})

        return properties
