from flask import Blueprint
from views import plan_view, PlanView


class Router:
    def __init__(self, app):
        self.app = app
        plan_bp = Blueprint('plan', __name__)
        plan_bp2 = Blueprint('plan2', __name__ )
        # Registrar las rutas definidas en la vista de los planes en el Blueprint
        plan_bp.add_url_rule('/plans', view_func=PlanView.get_plans)
        plan_bp2.add_url_rule('/plan/<int:id>', view_func=PlanView.get_plan)
        # Registrar el Blueprint en la aplicación Flask
        self.app.register_blueprint(plan_bp)
        self.app.register_blueprint(plan_bp2)