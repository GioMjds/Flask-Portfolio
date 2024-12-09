from flask import Blueprint, request, jsonify
from portfolio_backend.model import get_conn

users_bp = Blueprint('users_bp', __name__)

@users_bp.route('/add_user', methods=['GET'])
def create():
    data = request.get_json()
    id = data.get('id')
    firstname = data.get('firstName')
    middlename = data.get('middleName')
    lastname = data.get('lastName')
    age = data.get('age')
    birthday = data.get('birthday')
    email = data.get('email')
    contactNumber = data.get('contactNumber')
    
    try:
        conn = get_conn()
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users WHERE id = %s', (id,))
        user = cursor.fetchone()
        
        if user:
            return jsonify({'message': 'User already exists'}), 400
        cursor.execute('INSERT INTO users (firstName, middleName, lastName, age, birthday, email, contactNumber) VALUES (%s, %s, %s, %s, %s, %s, %s)', (firstname, middlename, lastname, age, birthday, email, contactNumber,))
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
                "firstName": row['firstName'],
                "middleName": row['middleName'],
                "lastName": row['lastName'],
                "birthday": row['birthday'].isoformat() if row['birthday'] else None,
                "age": row['age'],
                "contactNumber": row['contactNumber'],
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
            
@users_bp.route('/update_user/<int:id>', methods=['PUT'])
def update(id):
    try:
        data = request.get_json()
        firstName = data.get('firstName')
        middleName = data.get('middleName')
        lastName = data.get('lastName')
        age = data.get('age')
        birthday = data.get('birthday')
        email = data.get('email')
        contactNumber = data.get('contactNumber')
        
        if not all([firstName, middleName, lastName, age, birthday, email, contactNumber]):
            return jsonify({'message': 'Missing required fields'}), 400
        conn = get_conn()
        cursor = conn.cursor(dictionary=True)
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
            firstName == current_data['firstName'] and
            middleName == current_data['middleName'] and
            lastName == current_data['lastName'] and
            birthday == current_data['birthday'] and
            age == current_data['age'] and
            contactNumber == current_data['contactNumber'] and
            email == current_data['email']
        ):
            return jsonify({'message': 'No changes detected'}), 200
        
        cursor.execute("""
            UPDATE users SET firstName = %s, middleName = %s,lastName = %s, age = %s, birthday = %s, email = %s, contactNumber = %s WHERE id = %s
        """, (firstName, middleName, lastName, age, birthday, email, contactNumber, id))
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