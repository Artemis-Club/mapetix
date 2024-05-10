from flask import Blueprint, jsonify, request
from supabase import create_client
import os
from dotenv import load_dotenv
import json
from algoritmopruebausers import recommend_events_for_user,get_events,processresponseNoDF




load_dotenv()
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY2')
supabase = create_client(supabase_url, supabase_key)

#supabase.auth.sign_in_with_password({"email": "carlos@mail.com", "password": "Rest1234_"})
users = supabase.auth.admin.list_users()
ids_usuarios = [usuario.id for usuario in users]
#print('ids de usuarios : ' , ids_usuarios)



def valorate_events(event_id,jwt_token,nota,description_val):
    #event = supabase.table('event').select('id').eq('id' , event_id).execute()
    plan = {'created_at' : '2024-05-01 15:50:20+00', 'start_date' : '2024-04-30', 'finish_date' : '2024-04-30', 'start_hour' : '18:50:38', 'finish_hour' : '22:51:20', 'user_id' : 'ba384581-429c-4cde-9a4f-7bf468efbb00'}
    returned_event = supabase.table('plan').insert(plan).execute()
    return returned_event

def valorate_events(self,event_id,jwt_token,nota,description_val):
    supabase = self.supabase_controller.get_supabase_client()
    userjwt_id = self.supabase_controller.GetUserIdFromjwt(jwt_token)
    #event = supabase.table('event').select('id').eq('id' , event_id).execute()
    supabase.table('valoration_event').insert({'event_id' : event_id, 'score' : nota, 'description_valoration' : description_val, 'auth_user_id' : userjwt_id}).execute()



def filtrarEventosPorDistancia(self, events, ubicacion, max_distance):
        # Extraer latitud y longitud de la ubicación del usuario
        try:
            lat, lon = map(float, ubicacion.split(','))
        except ValueError:
            return jsonify({'error': 'Invalid user location format'}), 400

        eventos_filtrados = [event for event in events if self.event_controller.haversine_distance(lat, lon, event['coord_y'], event['coord_x']) <= max_distance]
        return 





def filter_events_by_criteria(event_ids, events, target_date, max_price):
        filtered_events = []
        for event_id in event_ids:
            for event in events:
                if event['id'] == event_id:
                    print(f"Checking event {event_id}:")
                    if event['start_date'] <= target_date <= event['finish_date'] and (event['price'] is None or event['price'] <= max_price):
                        print(f"Event {event_id} meets criteria and added to filtered events.")
                        filtered_events.append(event)
                    else:
                        print(f"Event {event_id} does not meet criteria and is skipped.")
                    break  # Salir del bucle interno una vez que se encuentra el evento
        return filtered_events
    

def filter_events_by_distance(self,events, user_location, max_distance_km):
    filtered_events = []
    for event in events:
        event_location = (event['latitude'], event['longitude'])
        distance = self.calcular_distancia_osm(user_location[0], user_location[1], event_location[0], event_location[1])
        if distance <= max_distance_km:
            filtered_events.append(event)
    return filtered_events


from geopy.distance import geodesic
def calcular_distancia_osm(lat1, lon1, lat2, lon2):
    """
    Calcula la distancia en kilómetros entre dos puntos
    utilizando OpenStreetMap y la biblioteca geopy.
    
    :param lat1: Latitud del primer punto en grados decimales
    :param lon1: Longitud del primer punto en grados decimales
    :param lat2: Latitud del segundo punto en grados decimales
    :param lon2: Longitud del segundo punto en grados decimales
    :return: Distancia entre los dos puntos en kilómetros
    """
    # Coordenadas de los puntos
    punto1 = (lat1, lon1)
    punto2 = (lat2, lon2)
    
    # Calcular distancia utilizando geopy
    distancia = geodesic(punto1, punto2).kilometers
    
    return distancia


id_usuario = '200edb15-5f6f-4b9f-b70c-eab63bd188a2'

eventos_ordenados = recommend_events_for_user(id_usuario)
print(eventos_ordenados)

eventos = get_events()
eventosjson = processresponseNoDF(eventos)
#print(eventosjson)

target_date = '2024-04-23'
target_price = 3

eventos_filtrados = filter_events_by_criteria(eventos_ordenados,eventosjson,target_date,target_price)
print('Los eventos filtrados son : ')
print(eventos_filtrados)

#session = supabase.auth.get_session().access_token
#print('sesion:')
#print(session)
#userjwt = supabase.auth.get_user(session)
#print('userjwt:')
#print(userjwt)
#res = supabase.auth.get_session()
#data = supabase.auth.get_user()
#print('Todos los users :')
#print(users)
#print('El user : ')
#print(data)
#print('La sesion :')
#print(res)
#res2 = supabase.auth.sign_out()

