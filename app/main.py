from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.exceptions import value_error_handler
from app.routes import router
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Alzheimer Disease Detection API",
    version="1.0.0",
)




app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_exception_handler(
    ValueError,
    value_error_handler,
)

# Serve generated Grad-CAM images
app.mount(
    "/outputs",
    StaticFiles(directory="outputs"),
    name="outputs",
)

app.include_router(router)