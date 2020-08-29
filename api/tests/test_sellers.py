import pytest

from fastapi.testclient import TestClient


class TestSellersEndpoint:

    @pytest.fixture(scope='module')
    def sellers(self):
        from functions.sellers import app
        _app = TestClient(app)
        return _app

    def test_sellers_listing(self, sellers):
        response = sellers.get('/api/sellers')
        assert response.status_code == 200
        assert len(response.json()['sellers']) > 0

    def test_sellers_not_found(self, sellers):
        response = sellers.get('/api/sellers/id')

        assert response.status_code == 404

    def test_sellers_found(self, sellers, create_user):
        user = create_user.save()
        response = sellers.get('/api/sellers/{id}'.format(id=str(user.id)))

        assert response.status_code == 200
        user.delete()
