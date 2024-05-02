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
print('ids de usuarios : ' , ids_usuarios)
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

