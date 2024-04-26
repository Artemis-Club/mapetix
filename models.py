from pydantic import BaseModel
from typing import List

class Event(BaseModel):
    id: int
    event_name: str
    coord_x: int
    coord_y: int
    description: str
    creation_date: str
    start_date: str
    finish_date: str
    price: str
    direccion_event: str
    cp_event: str
    valoration: str
    user_author: str
    updated_at: str
    status: str
    start_hour: str
    finish_hour: str



class Profile(BaseModel):
    id: int
    username: str
    interests: List[str]

class Plan(BaseModel):
    id: int
    events: List[Event]
