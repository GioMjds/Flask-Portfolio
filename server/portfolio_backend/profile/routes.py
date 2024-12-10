from flask import Blueprint, request, jsonify
from portfolio_backend.model import get_conn

profile_bp = Blueprint('profile_bp', __name__)

@profile_bp.route('/profile', methods=['GET'])
def profile():
    user_id = 2
    db = None
    cursor = None
    
    try:
        db = get_conn()
        cursor = db.cursor()
        cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        profile_data = {
            "first_name": user[1],
            "middle_name": user[2],
            "last_name": user[3],
            "birthday": user[4],
            "age": user[5],
            "contact_number": user[6],
            "email": user[7]            
        }
        
        return jsonify(profile_data), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': f'Error fetching profile: {str(e)}'}), 500
    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()

@profile_bp.route('/update', methods=['POST'])
def update():
    try:
        id = 2
        data = request.get_json()
        first_name = data.get('first_name')
        middle_name = data.get('middle_name')
        last_name = data.get('last_name')
        birthday = data.get('birthday')
        age = data.get('age')
        contact_number = data.get('contact_number')
        email = data.get('email')
        
        if not all([first_name, last_name, birthday, age, contact_number, email]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        db = get_conn()
        cursor = db.cursor()
        
        cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
        current_data = cursor.fetchone()
        
        if not current_data:
            return jsonify({'error': 'User not found'}), 404
        
        current_email = current_data[7]
        
        if email != current_email:
            cursor("SELECT * FROM users WHERE email = %s", (email,))
            user_email = cursor.fetchone()
            if user_email:
                return jsonify({'error': 'Email already exists'}), 400

        if current_data and (
            first_name == current_data[1] and
            middle_name == current_data[2] and
            last_name == current_data[3] and
            birthday == current_data[4] and
            age == current_data[5] and
            contact_number == current_data[6] and
            email == current_data[7]
        ):
            return jsonify({'error': 'No changes detected'}), 400
        
        cursor.execute("""
            UPDATE users
            SET firstName = %s, middleName = %s, lastName = %s, birthday = %s, age = %s, contactNumber = %s, email = %s
            WHERE id = %s
        """, (first_name, middle_name, last_name, birthday, age, contact_number, email, id))
        db.commit()
        
        print(f"Rows affected by update: {cursor.rowcount}")
        
        if cursor.rowcount > 0:
            return jsonify({'message': 'Profile updated successfully'}), 200
        else:
            return jsonify({'error': 'Failed to update profile'}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': f'Error updating profile: {str(e)}'}), 500
    finally:
        if cursor:
            cursor.close()
        if db:
            db.close()