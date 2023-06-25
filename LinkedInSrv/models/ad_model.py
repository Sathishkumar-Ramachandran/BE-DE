from pydantic import BaseModel

class Ad(BaseModel):
    name: str
    ad_set_id: str
    creative: str
