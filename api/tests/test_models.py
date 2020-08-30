from uuid import uuid4
import pytest

from models.image_seller import ImageSeller
from models.journey import Journey


class TestSellerModel:
    def test_serialization_snake_case(self):
        seller = ImageSeller(id=uuid4(), seller_name='A seller')
        assert seller.id
        assert seller.seller_name

    def test_serialization_camel_case(self):
        seller = ImageSeller(id=uuid4(), sellerName='A seller')
        assert seller.id
        assert seller.seller_name

    def test_deserialization_camel_case(self):
        seller = ImageSeller(id=uuid4(), sellerName='A seller')
        seller_dict = seller.dict()

        assert seller_dict['sellerName']


        assert user is None

    def test_user_found(self, create_user):
        new_user = create_user.save()
        user = ImageSeller.get_seller_by_id(new_user.id)

        assert user.id == new_user.id
        assert new_user.id == user.id

        user.delete()
