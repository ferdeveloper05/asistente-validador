import os
from pydantic_settings import BaseSettings # Si usas pydantic-settings (pip install pydantic-settings)

class Settings:
    PROJECT_NAME: str = "Asistente Validador de Seguridad Web"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")

settings = Settings()