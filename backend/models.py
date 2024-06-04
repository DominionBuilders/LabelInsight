from pydantic import BaseModel


class Info(BaseModel):
    name : str
    Ingredients: list[str]
    Nutritional: list[str]
    Additives: list[str]

class Title(BaseModel):
    name : str

class Details(BaseModel):
    name : str
    Ingredients: list[str]
    Nutritional: list[str]
    Additives: list[str]
    Allergies: list[str]
    Diseases: list[str]
