from flask import request,jsonify
from supabase_client import GetUserID
from algoritmobueno import recommend_events_for_user

class EventController:

    ### GET - /events
    def get_events(self, request):
        
        user_id = GetUserID(request)

        events = recommend_events_for_user(user_id)

         #aplicar filtro de ubicacion
        
        #aplicar filtro por horas


        # Convertimos los objetos Event a diccionarios antes de jsonify
        events_dict = [event.__dict__ for event in events]
        
        return jsonify(events_dict)     