from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

from models import Journey

app = FastAPI(root_path='/api')


@app.post('/{tag}/create')
def create_journey():
    journey = Journey.create().save()

    return JSONResponse(journey, status_code=201)


@app.get('/{tag}/{id}')
def get_journey(id: str):
    journey = Journey.get_by_id(id=id)

    if journey is None:
        raise HTTPException(status_code=404, detail='Journey not found.')

    return JSONResponse(journey)
