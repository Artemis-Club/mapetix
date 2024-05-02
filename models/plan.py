class Plan:
    def __init__(self,plan_id,created_at,description,start_date,finish_date,start_direction,finish_direction,total_price,planEvent,start_hour,finish_hour,user_id):
        self.plan_id = plan_id
        self.created_at = created_at
        self.description = description
        self.start_date = start_date
        self.finish_date = finish_date
        self.start_direction = start_direction
        self.finish_direction = finish_direction
        self.total_price = total_price
        self.planEvent = planEvent
        self.start_hour = start_hour
        self.finish_hour = finish_hour
        self.user_id = user_id