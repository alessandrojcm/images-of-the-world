from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

from models import Journey, User

app = FastAPI()


@app.post('/api/{tag}/create')
def create_journey(user: User):
    journey = Journey.create()
    journey.user = user
    journey.save()

    return JSONResponse(journey.dict(), status_code=201)


@app.get('/api/{tag}/{id}')
def get_journey(id: str):
    journey = Journey.get_by_id(id=id)

    if journey is None:
        raise HTTPException(status_code=404, detail='Journey not found.')

    return JSONResponse(journey.dict())


@app.get('/api/{tag}/{journey_id}/sellers/{seller_id}')
def get_journey_seller(journey_id: str, seller_id: str):
    journey = Journey.get_by_id(journey_id)

    if journey is None:
        raise HTTPException(status_code=404, detail='Journey not found.')

    if seller_id not in journey.sellers.keys():
        return HTTPException(status_code=404, detail='That seller is not in this journey.')

    return JSONResponse(journey.sellers.get(seller_id))
