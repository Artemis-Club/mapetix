from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Cargar el modelo preentrenado y el tokenizador
model_name = "gpt2"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

def generar_resumen(titulo, descripcion):
    # Concatenar título y descripción
    texto = f"Título: {titulo}\nDescripción: {descripcion}\n"
    
    # Codificar el texto en tokens numéricos
    input_ids = tokenizer.encode(texto, return_tensors="pt")

    # Generar texto condicionado al texto de entrada
    output = model.generate(input_ids, max_length=100, num_return_sequences=1)
    
    # Decodificar y devolver el texto generado
    resumen_generado = tokenizer.decode(output[0], skip_special_tokens=True)
    return resumen_generado

# Ejemplo de uso
titulo = "Evento de música en vivo"
descripcion = "Ven y disfruta de una noche llena de música en vivo con tus amigos. ¡No te lo pierdas!"
resumen = generar_resumen(titulo, descripcion)
print("Resumen generado:")
print(resumen)
