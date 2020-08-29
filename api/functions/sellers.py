from fastapi import FastAPI
from fastapi.responses import JSONResponse

from models import ImageSeller

app = FastAPI()


@app.get('/api/{tag}')
async def sellers():
    return JSONResponse({'sellers': ImageSeller.get_sellers()})
