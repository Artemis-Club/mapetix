from flask import request,jsonify
from controllers.supabase_controller import SupabaseController
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
    

     # GET - /plan/:id   Devuelve un plan concreto de un usuario (id = plan_id)
    def get_plan(self,id):
        supabase = self.supabase_controller.get_supabase_client()
        #obtener el plan
        plan = supabase.table('plan').select('*').eq('plan_id', id).execute()
        plans_json = self.processresponseNoDF(plan)
        for plan in plans_json:
            plan_id = plan['plan_id']
            plan['events'] = self.get_events_for_plan(plan_id)
        return plans_json 
    


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

        
