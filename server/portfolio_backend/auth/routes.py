from flask import Blueprint, request, jsonify, session, make_response
import bcrypt
from portfolio_backend.model import get_conn

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'message': 'Invalid Credentials'}), 400
    
    conn = get_conn()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password,))
    user = cursor.fetchone()
    
    if not user:
        return jsonify({'user': 'User not found'}), 404

    if user:
        session['session_id'] = user['id']
        response = make_response(jsonify({'message': 'Login Successful'}), 200)
        response.set_cookie('session_id', str(user['id']), httponly=True)
        return jsonify({'message': 'Login Successful', 'session_id': user['id']}), 200
    else:
        return jsonify({'message': 'Invalid Credentials'}), 401
    
@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('session_id', None)
    response = make_response(jsonify({'message': 'Logged out'}), 200)
    response.delete_cookie('session_id')
    return response