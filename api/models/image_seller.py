from typing import List

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
