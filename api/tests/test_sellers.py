from fastapi.testclient import TestClient


def test_sellers():
    from sellers import app
    sellers = TestClient(app)
    response = sellers.get('/api/sellers')
    assert response.status_code == 200
    for seller in response.json()['sellers']:
        assert 'id' in seller.keys()
        assert 'points' in seller.keys()
        assert 'sellerName' in seller.keys()
        assert 'collectedImages' in seller.keys()
