import pandas as pd
from controllers.supabase_controller import SupabaseController
import pandas as pd
import numpy as np

class Algoritmo:
    def __init__(self):
        self.supabase_controller = SupabaseController()

    def get_events(self):
        events = self.supabase_controller.get_events()
        ##print(events)
        return events

    def get_users(self):
        users_sorted = self.supabase_controller.get_users()
        return users_sorted

    def get_valorations(self):
        plans = self.supabase_controller.get_valorations()
        return plans



    def recommend_events(self,similarity_matrix, ratings_matrix,usuario_id,df_matrix):
        n_users, n_events = ratings_matrix.shape
        recommendation_matrix = np.zeros((n_users, n_events))
        for user_id in range(n_users): 
            user_id_actual = df_matrix.index[user_id]
            if user_id_actual == usuario_id:
                for event_id in range(n_events):
                    if ratings_matrix[user_id, event_id] == 0:  # Solo recomendamos eventos no vistos
                        recommendation_score = 0
                        total_weight = 0
                        contador = 0
                        for similar_user_id, similarity in enumerate(similarity_matrix[user_id]):
                            similar_user_rating = ratings_matrix[similar_user_id, event_id]
                            if similarity != 0 and similar_user_rating != 0 :

                            
                                # Transformación de las valoraciones
                                transformed_rating = (similar_user_rating - 5) * (10 / 5)

                                # Multiplicación por la similitud entre usuarios
                                weighted_rating = similarity * transformed_rating

                                recommendation_score += weighted_rating
                                if similarity != 0 and transformed_rating != -10:
                                    contador += 1

                        if recommendation_score!= -10:
                            if contador != 0:
                                recommendation_score/=contador

                        recommendation_matrix[user_id, event_id] = recommendation_score


        return recommendation_matrix

    def calculate_similarity_matrix(self,ratings):
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





    def recommend_events_for_user(self,usuario_id):
        df_ratings = self.supabase_controller.processresponse(self.get_valorations())
        df_events = self.supabase_controller.processresponse(self.get_events())
        df_users = self.supabase_controller.processresponseusers(self.get_users())

        # Calcula la matriz de calificaciones
        df_matrix = pd.pivot_table(df_ratings, values='score', index='auth_user_id', columns='event_id').fillna(0)
        ratings = df_matrix.values
        sim_matrix = self.calculate_similarity_matrix(ratings)


        users_predictions2 = self.recommend_events(sim_matrix,ratings,usuario_id,df_matrix)

        n_users, n_events = ratings.shape
        for user_id in range(n_users): 
            user_id_actual = df_matrix.index[user_id]
            #print(user_id_actual)
            if user_id_actual == usuario_id:
                prueba = user_id

        #print(users_predictions2)
        fila_deseada = users_predictions2[prueba]
        ordennuevo = np.sort(fila_deseada)[::-1]
        user_recommendations2 = fila_deseada.argsort()[::-1]
        event_ids = df_matrix.columns[user_recommendations2].tolist()


        event_scores_dict = {event_id: score for event_id, score in zip(event_ids, ordennuevo)}
        all_event_ids = df_events['id'].tolist()
        for event_id in all_event_ids:
            if event_id not in event_scores_dict:
                event_scores_dict[event_id] = 0.

        sorted_event_scores = sorted(event_scores_dict.items(), key=lambda x: x[1], reverse=True)

        # Extraer solo los IDs de eventos ordenados según sus puntuaciones
        sorted_event_ids = [event_id for event_id, score in sorted_event_scores]


        # Crear una lista para almacenar los nombres de los eventos en el mismo orden que event_ids
        event_names_ordered = []

        # Iterar sobre los IDs de evento en event_ids y buscar el nombre de cada evento en df_events
        for event_id in sorted_event_ids:
            event_name = df_events[df_events['id'] == event_id]['event_name'].iloc[0]
            event_names_ordered.append(event_name)

        return sorted_event_ids    


