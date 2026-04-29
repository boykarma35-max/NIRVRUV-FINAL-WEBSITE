from app import db
from datetime import datetime

class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    instructor = db.Column(db.String(120))
    duration = db.Column(db.String(50))  # e.g., "8 weeks"
    level = db.Column(db.String(20))  # Beginner, Intermediate, Advanced
    price = db.Column(db.Float)
    image_url = db.Column(db.String(255))
    category = db.Column(db.String(50))
    modules = db.Column(db.Integer)  # Number of modules
    students_enrolled = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float)  # Average rating
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'instructor': self.instructor,
            'duration': self.duration,
            'level': self.level,
            'price': self.price,
            'image_url': self.image_url,
            'category': self.category,
            'modules': self.modules,
            'students_enrolled': self.students_enrolled,
            'rating': self.rating,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
