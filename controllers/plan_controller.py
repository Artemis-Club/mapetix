from flask import request,jsonify
from controllers.supabase_controller import SupabaseController
import json
from datetime import datetime
from algoritmopruebausers import recommend_events_for_user
from geopy.distance import geodesic

class PlanController:
    def __init__(self):
        self.supabase_controller = SupabaseController()

    # GET - /plans      Obtiene los planes ya hecho por el usuario (JWT)
    def get_plans_by_user(self, jwt_token):
        supabase = self.supabase_controller.get_supabase_client()
        userjwt_id = self.supabase_controller.GetUserIdFromjwt(jwt_token)
        plans_by_user = supabase.table('plan').select('*').eq('user_id', userjwt_id).execute()
        plans_json = self.processresponseNoDF(plans_by_user)
        for plan in plans_json:
            plan_id = plan['plan_id']
            plan['events'] = self.get_events_for_plan(plan_id)
        return plans_json    
    

     # GET - /plan/:id   Devuelve un plan concreto de un usuario (id = plan_id)
    def get_plan(self,id,userLocation):
        supabase = self.supabase_controller.get_supabase_client()
        #obtener el plan
        plan = supabase.table('plan').select('*').eq('plan_id', id).execute()
        plans_json = self.processresponseNoDF(plan)
        for plan in plans_json:
            plan_id = plan['plan_id']
            eventos = self.get_events_for_plan(plan_id)
            for evento in eventos:
                event_location = (evento['coord_x'], evento['coord_y'])
                distance = self.calcular_distancia_osm(userLocation[0], userLocation[1], event_location[0], event_location[1])
                evento['distance'] = distance
            plan['events'] = eventos
        return plans_json 
    
    def create_plan2(self,userid,ubicacion,max_distance,target_date,max_price):
        supabase = self.supabase_controller.get_supabase_client()

        #obtener los eventos para el usuario
        events = recommend_events_for_user(userid)
        allevents = self.supabase_controller.get_events()
        allevents = self.processresponseNoDF(allevents)
        events = self.filter_events_by_criteria(events,allevents,target_date,max_price)
        #filtrar los eventos segun el radio pasado por el front
        events = self.filter_events_by_distance(events, ubicacion, max_distance)

        treseventos = events[:3]

        if not treseventos:
            raise Exception("No se encontraron eventos que cumplan los criterios para crear el plan")

        created_at = datetime.now().timestamp()
        total_price = sum(evento['price'] for evento in treseventos)
        # Extrae las direcciones de inicio y fin
        start_direction = treseventos[0]['direccion_event'] if treseventos else None
        finish_direction = treseventos[-1]['direccion_event'] if treseventos else None
        plan = {
            'created_at': created_at,
            'start_date': target_date,
            'finish_date': target_date,
            'start_direction': start_direction,
            'finish_direction': finish_direction,
            'total_price': total_price,
            'user_id': userid
        }

        response = supabase.table('plan').insert(plan).execute()
        if response.error:
            print("Error al crear el plan",response.error)
        formatResponse = self.processresponseNoDF(response)
        for plan in formatResponse:
            plan_id = plan['plan_id']

        for evento in treseventos:
            plan_event = {
                'plan_id': plan_id,
                'event_id' : evento['id']
            }
            response = supabase.table('plan_event').insert(plan_event).execute()
            if response.error:
                print("Error al insertar evento en plan_event:", response.error)

        for pla in plan:
            pla['eventos'] = treseventos

        return plan





    def create_plan(self,jwt_token,ubicacion,max_distance,target_date,max_price):
        supabase = self.supabase_controller.get_supabase_client()

        #obtener los eventos para el usuario
        events = recommend_events_for_user(jwt_token)
        allevents = self.supabase_controller.get_events()
        allevents = self.processresponseNoDF(allevents)
        events = self.filter_events_by_criteria(events,allevents,target_date,max_price)
        #filtrar los eventos segun el radio pasado por el front
        events = self.filter_events_by_distance(events, ubicacion, max_distance)
        
        #crear un objeto plan en supabase y meter los eventos en plan_event
        created_at = datetime.datetime.now()
        for i in range(0, len(events), 3):
            # Extrae un subconjunto de tres eventos si es posible
            grupo_eventos = events[i:i+3]

            # Si el grupo no tiene 3 eventos, se detiene el bucle
            if len(grupo_eventos) < 3:
                break 

            # Calcula el precio total para el grupo de eventos actual
            total_price = sum(evento['price'] for evento in grupo_eventos)
             # Extrae las direcciones de inicio y fin
            start_direction = grupo_eventos[0]['direction'] if grupo_eventos else None
            finish_direction = grupo_eventos[-1]['direction'] if grupo_eventos else None
            plan = {
                'created_at': created_at,
                'description': 'Descripción del plan',  # Aquí puedes agregar una descripción relevante
                'start_date': target_date,
                'finish_date': target_date,
                'start_direction': start_direction,
                'finish_direction': finish_direction,
                'total_price': total_price,
                'user_id': jwt_token
            }
            response = self.supabase_controller.table('plan').insert(plan).execute()
            if response.error:
                print("Error al crear el plan",response.error)
                continue
            formatResponse = self.processresponseNoDF(response)
            for plan in formatResponse:
                plan_id = plan['plan_id']

            for evento in grupo_eventos:
                plan_event = {
                    'plan_id': plan_id,
                    'event_id' : evento['id']
                }
                response = supabase.table('plan_event').insert(plan_event).execute()
                if response.error:
                    print("Error al insertar evento en plan_event:", response.error)


    def valorate_events(self,event_id,jwt_token,nota,description_val):
        supabase = self.supabase_controller.get_supabase_client()
        userjwt_id = self.supabase_controller.GetUserIdFromjwt(jwt_token)
        #event = supabase.table('event').select('id').eq('id' , event_id).execute()
        supabase.table('valoration_event').insert({'event_id' : event_id, 'score' : nota, 'description_valoration' : description_val, 'auth_user_id' : userjwt_id}).execute()

    


    # POST - /plan      Crea un plan para un usario (JWT)


    ### PUT - /plan/:id   Modifica el plan de un usuario (id = plan_id)
    def modify_plan(self,plan):
        supabase = self.supabase_controller.get_supabase_client()
        events = plan.pop('events',[])
        try:
            modificaPlan = supabase.table('plan').upsert(plan).execute()
            eliminaEventos = supabase.table('plan_event').delete().eq('plan_id',plan).execute()
            for event_id in events:
                objeto_insert={'plan_id' : plan['plan_id'],
                                'event_id' : event_id['id']}
                modificaPlanEvent = supabase.table('plan_event').insert(objeto_insert).execute()
        except Exception as e:
            print("Error:",e)


    ### DELETE - /plan/:id    Elimina un plan (id = plan_id)
    def delete_plan(self,id):
        supabase = self.supabase_controller.get_supabase_client()
        try:
            eliminaPlan = supabase.table('plan').delete().eq('plan_id',id).execute()
            if eliminaPlan['status'] == 200:
                print("Plan eliminado exitosamente.")
            else:
                print("Error al eliminar el plan:", eliminaPlan['error'])
        except Exception as e:
            print("Error:", e)



    def get_events_for_plan(self, plan_id):
        supabase = self.supabase_controller.get_supabase_client()

        # Obtener los event_ids asociados al plan_id
        plan_events = supabase.table('plan_event').select('event_id').eq('plan_id', plan_id).execute()
        plan_events = self.processresponseNoDF(plan_events)
        event_ids = [plan_event['event_id'] for plan_event in plan_events]
        # Obtener los detalles de cada evento
        formatted_events = []
        for event_id in event_ids:
            event_details = supabase.table('event').select('*').eq('id', event_id).execute()
            formatted_event = self.processresponseNoDF(event_details)
            if formatted_event:
                formatted_events.append(formatted_event)

        return formatted_events



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
        
        
    def filtrarEventosPorDistancia(self, events, ubicacion, max_distance):
        # Extraer latitud y longitud de la ubicación del usuario
        try:
            lat, lon = map(float, ubicacion.split(','))
        except ValueError:
            return jsonify({'error': 'Invalid user location format'}), 400

        eventos_filtrados = [event for event in events if self.event_controller.haversine_distance(lat, lon, event['coord_y'], event['coord_x']) <= max_distance]
        return eventos_filtrados


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
            event_location = (event['coord_x'], event['coord_y'])
            distance = self.calcular_distancia_osm(user_location[0], user_location[1], event_location[0], event_location[1])
            if distance <= max_distance_km:
                filtered_events.append(event)
        return filtered_events
    

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

    def valorate_event(self,event_id,jwt_token,nota,description_val):
        supabase = self.supabase_controller.get_supabase_client()
        userjwt_id = self.supabase_controller.GetUserIdFromjwt(jwt_token)
        supabase.table('valoration_event').insert({'event_id' : event_id, 'score' : nota, 'description_valoration' : description_val, 'auth_user_id' : userjwt_id}).execute()
        
