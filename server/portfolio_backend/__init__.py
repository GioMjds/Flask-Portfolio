from flask import Flask
from flask_cors import CORS # type: ignore

def create_app():
    app = Flask(__name__)
    app.secret_key = 'mimicplays'
    CORS(app, supports_credentials=True, origins=['http://localhost:5173'])
    
    from .auth.routes import auth_bp
    app.register_blueprint(auth_bp)
    
    return app