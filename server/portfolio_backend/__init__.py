from flask import Flask
from flask_cors import CORS # type: ignore

def create_app():
    app = Flask(__name__)
    app.secret_key = 'mimicplays'
    CORS(app=app, supports_credentials=True, origins=['http://localhost:5173'])
    
    from .auth.routes import auth_bp
    from .profile.routes import profile_bp
    from .users.routes import users_bp
    
    app.register_blueprint(auth_bp, url_prefix="/user-login")
    app.register_blueprint(profile_bp, url_prefix='/user-profile')
    app.register_blueprint(users_bp, url_prefix='/users')

    return app