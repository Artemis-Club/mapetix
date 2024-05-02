from flask import request,jsonify
from supabase_controller import SupabaseController

class PlanController:
    def __init__(self):
        #self.plan_service = PlanService()
        self.supabase_controller = SupabaseController()

    # GET - /plans      Obtiene los planes ya hecho por el usuario (JWT)
    def get_plans_by_user(self, jwt_token):
        supabase = self.supabase_controller.get_supabase_client()
        userjwt_id = self.supabase_controller.GetUserIdFromjwt(jwt_token)
        plans_by_user = supabase.table('plan').select('*').eq('user_id', userjwt_id).execute()
        
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