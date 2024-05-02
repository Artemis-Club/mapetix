from flask import Flask, request
from controllers import EventController
from controllers import PlanController

app = Flask(__name__)

event_controller = EventController()
plan_controller = PlanController()

 ### GET - /events
@app.route('/events', methods=['GET'])
def get_events():
    return event_controller.get_events(request)

### DELETE - /plan/:id    Elimina un plan (id = plan_id)
@app.route('/plan/<int:id>', methods=['DELETE'])
def delete_plan(id):
    return plan_controller.delete_plan(id)

 # GET - /plan/:id   Devuelve un plan concreto de un usuario (id = plan_id)
@app.route('/plan/<int:id>',methods=['GET'])
def get_plan(id):
    return plan_controller.get_plan(id)

if __name__ == '__main__':
    app.run(debug=True)