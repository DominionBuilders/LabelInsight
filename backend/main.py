from fastapi import FastAPI
from models import Ingredients,Nutritional,Product_reality
app = FastAPI()


@app.post("/info")
async def label_info(ingredients :Ingredients,nutritional:Nutritional):
    # SEND THIS INFO TO THE QUERY FORMAT

@app.get("/info")
async def get_info():
    # GET THE REALITY OF THE PRODUCT

@app.post("/company")
async def claim(get_info(),product_reality:Product_reality):
    # send this to the query format

@app.get("/company")
async def get_claim():
    # return claim vs reality




