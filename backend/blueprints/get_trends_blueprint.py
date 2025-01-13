from flask import Blueprint, request, jsonify
from services.get_trends import get_trends_util

get_trends_bp = Blueprint('get_trends', __name__)

@get_trends_bp.route('/get_trends', methods=['POST'])
def get_trends():
    """
    Handles the /get_trends endpoint for fetching trend data.
    """
    data = request.json
    keywords = data.get('keywords', [])
    timeframe = data.get('timeframe', 'now 7-d')
    geo = data.get('geo', '')

    if not keywords:
        return jsonify({"error": "No keywords provided"}), 400

    response = get_trends_util(keywords, timeframe, geo)
    return response
