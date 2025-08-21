from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import challenge, webhooks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# 把 challenge 模块里的路由挂到 /api/...
# 把 webhooks 模块里的路由挂到 /webhooks/...
app.include_router(challenge.router, prefix="/api")
app.include_router(webhooks.router, prefix="/webhooks")
