from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Asistente Validador de Seguridad Web"
    
    # Declaramos la variable. Pydantic la buscará automáticamente en el entorno o en el .env
    GEMINI_API_KEY: str

    # Configuración para indicarle dónde está el archivo .env
    # extra="ignore" evita errores si tienes otras variables en el .env que no declaras aquí
    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()