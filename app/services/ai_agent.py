import os
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings

def obtener_system_prompt() -> str: 
    """
    Lee el archivo de texto donde el equipo no tecnico 
    está diseñando la matriz de traducción y el rol del bot.
    """
    # Ruta absoluta hacia la carpeta de prompts
    ruta_base = os.path.dirname(os.path.dirname(__file__)) #Sube a la carpeta 'app'
    ruta_prompt = os.path.join(ruta_base, "prompts", "system_prompt.txt")
    
    # Si el archivo aun no existe Oporque no lo han creado), usamos uno por defecto
    if not os.path.exists(ruta_prompt): 
        return "Eres un asistente de seguridad web amigable. Ayuda al usuario con sus dudas."
    
    with open(ruta_prompt, 'r', encoding='utf-8') as archivo: 
        return archivo.read()
    

def inicializar_asistente(): 
    """
    Configura el modelo de lenguaje en la nube y arma el flujo del prompt.
    """
    # Inicializamos el modelo Gemini usando la API Key del archivo .env
    llm = ChatGoogleGenerativeAI(
        model = "gemini-2.5-flash", 
        google_api_key = settings.GEMINI_API_KEY,
        temperature = 0.2 # La temperatura baja evita que el bot invente fallos (alucine)
    )
    
    # Cargamos dinamicamente el prompt del archivo system_prompt
    system_text = obtener_system_prompt()
    
    # Estructuramos la plantilla de conversacion de LangChain
    prompt_template = ChatPromptTemplate.from_messages([
        ("system", system_text),
        ("human", "Diagnóstico técnico del backend: {datos_seguridad}")
    ])
    
    # Creamos la cadena (Chain)
    chain = prompt_template | llm
    return chain