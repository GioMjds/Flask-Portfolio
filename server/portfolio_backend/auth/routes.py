from flask import Blueprint, request, jsonify, session, make_response
from portfolio_backend.model import get_conn
import bcrypt

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
    
    cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
    user = cursor.fetchone()
    
    if not user:
        return jsonify({'user': 'User not found'}), 404

    stored_hashed_password = user['password']
    
    if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
        session['session_id'] = user['id']
        return jsonify({'success': 'Login Successful', 'session': session['session_id']}), 200
    else:
        return jsonify({'success': 'User has logout'}), 200
    
@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('session_id', None)
    response = make_response(jsonify({'message': 'Logged out'}), 200)
    response.delete_cookie('session_id')
    return response