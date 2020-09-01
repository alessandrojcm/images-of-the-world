from uuid import uuid4

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


class TestJourneyModel:
    def test_journey_creation(self):
        jounery = Journey.create()

        for seller in jounery.sellers.values():
            assert seller.id
            assert seller.seller_name

    def test_journey_save(self):
        journey = Journey.create()

        journey = journey.save()

        assert journey.id

        journey.delete()

    def test_get_journey_by_id(self):
        journey = Journey.create().save()
        fetch_journey = Journey.get_by_id(journey.id)

        assert journey.id == fetch_journey.id
        assert journey.sellers.keys() == fetch_journey.sellers.keys()

        journey.delete()

    def test_get_active_journeys(self):
        pass
        journeys = Journey.get_active_journeys_by_email('user@auser.com')

        assert len(journeys) > 0
