from fastapi.testclient import TestClient


def test_sellers():
    from .sellers import app
    sellers = TestClient(app)
    response = sellers.get('/sellers')
    assert response.status_code == 200
    for seller in response.json():
        assert 'id' in seller.keys()
        assert 'points' in seller.keys()
        assert 'sellerName' in seller.keys()
        assert 'collectedImages' in seller.keys()
