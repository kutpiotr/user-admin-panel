from fastapi import APIRouter, HTTPException

from app.db.fake_data import USERS
from app.schemas.user import UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserResponse])
def get_users():
    return USERS


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int):
    for user in USERS:
        if user["id"] == user_id:
            return user

    raise HTTPException(status_code=404, detail="User not found")