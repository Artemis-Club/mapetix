from flask import request,jsonify
from supabase_controller import SupabaseController
import json

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
    

     # GET - /plan/:id   Devuelve un plan concreto de un usuario (id = plan_id)
    def get_plan(id):
        supabase = get_supabase_client
        #obtener el plan
        plan = supabase.table('plan').select('*').eq('plan_id', id).execute()
        #obtener los eventos de un plan
        event_ids = supabase.table('plan_event').select('event_id').eq('plan_id',id).execute()

        #obtener los detalles de cada evento
        events_details = [
            supabase.table('events')
                .select('*')
                .eq('id', event_id['id'])
                .execute()
            for event_id in event_ids
        ]

        #dar el formato correcto a los eventos
        formatted_events = {
            "id": 3, 
            "price": 200,
            "status": null,
            "latitude": 39.471373,
            "longitude": -0.386638,
            "name": "Comida guay 🥘",
            "description": "Una comida etc xd",
            "startAt": "2024-04-22T21:46:38.536882+00:00",
            "endAt": "2024-04-22T21:46:38.536882+00:00",
            "createdBy": 5,
            "createdAt": "2024-04-22T21:46:38.536882+00:00",
            "updatedAt": "2024-04-22T21:46:38.536882+00:00",
            "score": 4.2, 
            "categories": ["food", "outdoors"],
            "distance": 39231, 
            "timeTaken": 39231, 
            "gallery"  :[]
        }

        #dar el formato correcto al plan POR TERMINAR
        formatted_plan = {
            "id": plan[0]['id'],
            "createdAt": plan[0]['created_at'],
            "description": plan[0]['description'],
            "startAt": plan[0]['start_date'],
            "endAt": plan[0]['end_at'],
            "totalPrice": plan[0]['total_price'],
            "userId": plan[0]['user_id'],
            "events": formatted_events
        }

        
        return plan
    


    # POST - /plan      Crea un plan para un usario (JWT)


    ### PUT - /plan/:id   Modifica el plan de un usuario (id = plan_id)



    ### DELETE - /plan/:id    Elimina un plan (id = plan_id)
    def delete_plan(id):
        supabase = get_supabase_client
        eliminaPlan = supabase.table('plan').delete().eq('plan_id',id).execute()


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

        
