from pydantic import BaseModel

class Campaign(BaseModel):
    name: str
    objective: str
