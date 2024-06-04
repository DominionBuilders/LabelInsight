from fastapi import FastAPI
from vector_embedding import create_vectorDB
from models import Ingredients,Nutritional,Product_reality
app = FastAPI()

async def startup_event():
    global vectors
    directory = "./data"
    vectors = create_vectorDB(directory)
    print("Vector Store DB is ready")

app.add_event_handler("startup", startup_event)

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




