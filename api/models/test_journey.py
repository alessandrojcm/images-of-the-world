import pytest


class TestJourney:
    @pytest.fixture(scope='module')
    def app(self):
        from functions.journey import app
        from fastapi.testclient import TestClient
        app = TestClient(app)

        return app

    def test_journey_creation(self, app):
        response = app.post('/api/journey/create')

        assert response.status_code == 201
        assert response.json().get('id')

        for seller in response.json().get('sellers').values():
            assert seller.id

    def test_journey_by_id(self, app):
        new_journey = app.post('/api/journey/create')
        fetched_journey = app.get('/api/journey/{id}'.format(id=new_journey.json()).get('id'))

        assert new_journey.json().get('id') == fetched_journey.json().get('id')

    def test_journey_not_found(self, app):
        journey = app.get('/api/journey/notfound')

        assert journey.status_code == 404
