from flask import Blueprint, request, jsonify
from portfolio_backend.model import get_conn

users_bp = Blueprint('users_bp', __name__)

@users_bp.route('/add_user', methods=['POST'])
def create():
    data = request.get_json()
    id = data.get('id')
    first_name = data.get('first_name')
    middle_name = data.get('middle_name')
    last_name = data.get('last_name')
    age = data.get('age')
    birthday = data.get('birthday')
    email = data.get('email')
    contact_number = data.get('contact_number')

    try:
        conn = get_conn()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users WHERE id = %s', (id,))
        user = cursor.fetchone()

        if user:
            return jsonify({'message': 'User already exists'}), 400
        cursor.execute('INSERT INTO users (firstName, middleName, lastName, age, birthday, email, contactNumber) VALUES (%s, %s, %s, %s, %s, %s, %s)', (first_name, middle_name, last_name, age, birthday, email, contact_number,))
        conn.commit()
        return jsonify({'success': 'User added'}), 200
    except Exception as e:
        print(f"Error adding user: {str(e)}")
        return jsonify({'message': f'Error adding user: {str(e)}'}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@users_bp.route('/show_users', methods=['GET'])
def read():
    try:
        conn = get_conn()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall()

        users = [
            {
                "id": row['id'],
                "first_name": row['firstName'],
                "middle_name": row['middleName'],
                "last_name": row['lastName'],
                "birthday": row['birthday'].isoformat() if row['birthday'] else None,
                "age": row['age'],
                "contact_number": row['contactNumber'],
                "email": row['email'],
                "username": row['username'],
                "password": row['password'],
            }
            for row in rows
        ]
        return jsonify({"data": users}), 200
    except Exception as e:
        return jsonify({'message': f'Error reading users: {str(e)}'}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            
@users_bp.route('/update_user/<int:id>', methods=['POST]'])
def update(id):
    try:
        data = request.get_json()
        first_name = data.get('first_name')
        middle_name = data.get('middle_name')
        last_name = data.get('last_name')
        birthday = data.get('birthday')
        age = data.get('age')
        contact_number = data.get('contact_number')
        email = data.get('email')
        
        if not all([first_name, middle_name, last_name, age, birthday, email, contact_number]):
            return jsonify({'message': 'Missing required fields'}), 400
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
        current_data = cursor.fetchone()
        
        if not current_data:
            return jsonify({'message': 'User not found'}), 404
        
        current_id = current_data[0]
        
        if id != current_id:
            cursor.execute("SELECT firstName, middleName, lastName, age, birthday, email, contactNumber FROM users WHERE id = %s", (id,))
            user = cursor.fetchone()
            if user:
                return jsonify({'message': 'User already exists'}), 400

        if current_data and (
            first_name == current_data[1] and
            middle_name == current_data[2] and
            last_name == current_data[3] and
            birthday == current_data[4] and
            age == current_data[5] and
            contact_number == current_data[6] and
            email == current_data[7]
        ):
            return jsonify({'message': 'No changes detected'}), 400
        
        cursor.execute("""
            UPDATE users 
            SET firstName = %s, middleName = %s,lastName = %s, birthday = %s, age = %s, email = %s, contactNumber = %s 
            WHERE id = %s
        """, (first_name, middle_name, last_name, age, birthday, email, contact_number, id))
        conn.commit()
        
        print(f"Rows updated: {cursor.rowcount}")
        
        if cursor.rowcount > 0:
            return jsonify({'message': 'Profile updated'}), 200
        else:
            return jsonify({'message': 'No changes detected'}), 200
    except Exception as e:
        print(f"Error updating user: {str(e)}")
        return jsonify({'message': f'Error updating user: {str(e)}'}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@users_bp.route('/delete_user/<int:id>', methods=['DELETE'])
def delete(id):
    try:
        conn = get_conn()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id FROM users WHERE id = %s", (id,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        cursor.execute("DELETE FROM users WHERE id = %s", (id,))
        conn.commit()
        
        return jsonify({'message': 'User deleted'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting user: {str(e)}'}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()