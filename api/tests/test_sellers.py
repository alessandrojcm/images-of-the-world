from fastapi.testclient import TestClient


def test_sellers():
    from functions.sellers import app
    sellers = TestClient(app)
    response = sellers.get('/api/sellers')
    assert response.status_code == 200
    assert len(response.json()['sellers']) > 0
