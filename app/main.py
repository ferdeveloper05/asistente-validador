from fastapi import FastAPI
from app.api.endpoints import router as api_router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# Incluimos las rutas que definimos en la carpeta api
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": f"Bienvenido al {settings.PROJECT_NAME} API. Ve a /docs para ver la documentación interactiva."}