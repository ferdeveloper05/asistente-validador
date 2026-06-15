from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.security_engine import escanear_url_mock
from app.services.ai_agent import inicializar_asistente

router = APIRouter()

# Definimos el formato de los datos que esperamos del usuario
class UrlPayload(BaseModel):
    url: str

class ChatPayload(BaseModel):
    message: str

# @router.post("/validate")
# async def validate_url(payload: UrlPayload):
#     """
#     Endpoint que recibirá la URL a escanear.
#     Aquí se llamará a las funciones que programe tu compañero junior.
#     """
#     url_usuario = payload.url
#     # Por ahora, devolvemos un Mock (datos falsos) para que el equipo pruebe
#     return {
#         "url": url_usuario,
#         "status": "scanning_mock",
#         "message": "Endpoint listo. Esperando integración del motor de seguridad."
#     }


@router.post("/validate")
async def validate_url(payload: UrlPayload):
    try:
        # 1. Ejecutar el escaneo de seguridad (Por ahora usando el Mock)
        resultado_seguridad = escanear_url_mock(payload.url)
        
        # 2. Inicializar nuestro agente de IA con LangChain
        asistente_chain = inicializar_asistente()
        
        # 3. Convertimos el JSON de seguridad a String para enviárselo a Gemini
        # Esto asegura que el prompt reciba los datos limpios
        datos_para_ia = str(resultado_seguridad)
        
        # 4. Le pedimos a la IA que traduzca el reporte técnico usando la matriz del equipo
        respuesta_ia = asistente_chain.invoke({"datos_seguridad": datos_para_ia})
        
        # 5. Devolvemos la respuesta estructurada al usuario final
        return {
            "url_analizada": payload.url,
            "datos_tecnicos_crudos": resultado_seguridad, # Útil para auditoría
            "respuesta_asistente": respuesta_ia.content   # Lo que ve el usuario final
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el flujo de validación: {str(e)}")


@router.post("/chat")
async def chat_assistant(payload: ChatPayload):
    """
    Endpoint para interactuar directamente con el asistente virtual de LangChain.
    """
    try: 
        # 1. Inicializamos la cadena de LangChain
        asistente_chain = inicializar_asistente()
        
        # 2. Ejecutamos la IA pasandole el mensaje
        resultado = asistente_chain.invoke({'datos_seguridad': payload.message})
        
        # 3. Devolvemos la respuesta generada por la IA al usuario final
        return {
            'status':"success", 
            "assitant_response": resultado.content
        }
    except Exception as e: 
        raise HTTPException(status_code=500, detail=f'Error en el agente de IA: {str(e)}')
    #return {"response": f"Hola, recibí tu mensaje: '{payload.message}'. El agente de IA se integrará en la fase 3."}