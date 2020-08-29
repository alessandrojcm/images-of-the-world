from uuid import uuid4
import pytest

from models.image_seller import ImageSeller


@pytest.fixture(scope='module')
def create_user():
    return ImageSeller(sellerName='A seller')


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
        seller_dict = seller.dict(by_alias=True)

        assert seller_dict['sellerName']
        assert seller_dict['collectedImages'] == []

    def test_create_seller(self, create_user):
        new_user = create_user.save()
        assert new_user.id
        new_user.delete()

    def test_user_not_found(self):
        user = ImageSeller.get_seller_by_id('hello')

        assert user is None

    def test_user_found(self, create_user):
        new_user = create_user.save()
        user = ImageSeller.get_seller_by_id(new_user.id)

        assert user.id == new_user.id
        assert new_user.id == user.id

        user.delete()
