from fastapi import FastAPI

app = FastAPI(title="User Admin Panel API")


@app.get("/")
def read_root():
    return {"message": "User Admin Panel API is running"}