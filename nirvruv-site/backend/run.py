import os
from app import create_app, db
from app.models import User, Service, Course, Contact

app = create_app(os.getenv('FLASK_ENV', 'development'))

@app.shell_context_processor
def make_shell_context():
    """Create shell context for flask shell"""
    return {
        'db': db,
        'User': User,
        'Service': Service,
        'Course': Course,
        'Contact': Contact
    }

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return {'status': 'ok', 'message': 'Server is running'}, 200

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(os.getenv('FLASK_PORT', 5000)),
        debug=os.getenv('FLASK_ENV') == 'development'
    )
