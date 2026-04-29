from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, Contact
from app.utils.validators import validate_email
from . import contacts_bp

@contacts_bp.route('', methods=['POST'])
def submit_contact():
    """Submit a contact form"""
    try:
        data = request.get_json()
        
        # Validation
        if not data.get('name') or not data.get('email') or not data.get('subject') or not data.get('message'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        if not validate_email(data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Create contact submission
        contact = Contact(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone'),
            subject=data['subject'],
            message=data['message'],
            ip_address=request.remote_addr
        )
        
        db.session.add(contact)
        db.session.commit()
        
        return jsonify({
            'message': 'Contact form submitted successfully',
            'contact': contact.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@contacts_bp.route('', methods=['GET'])
@jwt_required()
def get_contacts():
    """Get all contact submissions (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        query = Contact.query.order_by(Contact.created_at.desc())
        
        # Filter by status if provided
        status = request.args.get('status')
        if status:
            query = query.filter_by(status=status)
        
        paginated = query.paginate(page=page, per_page=per_page)
        
        return jsonify({
            'contacts': [c.to_dict() for c in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@contacts_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_contact(id):
    """Get a specific contact (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        contact = Contact.query.get(id)
        
        if not contact:
            return jsonify({'error': 'Contact not found'}), 404
        
        return jsonify(contact.to_dict()), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@contacts_bp.route('/<int:id>/status', methods=['PUT'])
@jwt_required()
def update_contact_status(id):
    """Update contact status (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        contact = Contact.query.get(id)
        
        if not contact:
            return jsonify({'error': 'Contact not found'}), 404
        
        data = request.get_json()
        
        valid_statuses = ['new', 'read', 'responded', 'closed']
        if data.get('status') not in valid_statuses:
            return jsonify({'error': 'Invalid status'}), 400
        
        contact.status = data['status']
        db.session.commit()
        
        return jsonify({
            'message': 'Contact status updated successfully',
            'contact': contact.to_dict()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@contacts_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_contact(id):
    """Delete a contact (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        contact = Contact.query.get(id)
        
        if not contact:
            return jsonify({'error': 'Contact not found'}), 404
        
        db.session.delete(contact)
        db.session.commit()
        
        return jsonify({'message': 'Contact deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
