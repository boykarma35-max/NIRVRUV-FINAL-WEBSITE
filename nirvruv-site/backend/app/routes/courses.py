from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, Course
from . import courses_bp

@courses_bp.route('', methods=['GET'])
def get_courses():
    """Get all active courses"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        query = Course.query.filter_by(is_active=True)
        
        # Filter by category if provided
        category = request.args.get('category')
        if category:
            query = query.filter_by(category=category)
        
        # Filter by level if provided
        level = request.args.get('level')
        if level:
            query = query.filter_by(level=level)
        
        paginated = query.paginate(page=page, per_page=per_page)
        
        return jsonify({
            'courses': [c.to_dict() for c in paginated.items],
            'total': paginated.total,
            'pages': paginated.pages,
            'current_page': page
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@courses_bp.route('/<int:id>', methods=['GET'])
def get_course(id):
    """Get a specific course"""
    try:
        course = Course.query.get(id)
        
        if not course or not course.is_active:
            return jsonify({'error': 'Course not found'}), 404
        
        return jsonify(course.to_dict()), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@courses_bp.route('', methods=['POST'])
@jwt_required()
def create_course():
    """Create a new course (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        if not data.get('title') or not data.get('description'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        course = Course(
            title=data['title'],
            description=data['description'],
            instructor=data.get('instructor'),
            duration=data.get('duration'),
            level=data.get('level'),
            price=data.get('price'),
            image_url=data.get('image_url'),
            category=data.get('category'),
            modules=data.get('modules'),
            rating=data.get('rating'),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(course)
        db.session.commit()
        
        return jsonify({
            'message': 'Course created successfully',
            'course': course.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@courses_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_course(id):
    """Update a course (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        course = Course.query.get(id)
        
        if not course:
            return jsonify({'error': 'Course not found'}), 404
        
        data = request.get_json()
        
        course.title = data.get('title', course.title)
        course.description = data.get('description', course.description)
        course.instructor = data.get('instructor', course.instructor)
        course.duration = data.get('duration', course.duration)
        course.level = data.get('level', course.level)
        course.price = data.get('price', course.price)
        course.image_url = data.get('image_url', course.image_url)
        course.category = data.get('category', course.category)
        course.modules = data.get('modules', course.modules)
        course.students_enrolled = data.get('students_enrolled', course.students_enrolled)
        course.rating = data.get('rating', course.rating)
        course.is_active = data.get('is_active', course.is_active)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Course updated successfully',
            'course': course.to_dict()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@courses_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_course(id):
    """Delete a course (admin only)"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Unauthorized'}), 403
        
        course = Course.query.get(id)
        
        if not course:
            return jsonify({'error': 'Course not found'}), 404
        
        db.session.delete(course)
        db.session.commit()
        
        return jsonify({'message': 'Course deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
