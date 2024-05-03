from flask import Blueprint
from views import plan_view, PlanView


class Router:
    def __init__(self, app):
        self.app = app
        plan_bp = Blueprint('plan', __name__)
        # Registrar las rutas definidas en la vista de los planes en el Blueprint
        plan_bp.add_url_rule('/plans', view_func=PlanView.get_plans)
        # Registrar el Blueprint en la aplicación Flask
        self.app.register_blueprint(plan_bp)