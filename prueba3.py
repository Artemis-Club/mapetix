from controllers.supabase_controller import SupabaseController
import json
from controllers.plan_controller import PlanController
import jwt
import os
import time

def is_valid_token(token):
        secret = os.getenv('SUPABASE_JWT')
        #token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6Ik5hbGpHQUtCQ3VNZWlkclkiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE1MzU5MDA0LCJpYXQiOjE3MTQ3NTQyMDQsImlzcyI6Imh0dHBzOi8va3V1dGpqYWtuaHdubGlqamFjcXQuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjhmYWI1NzAxLWVhODQtNGQ3Ni1hMzJmLTEyMzJmMmZkYTk4ZCIsImVtYWlsIjoiamF2aUBwcnVlYmEuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MTQ3NTQyMDR9XSwic2Vzc2lvbl9pZCI6IjJjYTRmNzkzLTc2YmMtNDg2Ni05YjYwLTBiYzhiNzgxOWJjZCIsImlzX2Fub255bW91cyI6ZmFsc2V9.wF2y7UEBKqJztoQjUedfd9DXASjaZ7x3MQvnYlF9MTv'
        try:
            test =  jwt.decode(token, secret, algorithms=["HS256"],options={"verify_aud": False ,"verify_iat":False})
            return test
        
        except Exception as e:
            print(str(e))

supabase_controller = SupabaseController()
plan_contr = PlanController()
session = supabase_controller.Prueba()
print(session)



# Validas el token JWT
decoded_token = is_valid_token(session)
print(decoded_token)

user_id = plan_contr.get_plans_by_user(session)
print(user_id)
def2 = supabase_controller.SignOut()








#supabase = supabase_controller.get_supabase_client()
#plans_by_user = supabase.table('plan').select('*').eq('user_id', user_id).execute()


    
#plans_by_user_processed = processresponseNoDF(plans_by_user)
#print(plans_by_user_processed)

