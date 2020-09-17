import pytest


class TestJourney:
    @pytest.fixture(scope='module')
    def app(self):
        from functions.journey import app
        from fastapi.testclient import TestClient
        app = TestClient(app)

        return app

    @pytest.fixture(scope='function')
    def create_journey(self, app):
        return app.post('/api/journey', json={
            'name': 'auser',
            'lastName': 'auser',
            'email': 'user@auser.com'
        })

    def test_journey_creation(self, create_journey):
        response = create_journey

        assert response.status_code == 201
        assert response.json().get('id') is not None
        assert 'ref' not in response.json().keys()
        assert 'ts' not in response.json().keys()

        for seller in response.json().get('sellers').values():
            assert seller.get('id')
        assert response.json().get('user').get('name') == 'auser'

    def test_journey_by_id(self, app):
        new_journey = app.post('/api/journey')
        fetched_journey = app.get('/api/journey/{id}'.format(id=new_journey.json()))

        assert new_journey.json().get('id') == fetched_journey.json().get('id')

    def test_journey_not_found(self, app):
        journey = app.get('/api/journey/notfound')

        assert 'ref' not in journey.json().keys()
        assert 'ts' not in journey.json().keys()
        assert journey.status_code == 404

    def test_journey_get_sellers(self, app, create_journey):
        journey = create_journey.json().get('id')

        sellers = app.get('/api/journey/{id}/sellers'.format(id=journey))

        assert sellers.status_code == 200
        assert len(sellers.json()) == 3

    def test_journey_get_seller(self, app, create_journey):
        journey = create_journey
        seller = list(journey.json().get('sellers').values())[0]

        seller = app.get(
            '/api/journey/{j_id}/sellers/{s_id}'.format(j_id=journey.json().get('id'), s_id=seller.get('id'))
        )

        assert seller.status_code == 200

    def test_patch_seller(self, app, create_journey):
        journey = create_journey
        seller = list(journey.json().get('sellers').values())[0]

        patched_journey = app.patch('/api/journey/{id}'.format(id=journey.json().get('id')), json={
            'id': seller.get('id'),
            'points': 1,
            'collectedImages': ['hi']
        })

        assert patched_journey.status_code == 200

        patched_seller = list(patched_journey.json().get('sellers').values())[0]
        assert patched_seller.get('points') == 1
        assert patched_seller.get('collectedImages') == ['hi']

    def test_dont_allow_patch_if_journey_ended(self, create_journey, app):
        journey = create_journey
        seller = list(journey.json().get('sellers').values())[0]

        app.patch('/api/journey/{id}'.format(id=journey.json().get('id')), json={
            'id': seller.get('id'),
            'points': 35,
            'collectedImages': ['hi']
        })

        patched_journey = app.patch('/api/journey/{id}'.format(id=journey.json().get('id')), json={
            'id': seller.get('id'),
            'points': 35,
            'collectedImages': ['hi']
        })

        assert patched_journey.status_code == 401

    def test_winner_set(self, app, create_journey):
        journey = create_journey
        seller = list(journey.json().get('sellers').values())[0]

        patched_journey = app.patch('/api/journey/{id}'.format(id=journey.json().get('id')), json={
            'id': seller.get('id'),
            'points': 35,
            'collectedImages': ['hi']
        })

        assert patched_journey.status_code == 200
        assert patched_journey.json().get('winner') is not None
        assert patched_journey.json().get('winner').get('id') == seller.get('id')
        assert patched_journey.json().get('winner').get('points') == 35

    def test_journey_winner(self, create_journey, app):
        journey = create_journey
        seller = list(journey.json().get('sellers').values())[0]

        patched_journey = app.patch('/api/journey/{id}'.format(id=journey.json().get('id')), json={
            'id': seller.get('id'),
            'points': 35,
            'collectedImages': ['hi']
        })

        winner = app.get('/api/journey/{id}/winner'.format(id=patched_journey.json().get('id')))

        assert winner.json().get('id') == patched_journey.json().get('winner').get('id')

    def test_not_allow_negative_points(self, create_journey, app):
        journey = create_journey
        seller = list(journey.json().get('sellers').values())[0]

        patched_journey = app.patch('/api/journey/{id}'.format(id=journey.json().get('id')), json={
            'id': seller.get('id'),
            'points': -1,
            'collectedImages': ['hi']
        })

        assert patched_journey.status_code != 200

    def test_get_journeys(self, app):
        journeys = app.get('/api/journey')

        assert journeys.json().get('journeys') is not None
        assert journeys.json().get('items') is not None
