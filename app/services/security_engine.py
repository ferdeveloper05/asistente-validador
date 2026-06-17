from pydantic import BaseModel, Field
from typing import Optional

# 1. Definimos el "Contrato de Datos" (Esquema estricto)
class ReporteSeguridad(BaseModel):
    url: str = Field(..., description="La URL analizada")
    es_accesible: bool = Field(..., description="Indica si la web está en línea")
    vulnerabilidad_detectada: str = Field(..., description="Nombre técnico de la falla o 'Ninguna'")
    categoria_owasp: str = Field(..., description="Identificador OWASP (ej. A03:2021-Injection) o 'N/A'")
    nivel_riesgo: str = Field(..., description="Severidad: Crítico, Alto, Medio, Bajo, Informativo")
    detalles_tecnicos: str = Field(..., description="Explicación técnica cruda del hallazgo")

# 2. El motor con los casos de prueba para desarrollo (Mock)
def escanear_url_mock(url: str) -> dict:
    """
    Simula el análisis de seguridad de una URL.
    """
    # Limpiamos un poco la entrada por si acaso
    url_limpia = url.lower().replace("https://", "").replace("http://", "").split("/")[0]

    # CASO 1: Simulación de URL Insegura (Ejemplo de ataque de inyección)
    if "maliciosa" in url_limpia or "test-fail" in url_limpia:
        reporte = ReporteSeguridad(
            url=url,
            es_accesible=True,
            vulnerabilidad_detectada= "SQL Injection",
            categoria_owasp= "A03:2021-Injection",
            nivel_riesgo= "Crítico",
            detalles_tecnicos= "Se detectó falta de sanitización en el parámetro 'id' mediante pruebas de fuzzing con payloads basados en comillas simples (')."
        )
    
    # CASO 2: Simulación de URL con fallos de configuración menores
    elif "advertencia" in url_limpia:
        reporte = ReporteSeguridad(
            url=url,
            es_accesible=True,
            vulnerabilidad_detectada= "Missing Security Headers (X-Frame-Options)",
            categoria_owasp= "A05:2021-Security Misconfiguration",
            nivel_riesgo= "Bajo",
            detalles_tecnicos= "El servidor web no proporciona la cabecera X-Frame-Options, permitiendo potenciales ataques de Clickjacking."
        )

    # CASO 3: Simulación de URL Segura/Limpia
    else:
        reporte = ReporteSeguridad(
            url=url,
            es_accesible=True,
            vulnerabilidad_detectada= "Ninguna",
            categoria_owasp= "N/A",
            nivel_riesgo= "Informativo",
            detalles_tecnicos= "Todos los encabezados de seguridad estándar están presentes. No se detectaron puertos abiertos anómalos."
        )

    # Devolvemos el reporte convertido a diccionario JSON estándar
    return reporte.model_dump()