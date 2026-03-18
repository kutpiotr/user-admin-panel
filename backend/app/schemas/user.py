from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.schemas.role import RoleResponse


class UserBase(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    status: str = Field(..., pattern="^(active|blocked)$")
    role_id: int


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass


class UserStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(active|blocked)$")


class UserRoleUpdate(BaseModel):
    role_id: int


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


class PaginatedUsersResponse(BaseModel):
    items: list[UserResponse]
    total: int
    page: int
    limit: int
    pages: int