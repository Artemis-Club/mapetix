from flask import Blueprint, jsonify, request
from controllers.plan_controller import PlanController
from auth_middleware import require_authentication
from controllers.supabase_controller import SupabaseController

plan_view = Blueprint('plan-view', __name__)
plan_controller = PlanController()
supabase_controller = SupabaseController()

class PlanView:
    @plan_view.route('/plans', methods=['GET'])
    @require_authentication  # Aplicar el middleware de autenticación
    def get_plans():
        # Obtener el token JWT de la solicitud (suponiendo que está en el encabezado Authorization)
        jwt_token = request.headers.get('Authorization')
        #session = supabase_controller.Prueba()
        #print('la sesion es')
        #print(session)
        userjwt_id = supabase_controller.GetUserIdFromjwt(jwt_token)
        #print(userjwt_id)
        if userjwt_id:
            # Si el ID de usuario existe, obtener los planes del usuario utilizando el controlador de planes
            plans = plan_controller.get_plans_by_user(jwt_token)
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
        #user_location = request.args.get('userLocation')
        #if not user_location:
        #    return jsonify({'error':'No user location provided'}),400
        #if userjwt_id:
        plan =  plan_controller.get_plan(id)
        return jsonify(plan)
        return jsonify({'error': 'Usuario no autorizado'}), 401