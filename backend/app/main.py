from fastapi import FastAPI

from app.core.config import settings
from app.db.base import Base
from app.db.database import engine, SessionLocal
from app.db.seed import seed_roles, seed_users
from app.routers.roles import router as roles_router
from app.routers.users import router as users_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)

Base.metadata.create_all(bind=engine)

db = SessionLocal()
seed_roles(db)
seed_users(db)
db.close()


@app.get("/", tags=["root"])
def read_root():
    return {"message": "User Admin Panel API is running"}


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}


app.include_router(users_router)
app.include_router(roles_router)