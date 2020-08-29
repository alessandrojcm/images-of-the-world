from fastapi import FastAPI, Path
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException

from models import ImageSeller

app = FastAPI()


@app.get('/api/{tag}')
async def sellers():
    return JSONResponse({'sellers': ImageSeller.get_sellers()})


@app.get('/api/{tag}/{id}')
async def get_seller(id: str):
    seller = ImageSeller.get_seller_by_id(id=id)

    if seller is None:
        raise HTTPException(status_code=404, detail='Seller not found')

    return JSONResponse(seller.dict())
