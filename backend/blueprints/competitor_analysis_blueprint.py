from flask import Blueprint, request, jsonify
from services.competitor_analysis import get_competitor_keywords

competitor_analysis_bp = Blueprint('competitor_analysis', __name__)

@competitor_analysis_bp.route('/competitor_keywords', methods=['POST'])
def competitor_keywords():
    """
    Handles the /competitor_keywords endpoint for competitor analysis.
    """
    data = request.json
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL is required"}), 400

    response = get_competitor_keywords(url)
    return jsonify(response)
