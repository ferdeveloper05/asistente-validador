from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# ── CORS: permite que el frontend React (Vite) llame al backend ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # Vite dev server (configurado en vite.config.js)
        "http://localhost:5173",   # Puerto por defecto de Vite
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluimos las rutas que definimos en la carpeta api
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {
        "message": f"Bienvenido al {settings.PROJECT_NAME} API. Ve a /docs para ver la documentación interactiva.",
        "frontend": "Corre el frontend React en http://localhost:3000 (npm run dev en react_ui/)"
    }