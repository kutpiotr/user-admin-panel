from sqlalchemy.orm import Session

from app.models.role import Role
from app.models.user import User


def seed_roles(db: Session):
    existing_roles = db.query(Role).count()

    if existing_roles == 0:
        roles = [
            Role(name="admin"),
            Role(name="user"),
            Role(name="manager"),
        ]
        db.add_all(roles)
        db.commit()


def seed_users(db: Session):
    existing_users = db.query(User).count()

    if existing_users == 0:
        admin_role = db.query(Role).filter(Role.name == "admin").first()
        user_role = db.query(Role).filter(Role.name == "user").first()
        manager_role = db.query(Role).filter(Role.name == "manager").first()

        users = [
            User(
                first_name="Jan",
                last_name="Kowalski",
                email="jan.kowalski@example.com",
                status="active",
                role_id=admin_role.id,
            ),
            User(
                first_name="Anna",
                last_name="Nowak",
                email="anna.nowak@example.com",
                status="blocked",
                role_id=user_role.id,
            ),
            User(
                first_name="Piotr",
                last_name="Wisniewski",
                email="piotr.wisniewski@example.com",
                status="active",
                role_id=manager_role.id,
            ),
        ]
        db.add_all(users)
        db.commit()