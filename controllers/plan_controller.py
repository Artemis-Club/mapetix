from flask import request,jsonify
from controllers.supabase_controller import SupabaseController
import json
from datetime import datetime
from algoritmopruebausers import Algoritmo
from geopy.distance import geodesic

class PlanController:
    def __init__(self):
        self.supabase_controller = SupabaseController()
        self.algoritmo_controller = Algoritmo()

    # GET - /plans      Obtiene los planes ya hecho por el usuario con sus eventos(JWT)
    def get_plans_by_user(self, userjwt_id):
        supabase = self.supabase_controller.get_supabase_client()
        plans_by_user = supabase.table('plan').select('*').eq('user_id', userjwt_id).execute()
        plans_json = self.processresponseNoDF(plans_by_user)
        for plan in plans_json:
            plan_id = plan['plan_id']
            plan['events'] = self.get_events_for_plan(plan_id)
        return plans_json    

     # GET - /plan/:id   Devuelve un plan concreto de un usuario con sus eventos (id = plan_id)
    def get_plan(self,id,userLocation):
        supabase = self.supabase_controller.get_supabase_client()
        #obtener el plan
        plan = supabase.table('plan').select('*').eq('plan_id', id).execute()
        plans_json = self.processresponseNoDF(plan)
        for plan in plans_json:
            plan_id = plan['plan_id']
            eventos = self.get_events_for_plan(plan_id)
            #print(eventos)
            for evento_1 in eventos:
                for evento in evento_1:
                    event_location = (evento['coord_x'], evento['coord_y'])
                    distance = self.calcular_distancia_osm(userLocation[0], userLocation[1], event_location[0], event_location[1])
                    evento['distance'] = distance
            plan['events'] = eventos
        return plans_json 
    

    #crea un plan para el usuario con los parametros indicados
    def create_plan(self,userid,ubicacion,max_distance,target_date,max_price):
        supabase = self.supabase_controller.get_supabase_client()
        #obtener los eventos para el usuario
        events = self.algoritmo_controller.recommend_events_for_user(userid)
        allevents = self.supabase_controller.get_events()
        allevents = self.processresponseNoDF(allevents)
        events_valored = self.get_events_by_user(userid)
        #print(events_valored)
        events = self.filter_events_by_criteria(events,allevents,target_date,max_price,events_valored)
        #print(events)
        #filtrar los eventos segun el radio pasado por el front
        events = self.filter_events_by_distance(events, ubicacion, max_distance)
        eventos2 =[]
        for event in events:
            eventos2.append(event['id'])
        print(eventos2)


        treseventos = events[:3]
        #print(treseventos)

        if not treseventos:
            raise Exception("No se encontraron eventos que cumplan los criterios para crear el plan")

        created_at = created_at = datetime.now().isoformat()

        total_price = sum(evento['price'] for evento in treseventos if evento['price'] is not None)
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
        #print(plan)

        response = supabase.table('plan').insert(plan).execute()
        formatResponse = self.processresponseNoDF(response)
        for plan in formatResponse:
            plan_id = plan['plan_id']

        for evento in treseventos:
            plan_event = {
                'plan_id': plan_id,
                'event_id' : evento['id']
            }
            response = supabase.table('plan_event').insert(plan_event).execute()

        #for pla in plan:
        #    pla['eventos'] = treseventos
        plan['eventos'] = treseventos
        return plan


    #valora un evento
    def valorate_event(self,event_id,userjwt_id,nota,description_val):
        supabase = self.supabase_controller.get_supabase_client() 
        existe = supabase.table('valoration_event').select('*').eq('event_id', event_id).eq('auth_user_id', userjwt_id).execute()
        existe = self.supabase_controller.processresponseNoDF(existe)
        if existe:
            devuelve = supabase.table('valoration_event').update({'score': nota}).eq('event_id', event_id).eq('auth_user_id', userjwt_id).execute()
        else:
            devuelve = supabase.table('valoration_event').insert({'event_id' : event_id, 'score' : nota, 'description_valoration' : description_val, 'auth_user_id' : userjwt_id}).execute()
        return self.supabase_controller.processresponseNoDF(devuelve)

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

    def get_events_by_user(self,userjwt_id):
        supabase = self.supabase_controller.get_supabase_client()
        # Obtener los event_ids asociados al plan_id
        plan_events = supabase.table('valoration_event').select('event_id').eq('auth_user_id', userjwt_id).execute()
        lista = []
        plan_events = self.supabase_controller.processresponseNoDF(plan_events)
        for plan in plan_events:
            id = plan['event_id']
            lista.append(id)
        return lista

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
            for evento in formatted_event:
                evento_id = evento['id']
                evento['valoration'] = self.event_score(evento_id)
            #print(formatted_event)
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


    def filter_events_by_criteria(self,event_ids, events, target_date, max_price,valorados):
        filtered_events = []
        for event_id in event_ids:
            for event in events:
                if event['id'] not in valorados:
                    if event['id'] == event_id:
                        start_date = event['start_date']
                        finish_date = event['finish_date']
                        #print(f"Checking event {event_id}:")
                        if start_date <= target_date <= finish_date and (event['price'] is None or (event['price']) <= max_price):
                            #print(f"Event {event_id} meets criteria and added to filtered events.")
                            filtered_events.append(event)
                        #else:
                            #print(f"Event {event_id} does not meet criteria and is skipped.")

                        #break  # Salir del bucle interno una vez que se encuentra el evento
        return filtered_events
    

    def filter_events_by_distance(self,events, user_location, max_distance_km):
        filtered_events = []
        for event in events:
            event_location = (event['coord_x'], event['coord_y'])
            distance = self.calcular_distancia_osm(user_location[0], user_location[1], event_location[0], event_location[1])
            if distance <= max_distance_km:
                filtered_events.append(event)
        return filtered_events
    

    def calcular_distancia_osm(self,lat1, lon1, lat2, lon2):
        # Coordenadas de los puntos
        punto1 = (lat1, lon1)
        punto2 = (lat2, lon2)
        
        # Calcular distancia utilizando geopy
        distancia = geodesic(punto1, punto2).kilometers
        
        return distancia
    
    #obtiene la valoracion de un evento calculando la media de sus valoraciones por los usuarios
    def event_score(self,event_id):
        supabase = self.supabase_controller.get_supabase_client()
        valoraciones = supabase.table('valoration_event').select('*').eq('event_id', event_id).execute()
        valoraciones = self.supabase_controller.processresponseNoDF(valoraciones)
        #print(valoraciones)
        num_valoraciones = len(valoraciones)
        if num_valoraciones == 0:
            return 0
        suma_scores = sum(evento['score'] for evento in valoraciones)
        media_score = suma_scores / num_valoraciones
        return media_score
    
    def get_event_by_id(self,event_id):
        supabase = self.supabase_controller.get_supabase_client()
        eventos = supabase.table('event').select('*').eq('id', event_id).execute()
        eventos = self.supabase_controller.processresponseNoDF(eventos)
        return eventos

    
    
        
