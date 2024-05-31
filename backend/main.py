from fastapi import FastAPI

app = FastAPI()


@app.post("/info")
async def label_info(ingredients,nutritional):
    # SEND THIS INFO TO THE QUERY FORMAT

@app.get("/info")
async def get_info():
    # GET THE REALITY OF THE PRODUCT

@app.post("/company")
async def claim(company_claim,product_reality):
    # send this to the query format

@app.get("/company")
async def get_claim():
    # return claim vs reality




