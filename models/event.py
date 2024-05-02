# events/model.py
class Event:
    def __init__(self, id,event_name, coord_x, coord_y, description, creation_date, start_date, finish_date, price, direccion_event, cp_event, valoration, user_author, updated_at, status, start_hour, finish_hour):
        self.id = id
        self.event_name = event_name
        self.coord_x = coord_x
        self.coord_y = coord_y
        self.description = description    
        self.creation_date = creation_date
        self.start_date = start_date
        self.finish_date = finish_date
        self.price = price
        self.direccion_event = direccion_event
        self.cp_event = cp_event
        self.valoration = valoration
        self.user_author = user_author
        self.updated_at = updated_at
        self.status = status
        self.start_hour = start_hour
        self.finish_hour = finish_hour