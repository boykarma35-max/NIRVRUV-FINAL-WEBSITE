import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    CORS_HEADERS = 'Content-Type'

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    
    db_url = os.getenv(
        'DATABASE_URL',
        'mysql+mysqlconnector://root:password@localhost:3306/nirvruv_db'
    )
    if db_url and 'aivencloud' in db_url:
        db_url = db_url.replace('mysql+mysqlconnector://', 'mysql+pymysql://')
        db_url = db_url.replace('?ssl-mode=REQUIRED', '')
        
    SQLALCHEMY_DATABASE_URI = db_url

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    
    # Auto-fix Aiven URLs for production deployment
    db_url = os.getenv('DATABASE_URL')
    if db_url:
        db_url = db_url.replace('mysql+mysqlconnector://', 'mysql+pymysql://')
        db_url = db_url.replace('?ssl-mode=REQUIRED', '')
    SQLALCHEMY_DATABASE_URI = db_url

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
