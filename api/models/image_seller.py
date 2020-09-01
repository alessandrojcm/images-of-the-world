from typing import List

from pydantic import BaseModel, UUID4, Field

from .utils import to_camel


# For the PATCH HTTP Verb
class ImageSellerPatch(BaseModel):
    id: UUID4
    points: int = Field(default=0, ge=0)
    collected_images: List[str] = []

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True

    def dict(self, **kwargs):
        properties = super().dict(by_alias=True, **{k: v for k, v in kwargs.items() if k != 'by_alias'})
        properties.update({'id': str(properties.get('id'))})

        return properties


class ImageSeller(ImageSellerPatch):
    seller_name: str
