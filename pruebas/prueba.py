import asyncio
from supabase import create_client
import os
from dotenv import load_dotenv



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
        
evento = valorate_events(3,'f738e219-5d68-441f-8e6b-6544a4d8a237', 8, 'pruebajavi')
print(evento)
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

