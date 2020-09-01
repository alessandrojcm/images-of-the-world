from functools import reduce

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

from models import Journey, User, ImageSellerPatch

app = FastAPI()


# TODO: remove the create
# TODO: patch for sellers
@app.post('/api/{tag}/create')
def create_journey(user: User):
    journey = Journey.create()
    journey.user = user
    new_journey = journey.save()

    if new_journey.id is None:
        raise HTTPException(status_code=500)

    return JSONResponse(new_journey.dict(), status_code=201)


@app.patch('/api/{tag}/{id}')
def patch_journey(id: str, seller: ImageSellerPatch):
    journey = Journey.get_by_id(id=id)

    if journey is None:
        raise HTTPException(status_code=404, detail='Journey not found.')

    if str(seller.id) not in journey.sellers.keys():
        raise HTTPException(status_code=404, detail='That seller does not belong to this journey.')

    journey.sellers.get(str(seller.id)).points = seller.points
    journey.sellers.get(str(seller.id)).collected_images = seller.collected_images
    journey.update()

    return JSONResponse(journey.dict())


@app.get('/api/{tag}/{id}')
def get_journey(id: str):
    journey = Journey.get_by_id(id=id)

    if journey is None:
        raise HTTPException(status_code=404, detail='Journey not found.')

    return JSONResponse(journey.dict())


@app.post('/api/{tag}/{journey_id}/winner/{seller_id}')
def post_winner(journey_id: str, seller_id: str):
    journey = Journey.get_by_id(journey_id)

    if journey is None:
        raise HTTPException(status_code=404, detail='Journey not found.')
    if journey.winner is not None:
        raise HTTPException(status_code=400, detail='That journey has already ended.')
    if seller_id not in journey.sellers.keys():
        raise HTTPException(status_code=404, detail='That seller does not belong to this journey.')

    journey.winner = journey.sellers.get(seller_id)
    journey.winner.points = sum([s.points for s in list(journey.sellers.values())])

    for seller in journey.sellers.values():
        if seller.id == journey.winner.id:
            continue
        journey.winner.collected_images.extend(seller.collected_images)

    journey.update()
    return JSONResponse(journey.dict(), status_code=201)


@app.get('/api/{tag}/{journey_id}/sellers/{seller_id}')
def get_journey_seller(journey_id: str, seller_id: str):
    journey = Journey.get_by_id(journey_id)

    if journey is None:
        raise HTTPException(status_code=404, detail='Journey not found.')

    if seller_id not in journey.sellers.keys():
        raise HTTPException(status_code=404, detail='That seller is not in this journey.')

    return JSONResponse(journey.sellers.get(seller_id).dict())
