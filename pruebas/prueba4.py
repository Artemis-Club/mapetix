import math

def calcular_distancia(lat1, lon1, lat2, lon2):
    """
    Calcula la distancia en kilómetros entre dos puntos
    utilizando la fórmula de Haversine.
    
    :param lat1: Latitud del primer punto en grados decimales
    :param lon1: Longitud del primer punto en grados decimales
    :param lat2: Latitud del segundo punto en grados decimales
    :param lon2: Longitud del segundo punto en grados decimales
    :return: Distancia entre los dos puntos en kilómetros
    """
    # Radio de la Tierra en kilómetros
    radio_tierra = 6371.0
    
    # Convertir coordenadas de grados a radianes
    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)
    
    # Diferencia de latitud y longitud
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    # Fórmula de Haversine
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    # Distancia
    distancia = radio_tierra * c
    
    return distancia


from geopy.distance import geodesic

def calcular_distancia_osm(lat1, lon1, lat2, lon2):
    """
    Calcula la distancia en kilómetros entre dos puntos
    utilizando OpenStreetMap y la biblioteca geopy.
    
    :param lat1: Latitud del primer punto en grados decimales
    :param lon1: Longitud del primer punto en grados decimales
    :param lat2: Latitud del segundo punto en grados decimales
    :param lon2: Longitud del segundo punto en grados decimales
    :return: Distancia entre los dos puntos en kilómetros
    """
    # Coordenadas de los puntos
    punto1 = (lat1, lon1)
    punto2 = (lat2, lon2)
    
    # Calcular distancia utilizando geopy
    distancia = geodesic(punto1, punto2).kilometers
    
    return distancia


# Coordenadas del usuario
usuario_lat = 39.480609
usuario_lon = -0.3589077

# Coordenadas del evento
evento_lat = 39.4661817
evento_lon = -0.3610124

# Calcular distancia
distancia = calcular_distancia(usuario_lat, usuario_lon, evento_lat, evento_lon)
print("La distancia entre el usuario y el evento es:", distancia, "kilómetros")

distancia_osm = calcular_distancia_osm(usuario_lat, usuario_lon, evento_lat, evento_lon)
print("La distancia entre el usuario y el evento es:", distancia_osm, "kilómetros")
