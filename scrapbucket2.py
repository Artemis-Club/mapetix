import requests
from bs4 import BeautifulSoup
import re
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable
import os
import io
from unidecode import unidecode
from datetime import datetime
import json
from supabase import create_client
from dotenv import load_dotenv

class Scrap:
    def __init__(self):
        load_dotenv()

        supabase_url = os.getenv('SUPABASE_URL')
        supabase_key = os.getenv('SUPABASE_KEY2')
        

        self.supabase_client = create_client(supabase_url, supabase_key)

    def get_supabase_client(self):
        return self.supabase_client

    def limpiar_nombre(self,nombre):
        # Eliminar caracteres no deseados
        nombre_sin_acentos = unidecode(nombre)
        nombre_limpio = re.sub(r'[^\w\s-]', '', nombre_sin_acentos).replace(' ', '_')
        nombre_limpio = nombre_limpio.replace('º', '')
        # Reemplazar espacios con guiones bajos
        nombre_limpio = re.sub(r'[-\s]+', '_', nombre_limpio)
        return nombre_limpio

    def get_events(self):
        supabase = self.get_supabase_client()
        events = supabase.table('event').select('event_name').execute()
        return events

    def processresponseNoDF(self,response):
        try:
            # Obtener los datos en formato JSON utilizando el método model_dump_json()
            response_json = response.model_dump_json()

            # Convertir los datos en un diccionario
            response_dict = json.loads(response_json)

            # Acceder a los datos de las valoraciones
            valorations_data = response_dict['data']

            return valorations_data

        except Exception as e:
            print("Error:", e)
            return None


    def obtener_coordenadas(self,direccion, intentos = 3):
        try:
            geolocalizador = Nominatim(user_agent="prueba1") # Reemplaza "nombre_de_usuario" con un nombre de usuario único
            ubicacion = geolocalizador.geocode(direccion)
            if ubicacion:
                return (ubicacion.latitude, ubicacion.longitude)
            else:
                return None
        except (GeocoderTimedOut, GeocoderUnavailable):
            if intentos > 0:
                print(f"Intento de geocodificación fallido para la dirección: {direccion}. Reintentando...")
                return self.obtener_coordenadas(direccion, intentos=intentos-1)
            else:
                print(f"No se pudieron obtener las coordenadas para la dirección: {direccion} después de varios intentos.")
                return None
        except Exception as e:
            print(f"Ocurrió un error inesperado al geocodificar la dirección {direccion}: {e}")
            return None
        
    def hacerscrap(self):   
        supabase = self.get_supabase_client()
        # Lista para almacenar los eventos
        eventos = []
        eventos_supabase = self.get_events()
        eventos_supabase2 = self.processresponseNoDF(eventos_supabase)
        # URL del sitio web a scrapear
        url = 'https://www.visitvalencia.com/agenda-valencia'


        # Realiza la solicitud HTTP al servidor
        response = requests.get(url)

        # Verifica si la solicitud fue exitosa (código de estado 200)
        if response.status_code == 200:
            
            # Parsea el contenido HTML de la página web con BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')

            # Encuentra los elementos HTML que contienen la información que necesitas
            enlaces_eventos = soup.findAll('a', class_='visually-hidden card__link')

            contador_id = 0

            for enlace in enlaces_eventos:
                # Construye la URL completa del evento
                url_evento = 'https://www.visitvalencia.com' + enlace['href']
                
                # Realiza una solicitud HTTP al evento
                response_evento = requests.get(url_evento)
                
                # Verifica si la solicitud fue exitosa (código de estado 200)
                if response_evento.status_code == 200:
                    # Parsea el contenido HTML de la página de evento con BeautifulSoup
                    soup_evento = BeautifulSoup(response_evento.text, 'html.parser')
                    
                    # Construir el objeto de evento
                    evento = {}

                    #titulo
                    titulo = soup_evento.find('h1', class_='heading').text.strip()

                    # Comprobar si el evento ya existe en la lista de eventos
                    if any(e['event_name'] == titulo for e in eventos_supabase2):
                        print(f"El evento '{titulo}' ya existe en supabase. Proximo evento")
                        continue
                    
                    if any(e['event_name'] == titulo for e in eventos):
                        print(f"El evento '{titulo}' ya existe en la lista de eventos. Se omitirá.")
                        continue


                    url_base = 'https://www.visitvalencia.com'
                    divs_field_item = soup_evento.find_all('div', class_= 'field')
                    image_count = 1

                    lista_archivos = supabase.storage.from_('images').list()

                    # Extraer solo los nombres de archivo de la lista
                    nombres_archivos_bucket = [archivo['name'] for archivo in lista_archivos]

                    nombres_imagenes = []
                    for div in divs_field_item:
                        # Encontrar la etiqueta <img> dentro de la etiqueta <div> actual
                        img_tag = div.find('img')
                        # Verificar si se encontró una etiqueta <img>
                        if img_tag and img_tag['src'].startswith("/sites/default/files/media/media-images/"):
                            # Obtener la URL de la imagen desde el atributo src
                            img_url = url_base + img_tag['src']
                            #print(img_url)
                            response = requests.get(img_url)
                            if response.status_code == 200:
                                datos_imagen = io.BytesIO(response.content)
                                nombre_archivo = self.limpiar_nombre(titulo) + f"_{image_count}.jpg"

                                if nombre_archivo in nombres_archivos_bucket:
                                    #print(f"La imagen '{nombre_archivo}' ya existe en el bucket. Se omitirá.")
                                    nombres_imagenes.append(nombre_archivo)
                                    image_count +=1
                                else:
                                    supabase.storage.from_('images').upload(nombre_archivo,datos_imagen.read())
                                    #print(f"Imagen '{nombre_archivo}' subida correctamente al bucket.")
                                    nombres_imagenes.append(nombre_archivo)
                                    image_count+= 1
                                    
                    #print(nombres_imagenes)
                    url_publicas = []
                    for nom in nombres_imagenes:
                        res = supabase.storage.from_('images').get_public_url(nom)           
                        url_publicas.append(res)   
                    #print(url_publicas)      
                    evento['nombre_imagenes'] = url_publicas

                    # fecha
                    fecha_inicio = soup_evento.find('b', string='De:').find_next('p').text.strip()
                    fecha_fin = soup_evento.find('b', string='A:').find_next('p').text.strip()
                    if fecha_inicio:
                        fecha_inicio_formateada = datetime.strptime(fecha_inicio,'%d-%m-%Y').strftime('%Y-%m-%d')
                    else:
                        fecha_inicio_formateada = '2024-01-01'
                    if fecha_fin:    
                        fecha_fin_formateada = datetime.strptime(fecha_fin, '%d-%m-%Y').strftime('%Y-%m-%d')
                    else:
                        fecha_fin_formateada = '2024-12-31'
                    # Encuentra el texto que contiene la información de los horarios
                    # Encuentra el elemento que contiene el texto 'Información de los horarios'
                    horarios_elemento = soup_evento.find('b', string=re.compile(r'Información de los horarios', re.IGNORECASE))
                    if horarios_elemento:
                        # Busca el siguiente párrafo después del elemento encontrado
                        if horarios_elemento:
                            horarios_texto = ""
                            siguiente_elemento = horarios_elemento.find_next_sibling()
                            while siguiente_elemento and siguiente_elemento.name == 'p':
                                horarios_texto += siguiente_elemento.text.strip() + "\n"
                                siguiente_elemento = siguiente_elemento.find_next_sibling()
                    else:
                        horarios_texto = None
                    # Ahora procesa el texto para extraer los horarios por día
                    #print(horarios_texto)



                    #descripcion
                    etiqueta_div = soup_evento.find('div', class_='text-long')
                    # Extrae el texto de la descripción del evento
                    if etiqueta_div:
                        descripcion_evento = etiqueta_div.get_text(separator=' ').strip()
                    else:
                        descripcion_evento = None
                    #categoria
                    etiqueta_p = soup_evento.find('p', class_='paragraph heading--secondary article__subtitle')
                    if etiqueta_p:
                        # Extrae el texto de la categoría del evento
                        categoria_evento = etiqueta_p.get_text().strip()

                        nombre_categoria = categoria_evento.split(':')[-1].strip().rstrip('.')
                    else:
                        nombre_categoria = None

                    try:
                        #lugar
                        etiqueta_lugar = soup_evento.find('div', class_ = "map__address").find('p').text.strip()

                        codigo_postal_regex = re.compile(r'\b\d{5}\b')

                        # Buscar el código postal en la dirección
                        codigo_postal_match = codigo_postal_regex.search(etiqueta_lugar)

                        if codigo_postal_match:
                            # Si se encuentra el código postal, extraerlo
                            codigo_postal = codigo_postal_match.group()
                            # Extraer la dirección quitando el código postal
                            direccion = etiqueta_lugar.replace(codigo_postal, '').strip(', ')
                        else:
                            # Si no se encuentra el código postal, asignar la dirección completa y código postal como None
                            direccion = etiqueta_lugar
                            codigo_postal = None

                    except AttributeError:
                        direccion = "No disponible"
                        codigo_postal = None

                    try:
                        # precio
                        etiqueta_precio = soup_evento.find('b', string='Precio').find_next('p').text.strip()
                        precio_numero = re.search(r'\d+(?:,\d+)?', etiqueta_precio)
                        precio = float(precio_numero.group().replace(',', '.')) if precio_numero else None
                        #precio = float(precio_numero.group()) if precio_numero else None   
                        
                    except AttributeError:
                        # Si no se encuentra la etiqueta de precio, asigna un valor por defecto
                        precio = None


                    '''
                    print('El titulo del evento es : ' + titulo)
                    # Imprime las fechas del evento
                    print("Fecha de inicio:", fecha_inicio)
                    print("Fecha de fin:", fecha_fin)

                    print("La descripcion del evento es : " + descripcion_evento)

                    print("La categoría es : " + nombre_categoria)
                    
                    print("La dirección es : " + direccion)
                    '''
                    coordenadas = self.obtener_coordenadas(direccion)
                    if coordenadas:
                        evento['coord_x'] = coordenadas[0]
                        evento['coord_y'] = coordenadas[1]
                    else:
                        print(f"No se pudieron obtener las coordenadas para la dirección: {direccion}")
                        evento['coord_x'] = None
                        evento['coord_y'] = None
                    '''
                    if coordenadas:
                        print("Las coordenadas de la dirección {} son: Latitud {}, Longitud {}".format(direccion, coordenadas[0], coordenadas[1]))
                    else:
                        print("No se pudieron obtener las coordenadas para la dirección:", direccion)

                    print("El CP es : " + codigo_postal)

                    print("El precio es : " + str(precio))
                    print()
                    '''
                    evento['event_name'] = titulo
                    evento['start_date'] = fecha_inicio_formateada
                    evento['finish_date'] = fecha_fin_formateada
                    evento['description'] = descripcion_evento
                    evento['categoria'] = nombre_categoria
                    evento['direccion_event'] = direccion
                    evento['cp_event'] = codigo_postal
                    evento['price'] = precio
                    evento['horario'] = horarios_texto

                    supabase.table('event').insert(evento).execute()

                    # Agregar el evento a la lista de eventos
                    eventos.append(evento)
                    print('Evento con título: ' + evento['event_name'] + ' Añadido')

                    

                    # Persiste los atributos en la base de datos de Supabase
                    # Aquí debes adaptar este paso para que se ajuste a tu esquema de base de datos en Supabase
                    #supabase.table('<nombre_de_tabla>').insert({'titulo': titulo, 'fecha': fecha, 'descripcion': descripcion}).execute()
                    
                    #print(f'Evento persistido en Supabase: {titulo}')
                    
                else:
                    print(f'Error al acceder a la página del evento. Código de estado: {response_evento.status_code}')    
        else:
            print(f'Error al acceder a la página. Código de estado: {response.status_code}')
