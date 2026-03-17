from fastapi import APIRouter

from app.db.fake_data import ROLES
from app.schemas.role import RoleResponse

router = APIRouter(prefix="/roles", tags=["roles"])


@router.get("", response_model=list[RoleResponse])
def get_roles():
    return ROLES