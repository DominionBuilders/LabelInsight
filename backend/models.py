from pydantic import BaseModel


class Ingredients(BaseModel):
    names : list[str]

class Nutritional(BaseModel):
    names : list[str]

class Product_reality(BaseModel):
    desc : str