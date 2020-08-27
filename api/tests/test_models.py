from uuid import uuid4

from models.image_seller import ImageSeller


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
