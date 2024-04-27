from algoritmobueno import recommend_events_for_user
from filter_events import filter_events_by_criteria
from algoritmobueno import get_events, processresponseNoDF
from algoritmobueno import df_events

id_usuario = 7

eventos_ordenados = recommend_events_for_user(id_usuario)
print(eventos_ordenados)

eventos = get_events()
eventosjson = processresponseNoDF(eventos)
#print(eventosjson)

target_date = '2024-04-23'
target_price = 3

eventos_filtrados = filter_events_by_criteria(eventos_ordenados,eventosjson,target_date,target_price)
print('Los eventos filtrados son : ')
print(eventos_filtrados)