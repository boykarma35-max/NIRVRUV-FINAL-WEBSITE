from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import config

db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_name='development'):
    """Application factory function"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # Register blueprints
    from app.routes import auth_bp, services_bp, courses_bp, contacts_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(services_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(contacts_bp)
    
    # Create tables
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print(f"Warning: Could not connect to database on startup. {e}")
    
    return app
