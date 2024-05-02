from supabase_controller import SupabaseController
import json
supabase_controller = SupabaseController()
session = supabase_controller.Prueba()
user_id = supabase_controller.GetUserIdFromjwt(session)
supabase = supabase_controller.get_supabase_client()
plans_by_user = supabase.table('plan').select('*').eq('user_id', user_id).execute()

def processresponseNoDF(response):
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
    
plans_by_user_processed = processresponseNoDF(plans_by_user)
print(plans_by_user_processed)
res2 = supabase.auth.sign_out()
