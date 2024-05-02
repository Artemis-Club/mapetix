import asyncio
from supabase import create_client
import os
from dotenv import load_dotenv



load_dotenv()
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY2')
supabase = create_client(supabase_url, supabase_key)

supabase.auth.sign_in_with_password({"email": "carlos@mail.com", "password": "Rest1234_"})
session = supabase.auth.get_session().access_token


userjwt = supabase.auth.get_user(session)
print(userjwt)
if userjwt:
    id_usuario = userjwt.user.id
    print("ID de usuario:", id_usuario)
else:
    print("El usuario no existe o no se encontró.")



res2 = supabase.auth.sign_out()
