from fastapi import FastAPI
from vector_embedding import create_vectorDB
from models import Info,Title,Details
from chain import reality_query,compare,consumption,product_reality,product_consumption,product_assessment,product_comparison
app = FastAPI()

async def startup_event():
    global vectors
    directory = "./data"
    vectors = create_vectorDB(directory)
    print("Vector Store DB is ready")

app.add_event_handler("startup", startup_event)

@app.post("/info")
async def label_info(info:Info):
    reality_query(title=info["name"],
                  ingredients=info["Ingredients"],
                  nutritional=info["Nutritional"],
                  additives=info["Additives"],
                  )

@app.get("/info")
async def get_info():
    return product_reality

@app.post("/compare")
async def claim_vs_reality(title:Title):
    compare(title=title["name"],
            reality=product_reality
            )

@app.get("/compare")
async def get_comparison():
    return product_comparison

@app.post("/analysis")
async def analysis(details:Details):
     consumption(title=details["name"],
                  ingredients=details["Ingredients"],
                  nutritional=details["Nutritional"],
                  additives=details["Additives"],
                  allergies=details["Allergies"],
                  diseases=details["Diseases"]
                  )
    
@app.get("/analysis")
async def get_analysis():
    return product_assessment,product_consumption



