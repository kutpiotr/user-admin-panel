from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import Base, engine, SessionLocal
from app.db.seed import seed_roles, seed_users
from app.routers.roles import router as roles_router
from app.routers.users import router as users_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)

Base.metadata.create_all(bind=engine)


@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    try:
        seed_roles(db)
        seed_users(db)
    finally:
        db.close()


@app.get("/", tags=["root"])
def read_root():
    return {"message": "User Admin Panel API is running"}


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(roles_router)