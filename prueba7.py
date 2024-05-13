from flask import Blueprint, jsonify, request
from supabase import create_client
import os
from dotenv import load_dotenv
import json
from algoritmopruebausers import Algoritmo
from controllers.supabase_controller import SupabaseController
import random

algoritmo_controller = Algoritmo()
supabase_controller = SupabaseController()



def event_score(event_id):
        supabase = supabase_controller.get_supabase_client()
        valoraciones = supabase.table('valoration_event').select('*').eq('event_id', event_id).execute()
        valoraciones = supabase_controller.processresponseNoDF(valoraciones)
        print(valoraciones)
        num_valoraciones = len(valoraciones)
        if num_valoraciones == 0:
            return 0
        suma_scores = sum(evento['score'] for evento in valoraciones)
        media_score = suma_scores / num_valoraciones
        return media_score

def events_rated_by_user(userid):
        supabase = supabase_controller.get_supabase_client()
        eventos = supabase.table('valoration_event').select('event_id').eq('auth_user_id' , userid).execute()
        eventos = supabase_controller.processresponseNoDF(eventos)
        return eventos


def get_events():
    supabase = supabase_controller.get_supabase_client()
    events = supabase.table('event').select('*').execute()
    return events

events = get_events()
events = supabase_controller.processresponseNoDF(events)
random.shuffle(events)
lista = []
for event in events:
    id = event['id']
    lista.append(id)
print(lista)
