import os
from supabase import create_client, Client
import pandas as pd
import json

# Cargar variables de entorno desde el archivo .env si existe
from dotenv import load_dotenv
load_dotenv()
# Configuración de Supabase
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase : Client = create_client(url, key)

def get_events():
    events = supabase.table('event').select('*').order('id', desc=False).execute()
    return events

def get_users():
    profiles = supabase.table('user').select('*').order('id', desc=False).execute()
    return profiles

def get_valorations():
    plans = supabase.table('valoration_event').select('*').execute()
    return plans



def processresponse(response):
    try:
        # Obtener los datos en formato JSON utilizando el método model_dump_json()
        response_json = response.model_dump_json()

        # Convertir los datos en un diccionario
        response_dict = json.loads(response_json)

        # Acceder a los datos de las valoraciones
        valorations_data = response_dict['data']

        # Convertir los datos en un DataFrame de Pandas
        df_bien = pd.DataFrame(valorations_data)

        return df_bien

    except Exception as e:
        print("Error:", e)
        return None



events_data = get_events()
users_data = get_users()
valorations_data = get_valorations()

df_users = processresponse(users_data)
print(df_users.head())
df_events = processresponse(events_data)
print(df_events.head())
df_valorations = processresponse(valorations_data)
print(df_valorations)



import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
import sklearn
from scipy.stats import pearsonr
from sklearn.metrics.pairwise import cosine_similarity

np.set_printoptions(precision=2)


def recommend_events(similarity_matrix, ratings_matrix,username):
    n_users, n_events = ratings_matrix.shape
    recommendation_matrix = np.zeros((n_users, n_events))
    print(n_users)
    for user_id in range(n_users):
        data = df_users[df_users['username'] == username]
        usuario_ver = data.index[0] 
        if user_id == usuario_ver:
            for event_id in range(n_events):
                if ratings_matrix[user_id, event_id] == 0:  # Solo recomendamos eventos no vistos
                    recommendation_score = 0
                    total_weight = 0
                    contador = 0
                    for similar_user_id, similarity in enumerate(similarity_matrix[user_id]):
                        similar_user_rating = ratings_matrix[similar_user_id, event_id]
                        if similarity != 0 and similar_user_rating != 0 :
                            print('El rating del user : ')
                            print(similar_user_id+1)
                            print('Para el evento : ')
                            print(event_id+1)
                            print(similar_user_rating)
                        
                            # Transformación de las valoraciones
                            transformed_rating = (similar_user_rating - 5) * (10 / 5)

                            # Multiplicación por la similitud entre usuarios
                            weighted_rating = similarity * transformed_rating

                            recommendation_score += weighted_rating
                            if similarity != 0 and transformed_rating != -10:
                                contador += 1
                            print('Score : ')
                            print(recommendation_score)
                            print('Contador :')
                            print(contador) 
                    if recommendation_score!= -10:
                        if contador != 0:
                            recommendation_score/=contador

                    recommendation_matrix[user_id, event_id] = recommendation_score
                    print('El score para el user y evento')
                    print(user_id+1)
                    print(event_id+1)
                    print(recommendation_score)

    return recommendation_matrix

def calculate_similarity_matrix(ratings):
    # Calcula la matriz de similitud entre usuarios basada en las diferencias de valoraciones
    n_users = len(ratings)
    similarity_matrix = np.zeros((n_users, n_users))

    for i in range(n_users):
        for j in range(i, n_users):  # Solo necesitamos calcular la mitad superior de la matriz
            if i == j:
                similarity_matrix[i, j] = 1  # La similitud de un usuario consigo mismo es 1
            else:
                # Encuentra las valoraciones comunes entre los usuarios i y j
                mask = np.logical_and(ratings[i] != 0, ratings[j] != 0)
                common_ratings = ratings[i][mask]
                other_user_ratings = ratings[j][mask]
                if np.sum(mask) > 0:
                    # Calcula la diferencia absoluta media ponderada entre las valoraciones comunes
                    weight = np.mean(np.abs(common_ratings - other_user_ratings))
                    # Normaliza la diferencia entre 0 y 1
                    similarity = 1 / (1 + weight)
                    similarity_matrix[i, j] = similarity
                    similarity_matrix[j, i] = similarity  # La matriz es simétrica
                else:
                    # Si no hay valoraciones comunes, asigna una similitud de 0
                    similarity_matrix[i, j] = 0
                    similarity_matrix[j, i] = 0

    return similarity_matrix





def recommend_events_for_user(username):

    df_ratings = processresponse(valorations_data)
    df_events = processresponse(events_data)
    df_users = processresponse(users_data)

    # Calcula la matriz de calificaciones
    df_matrix = pd.pivot_table(df_ratings, values='score', index='user_id', columns='event_id').fillna(0)
    ratings = df_matrix.values
    print(df_matrix)
    #print(df_matrix.index[0][0])
    # Calcula la similitud de coseno entre usuarios
    sim_matrix = calculate_similarity_matrix(ratings)
    print(sim_matrix)
    
    print(sim_matrix.shape)

    users_predictions2 = recommend_events(sim_matrix,ratings,username)



    print(users_predictions2)
    # Encuentra el usuario en el conjunto de datos
    data = df_users[df_users['username'] == username]
    usuario_ver = data.index[0] 
    print("Índice de fila del usuario:", usuario_ver)
    print(users_predictions2[usuario_ver])
    print('De menos a mas')
    user_recommendations2 = users_predictions2.argsort()[usuario_ver]
    print(user_recommendations2)
    event_ids = df_matrix.columns[user_recommendations2].tolist()
    print(event_ids)

    # Crear una lista para almacenar los nombres de los eventos en el mismo orden que event_ids
    event_names_ordered = []

    # Iterar sobre los IDs de evento en event_ids y buscar el nombre de cada evento en df_events
    for event_id in event_ids:
        event_name = df_events[df_events['id'] == event_id]['event_name'].iloc[0]
        event_names_ordered.append(event_name)

    print(event_names_ordered)

    return event_names_ordered    
# Llama a la función con el nombre de usuario deseado
recommendations = recommend_events_for_user('userprueba2')
print(recommendations)

