from flask import Blueprint, jsonify, request
from controllers.plan_controller import PlanController
from auth_middleware import require_authentication
from controllers.supabase_controller import SupabaseController
from datetime import datetime

plan_view = Blueprint('plan-view', __name__)
plan_controller = PlanController()
supabase_controller = SupabaseController()

class PlanView:
    @plan_view.route('/plans', methods=['GET'])
    @require_authentication  # Aplicar el middleware de autenticación
    def get_plans():
        jwt_token = request.headers.get('Authorization')
        userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
        if userjwt_id:
            plans = plan_controller.get_plans_by_user(userjwt_id)
            return jsonify(plans)
        else:
            # Si el ID de usuario no existe, devolver un mensaje de error
            return jsonify({'error': 'Usuario no autorizado'}), 401



     # GET - /plan/:id   Devuelve un plan concreto de un usuario (id = plan_id)
    @plan_view.route('/plan/<int:id>',methods=['GET'])
    @require_authentication
    def get_plan(id):
        jwt_token = request.headers.get('Authorization')
        userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
        #if not user_location:
        #    return jsonify({'error':'No user location provided'}),400
        if userjwt_id:
            user_location = request.args.get('userLocation')
            user_location = tuple(map(float, user_location.split(',')))
            plan =  plan_controller.get_plan(id,user_location)
            return jsonify(plan)
        else:
            # Si el ID de usuario no existe, devolver un mensaje de error
            return jsonify({'error': 'Usuario no autorizado'}), 401
    


    @plan_view.route('/allevents', methods=['GET'])
    @require_authentication
    def get_all_events():
        jwt_token = request.headers.get('Authorization')
        userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
        if userjwt_id:
            allevents = supabase_controller.get_today_events()
            allevents = supabase_controller.processresponseNoDF(allevents)
            return jsonify(allevents)
        else:
            # Si el ID de usuario no existe, devolver un mensaje de error
            return jsonify({'error': 'Usuario no autorizado'}), 401

    
    @plan_view.route('/plan/rate/<int:id>',methods=['POST'])
    @require_authentication
    def rate_event(id):
        jwt_token = request.headers.get('Authorization')
        userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
        if userjwt_id:
            nota = request.args.get('Nota')
            description_val = request.args.get('Description')
            plan =  plan_controller.valorate_event(id,userjwt_id,nota,description_val)
            return jsonify(plan)
        else:
            # Si el ID de usuario no existe, devolver un mensaje de error
            return jsonify({'error': 'Usuario no autorizado'}), 401
    

    @plan_view.route('/plan',methods=['POST'])
    @require_authentication
    def create_plan():
        try:
            # Obtener el token JWT de la solicitud (suponiendo que está en el encabezado Authorization)
            jwt_token = request.headers.get('Authorization')
            userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
            #print(userjwt_id)
            if userjwt_id:
                user_location = request.args.get('userLocation')
                user_location = tuple(map(float, user_location.split(',')))
                max_distance = request.args.get('maxDistance')
                max_distance = float(max_distance)
                target_date = request.args.get('TargetDate')
                max_price = request.args.get('maxPrice')
                max_price = int(max_price)
                plans = plan_controller.create_plan(userjwt_id,user_location,max_distance,target_date,max_price)
                return jsonify(plans)
            else:
                # Si el ID de usuario no existe, devolver un mensaje de error
                return jsonify({'error': 'Usuario no autorizado'}), 401
            
        except Exception as e:
            # Manejar la excepción y devolver un mensaje de error adecuado
            return jsonify({'error': str(e)}), 400
        

    # GET - /plan/:id   Devuelve un plan concreto de un usuario (id = plan_id)
    @plan_view.route('/event/<int:id>',methods=['GET'])
    @require_authentication
    def get_event(id):
        jwt_token = request.headers.get('Authorization')
        userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
        #if not user_location:
        #    return jsonify({'error':'No user location provided'}),400
        if userjwt_id:
            event =  plan_controller.get_event_by_id(id)
            return jsonify(event)
        else:
            # Si el ID de usuario no existe, devolver un mensaje de error
            return jsonify({'error': 'Usuario no autorizado'}), 401