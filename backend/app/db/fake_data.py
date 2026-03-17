from datetime import datetime

ROLES = [
    {"id": 1, "name": "admin"},
    {"id": 2, "name": "user"},
    {"id": 3, "name": "manager"},
]

USERS = [
    {
        "id": 1,
        "first_name": "Jan",
        "last_name": "Kowalski",
        "email": "jan.kowalski@example.com",
        "status": "active",
        "role_id": 1,
        "created_at": datetime(2026, 3, 17, 10, 0, 0),
        "role": {"id": 1, "name": "admin"},
    },
    {
        "id": 2,
        "first_name": "Anna",
        "last_name": "Nowak",
        "email": "anna.nowak@example.com",
        "status": "blocked",
        "role_id": 2,
        "created_at": datetime(2026, 3, 17, 11, 30, 0),
        "role": {"id": 2, "name": "user"},
    },
    {
        "id": 3,
        "first_name": "Piotr",
        "last_name": "Wiśniewski",
        "email": "piotr.wisniewski@example.com",
        "status": "active",
        "role_id": 3,
        "created_at": datetime(2026, 3, 17, 12, 15, 0),
        "role": {"id": 3, "name": "manager"},
    },
]