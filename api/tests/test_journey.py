import pytest


class TestJourney:
    @pytest.fixture(scope='module')
    def app(self):
        from functions.journey import app
        from fastapi.testclient import TestClient
        app = TestClient(app)

        return app

    def test_journey_creation(self, app):
        response = app.post('/api/journey/create', json={
            'name': 'auser',
            'lastName': 'auser',
            'email': 'user@auser.com'
        })

        assert response.status_code == 201
        assert response.json().get('id') is not None
        assert 'ref' not in response.json().keys()
        assert 'ts' not in response.json().keys()

        for seller in response.json().get('sellers').values():
            assert seller.get('id')
        assert response.json().get('user').get('name') == 'auser'

    def test_journey_by_id(self, app):
        new_journey = app.post('/api/journey/create')
        fetched_journey = app.get('/api/journey/{id}'.format(id=new_journey.json()))

        assert new_journey.json().get('id') == fetched_journey.json().get('id')

    def test_journey_not_found(self, app):
        journey = app.get('/api/journey/notfound')

        assert 'ref' not in journey.json().keys()
        assert 'ts' not in journey.json().keys()
        assert journey.status_code == 404

    def test_journey_get_seller(self, app):
        journey = app.post('/api/journey/create', json={
            'name': 'auser',
            'lastName': 'auser',
            'email': 'user@auser.com'
        })
        seller = list(journey.json().get('sellers').values())[0]

        seller = app.get(
            '/api/journey/{j_id}/sellers/{s_id}'.format(j_id=journey.json().get('id'), s_id=seller.get('id'))
        )

        assert seller.status_code == 200

    def test_post_winner(self, app):
        journey = app.post('/api/journey/create', json={
            'name': 'auser',
            'lastName': 'auser',
            'email': 'user@auser.com'
        })
        seller = list(journey.json().get('sellers').values())[0]

        winner = app.post(
            '/api/journey/{j_id}/winner/{s_id}'.format(j_id=journey.json().get('id'), s_id=seller.get('id'))
        )
        assert winner.status_code == 201

    def test_patch_seller(self, app):
        journey = app.post('/api/journey/create', json={
            'name': 'auser',
            'lastName': 'auser',
            'email': 'user@auser.com'
        })
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
