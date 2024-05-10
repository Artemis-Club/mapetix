import os
import jwt
from supabase import create_client
from dotenv import load_dotenv
import json

class SupabaseController:

    supabase_token = os.getenv('SUPABASE_JWT')
    
    def __init__(self):
        load_dotenv()

        supabase_url = os.getenv('SUPABASE_URL')
        supabase_key = os.getenv('SUPABASE_KEY2')
        

        self.supabase_client = create_client(supabase_url, supabase_key)

    def get_supabase_client(self):
        return self.supabase_client
        

    def GetuserID(self, jwt_token):
        try:
            #decodificar el token
            payload = jwt.decode(jwt_token)

            #obtener el valor del id de usuario
            user_id = payload.get('id')
            return user_id
        
        except jwt.ExpiredSignatureError:
            # Manejar el caso en el que el token JWT haya expirado
            return None
        except jwt.InvalidTokenError:
            # Manejar el caso en el que el token JWT sea inválido
            return None
        
    def GetUserIdFromjwt(self,jwt_token):
        try:
            supabase = self.get_supabase_client()
            userjwt = supabase.auth.get_user(jwt_token)
            #print(userjwt)
            if userjwt:
                id_usuario = userjwt.user.id
                return id_usuario
            else:
                return None
            
        except Exception as e:
            #print(f"Error al obtener el ID de usuario del token JWT: {str(e)}")
            return None

    def Prueba(self):
        supabase = self.get_supabase_client()
        supabase.auth.sign_in_with_password({"email": "carlos@mail.com", "password": "Rest1234_"})
        session = supabase.auth.get_session().access_token
        return session
    
    def SignOut(self):
        supabase = self.get_supabase_client()
        supabase.auth.sign_out()

    def get_events(self):
        supabase = self.get_supabase_client()
        events = supabase.table('event').select('*').order('id', desc=False).execute()
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

