from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from faker import Faker

app = FastAPI()
faker = Faker()


@app.get('/api/{tag}')
async def sellers(count: int = Query(3)):
    generated_sellers = []
    for i in range(count):
        generated_sellers.append({
            'id': faker.uuid4(),
            'sellerName': '{n} {ln}'.format(n=faker.first_name(), ln=faker.last_name()),
            'points': 0,
            'collectedImages': []
        })
    return JSONResponse({'sellers': generated_sellers})
