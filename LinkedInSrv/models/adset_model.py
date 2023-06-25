from pydantic import BaseModel

class AdSet(BaseModel):
    name: str
    campaign_id: str
    targeting: str
