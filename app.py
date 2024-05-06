from flask import Flask, request, jsonify 
from controllers.event_controller import EventController
from controllers.plan_controller import PlanController
from auth_middleware import require_authentication
from controllers.supabase_controller import SupabaseController

app = Flask(__name__)

event_controller = EventController()
plan_controller = PlanController()
supabase_controller = SupabaseController()

 ### GET - /events
@app.route('/events', methods=['GET'])
@require_authentication
def get_events():
    jwt_token = request.headers.get('Authorization')
    userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
    user_location = request.args.get('userLocation')
    if not user_location:
        return jsonify({'error':'No user location provided'}),400
    if(userjwt_id):
         return event_controller.get_events(userjwt_id,user_location)
    return jsonify({'usuario no válido'}),400
    

### DELETE - /plan/:id    Elimina un plan (id = plan_id)
@app.route('/plan/<int:id>', methods=['DELETE'])
@require_authentication
def delete_plan(id):
    jwt_token = request.headers.get('Authorization')
    userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
    if(userjwt_id):
         return plan_controller.delete_plan(id)
    return jsonify({'usuario no válido'}),400

 # GET - /plan/:id   Devuelve un plan concreto de un usuario (id = plan_id)
@app.route('/plan/<int:id>',methods=['GET'])
@require_authentication
def get_plan(id):
    jwt_token = request.headers.get('Authorization')
    userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
    user_location = request.args.get('userLocation')
    if not user_location:
        return jsonify({'error':'No user location provided'}),400
    if(userjwt_id):
        return plan_controller.get_plan(id,user_location)
    return jsonify({'usuario no válido'}),400

### PUT - /plan/:id  Modificar plan
@app.route('/plan/<int:id>',methods=['PUT'])
@require_authentication
def modify_plan(id):
    jwt_token = request.headers.get('Authorization')
    userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
    
    plan_data = request.get_json()
    if not plan_data:
        return jsonify({"error": "No data provided"}), 400
    if(userjwt_id):
        return plan_controller.modify_plan(id,plan_data)
    return jsonify({'usuario no válido'}),400

# POST - /plan      Crea un plan para un usario (JWT)
@app.route('/plan', methods = ['POST'])
@require_authentication
def create_plan():
    jwt_token = request.headers.get('Authorization')
    userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
    if userjwt_id:
        return plan_controller.create_plan(userjwt_id)
    return jsonify({'usuario no válido'}),400

 # GET - /plans      Obtiene los planes ya hecho por el usuario (JWT)
@app.route('/plans', methods = ['GET'])
@require_authentication
def get_plans_by_user():
    jwt_token = request.headers.get('Authorization')
    userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
    if(userjwt_id):
        return plan_controller.get_plans_by_user(userjwt_id)
    return jsonify({'usuario no válido'}),400
    

if __name__ == '__main__':
    app.run(debug=True)