import pytest

from models import ImageSeller


@pytest.fixture(scope='module')
def create_user():
    return ImageSeller(sellerName='A seller')
