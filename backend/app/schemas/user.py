from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr

from app.schemas.role import RoleResponse


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    status: str
    role_id: int
    created_at: datetime
    role: RoleResponse

    model_config = ConfigDict(from_attributes=True)