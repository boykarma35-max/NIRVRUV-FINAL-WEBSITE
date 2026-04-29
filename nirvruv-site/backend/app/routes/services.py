from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, Service
from . import services_bp

@services_bp.route('', methods=['GET'])
def get_services():
    """Get all active services"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        query = Service.query.filter_by(is_active=True)
        
        # Filter by category if provided
        category = request.args.get('category')
        if category:
            query = query.filter_by(category=category)
        
        paginated = query.paginate(page=page, per_page=per_page)
        
        return jsonify({
            'services': [s.to_dict() for s in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@services_bp.route('/<int:id>', methods=['GET'])
def get_service(id):
    """Get a specific service"""
    try:
        service = Service.query.get(id)
        
        if not service or not service.is_active:
            return jsonify({'error': 'Service not found'}), 404
        
        return jsonify(service.to_dict()), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@services_bp.route('', methods=['POST'])
@jwt_required()
def create_service():
    """Create a new service (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        if not data.get('name') or not data.get('description'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        service = Service(
            name=data['name'],
            description=data['description'],
            price=data.get('price'),
            duration=data.get('duration'),
            category=data.get('category'),
            icon=data.get('icon'),
            features=data.get('features'),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(service)
        db.session.commit()
        
        return jsonify({
            'message': 'Service created successfully',
            'service': service.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@services_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_service(id):
    """Update a service (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        service = Service.query.get(id)
        
        if not service:
            return jsonify({'error': 'Service not found'}), 404
        
        data = request.get_json()
        
        service.name = data.get('name', service.name)
        service.description = data.get('description', service.description)
        service.price = data.get('price', service.price)
        service.duration = data.get('duration', service.duration)
        service.category = data.get('category', service.category)
        service.icon = data.get('icon', service.icon)
        service.features = data.get('features', service.features)
        service.is_active = data.get('is_active', service.is_active)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Service updated successfully',
            'service': service.to_dict()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@services_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_service(id):
    """Delete a service (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        service = Service.query.get(id)
        
        if not service:
            return jsonify({'error': 'Service not found'}), 404
        
        db.session.delete(service)
        db.session.commit()
        
        return jsonify({'message': 'Service deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
