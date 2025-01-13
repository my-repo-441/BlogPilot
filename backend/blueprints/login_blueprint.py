from flask import Blueprint, request, jsonify
import boto3
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
from werkzeug.security import check_password_hash
import os

# DynamoDB クライアントを設定
dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1')  # 適切なリージョンに変更
table_name = "Users"  # DynamoDB テーブル名
table = dynamodb.Table(table_name)

# .env ファイルを読み込む
load_dotenv()


login_bp = Blueprint('login', __name__)
protected_bp = Blueprint('protected', __name__)

# シークレットキー (適切に管理してください)
SECRET_KEY = os.getenv("SECRET_KEY")

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # DynamoDB からユーザー情報を取得
    try:
        response = table.get_item(Key={'email': email})
        user = response.get('Item')
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # パスワードのハッシュを比較
        if check_password_hash(user['password_hash'], password):
            # JWT を生成
            token = jwt.encode(
                {
                    'email': email,
                    'exp': datetime.utcnow() + timedelta(hours=2)  # トークンの有効期限を2時間に設定
                },
                SECRET_KEY,
                algorithm="HS256"
            )
            return jsonify({'message': 'Login successful', 'token': token}), 200
        else:
            return jsonify({'error': 'Invalid password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@login_bp.route('/protected', methods=['GET'])
def protected():
    auth_header = request.headers.get('Authorization', None)
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authorization token is required'}), 401

    # `Bearer ` を取り除いてトークンを抽出
    token = auth_header.split(" ")[1]

    try:
        # トークンをデコード
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({'message': 'Access granted', 'user': decoded['email']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
