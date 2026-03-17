from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).options(joinedload(User.role)).all()
    return users


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = (
        db.query(User)
        .options(joinedload(User.role))
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user