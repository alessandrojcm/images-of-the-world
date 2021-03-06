from pydantic import BaseModel, EmailStr

from .utils import to_camel


class User(BaseModel):
    name: str
    last_name: str

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True

    def dict(self, **kwargs):
        return super().dict(by_alias=True, **{k: v for k, v in kwargs.items() if k != 'by_alias'})
