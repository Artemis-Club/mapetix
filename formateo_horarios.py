import spacy

# Cargar el modelo de spaCy en español
nlp = spacy.load("es_core_news_sm")

# Lista de ejemplos de descripciones de fechas y horas
descripciones = [
    "De martes a sábado de 10:00 a 20:00. Domingo de 10:00 a 14:00. Los lunes permanecerá cerrado.",
    "De martes a domingo de 10:00 a 19:00 horas. Viernes de 10:00 a 20:00 horas.",
    "De lunes a viernes: de 11:00 h a 14:00 h y de 17:00 h a 20:30 h. Fines de semana y festivos: de 11:00 h a 14:30 h y de 16:30 h a 21:00 h."
]

def mapear_fines_de_semana(texto):
    # Mapear palabras relacionadas con fines de semana a "Sábado y Domingo"
    palabras_clave = ["fin de semana", "fines de semana", "Fin de semana", "Fines de semana"]
    for palabra in palabras_clave:
        texto = texto.replace(palabra, "Sábado y Domingo")
    return texto

def analizar_descripcion(descripcion):
    print("---")  # Línea horizontal antes de cada descripción
    doc = nlp(descripcion)
    
    for token in doc:
        # Detectar días de la semana
        if any(dia in token.text.lower() for dia in ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]):
            print("Día:", token.text.capitalize())
        # Detectar días festivos
        elif token.text.lower() == "festivos":
            print("Día:", token.text.capitalize())
        # Detectar horas en formato de número
        elif token.like_num and token.text.isdigit():
            print("Hora:", token.text)
        # Detectar horas escritas en texto
        elif token.text.lower() in ["nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis",
                                    "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós",
                                    "veintitrés"]:
            print("Hora:", token.text.capitalize())
        # Detectar horas en formato de hora
        elif ":" in token.text:
            partes_hora = token.text.split(":")
            if len(partes_hora) == 2:
                horas, minutos = partes_hora
                if horas.isdigit() and minutos.isdigit():
                    print("Hora:", token.text)
        # Detectar horario cerrado
        elif token.text.lower() == "cerrado":
            print("Hora: cerrado")

# Analizar cada descripción de fecha y hora
for descripcion in descripciones:
    descripcion_modificada = mapear_fines_de_semana(descripcion)
    analizar_descripcion(descripcion_modificada)