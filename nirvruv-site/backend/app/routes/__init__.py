from flask import Blueprint

# Create blueprints
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
services_bp = Blueprint('services', __name__, url_prefix='/api/services')
courses_bp = Blueprint('courses', __name__, url_prefix='/api/courses')
contacts_bp = Blueprint('contacts', __name__, url_prefix='/api/contacts')

# Import routes to register them
from .auth import *
from .services import *
from .courses import *
from .contacts import *
