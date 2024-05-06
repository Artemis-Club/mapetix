from flask import request,jsonify
from algoritmobueno import recommend_events_for_user
import math

class EventController:


    ### GET - /events
    def get_events(self, user_id,ubicacion):

        events = recommend_events_for_user(user_id)

        #aplicar filtro por horas

        #aplicar filtro de ubicacion
        events_ubicado = self.ordenarEventosDistancia(events,ubicacion)

        # Convertimos los objetos Event a diccionarios antes de jsonify
        events_dict = [event.__dict__ for event in events]
        
        return jsonify(events_dict)


    #ordena los eventos por distancia segun el array de eventos y la ubicacion del usuario
    def ordenarEventosDistancia(self,events,ubicacion):
        #extraer latitud y longitud de la ubicacion del usuario
        try:
            lat, lon = map(float, ubicacion.split(','))
        except ValueError:
            return jsonify({'error': 'Invalid user location format'}), 400

        events.sort(key=lambda event: self.haversine_distance(lat, lon, events['coord_y'], events['coord_x']))
        return events     
    

    #calcular distancia entre dos puntos segun latitud y longitud
    @staticmethod
    def haversine_distance(lat1, lon1, lat2, lon2):
        # Convertir grados en radianes
        lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    
        # Haversine formula
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
        c = 2 * math.asin(math.sqrt(a))
    
        # Radio de la Tierra en km
        r = 6371
        return c * r