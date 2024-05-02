from supabase_controller import SupabaseController
import json
from plan_controller import PlanController


supabase_controller = SupabaseController()
plan_contr = PlanController()
session = supabase_controller.Prueba()

user_id = plan_contr.get_plans_by_user(session)
print(user_id)
#supabase = supabase_controller.get_supabase_client()
#plans_by_user = supabase.table('plan').select('*').eq('user_id', user_id).execute()


    
#plans_by_user_processed = processresponseNoDF(plans_by_user)
#print(plans_by_user_processed)

