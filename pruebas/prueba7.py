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
    events = supabase.table('event').select('*').order('id',desc=True).execute()
    return events

events = get_events()
events = supabase_controller.processresponseNoDF(events)
lista=[]
for e in events:
    id = e['id']
    lista.append(id)
print(lista)
def filter_events_by_date(events, target_date,):
        filtered_events = []
        for event in events:
            start_date = event['start_date']
            finish_date = event['finish_date']
            #print(f"Checking event {event_id}:")
            if start_date <= target_date <= finish_date:
                filtered_events.append(event)
        return filtered_events


ev = filter_events_by_date(events, '2024-05-31')
lista=[]
for e in ev:
    id = e['id']
    lista.append(id)
print(lista)