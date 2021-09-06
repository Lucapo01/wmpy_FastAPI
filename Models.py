from typing import Dict, List
from numpy import string_
from pydantic import BaseModel, EmailStr


class ValidationIn(BaseModel):
    email: str
    token: str


class Validation(BaseModel):
    id: int
    email: str
    token: str


class EmailSchema(BaseModel):
    user: str
    password: str
    email: List[EmailStr]



class User(BaseModel):
    id: int
    username: str
    password: str
    tenencias: dict