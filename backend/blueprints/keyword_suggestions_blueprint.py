from flask import Blueprint, request, jsonify
from services.keyword_suggest import get_keyword_suggestions

keyword_bp = Blueprint('keywords', __name__)

@keyword_bp.route('/keywords-suggestions', methods=['POST'])
def suggestions():
    data = request.json
    location_ids = data.get("location_ids", [])
    language_id = data.get("language_id", "1000")  # Default to English
    keyword_texts = data.get("keywords", [])

    if not keyword_texts:
        return jsonify({"error": "Keywords are required"}), 400

    try:
        suggestions = get_keyword_suggestions(location_ids, language_id, keyword_texts)
        return jsonify({"suggestions": suggestions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
