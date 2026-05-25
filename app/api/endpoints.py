from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Definimos el formato de los datos que esperamos del usuario
class UrlPayload(BaseModel):
    url: str

class ChatPayload(BaseModel):
    message: str

@router.post("/validate")
async def validate_url(payload: UrlPayload):
    """
    Endpoint que recibirá la URL a escanear.
    Aquí se llamará a las funciones que programe tu compañero junior.
    """
    url_usuario = payload.url
    # Por ahora, devolvemos un Mock (datos falsos) para que el equipo pruebe
    return {
        "url": url_usuario,
        "status": "scanning_mock",
        "message": "Endpoint listo. Esperando integración del motor de seguridad."
    }

@router.post("/chat")
async def chat_assistant(payload: ChatPayload):
    """
    Endpoint para interactuar directamente con el asistente virtual de LangChain.
    """
    # Por ahora, una respuesta simulada
    return {"response": f"Hola, recibí tu mensaje: '{payload.message}'. El agente de IA se integrará en la fase 3."}