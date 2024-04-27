def filter_events_by_criteria(event_ids, events, target_date, max_price):
    filtered_events = []
    for event_id in event_ids:
        for event in events:
            if event['id'] == event_id:
                print(f"Checking event {event_id}:")
                if event['start_date'] <= target_date <= event['finish_date'] and (event['price'] is None or event['price'] <= max_price):
                    print(f"Event {event_id} meets criteria and added to filtered events.")
                    filtered_events.append(event)
                else:
                    print(f"Event {event_id} does not meet criteria and is skipped.")
                break  # Salir del bucle interno una vez que se encuentra el evento
    return filtered_events
