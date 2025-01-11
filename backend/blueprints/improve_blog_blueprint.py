from flask import Blueprint, request, jsonify
from services.utils import scrape_article_content, save_to_file
from services.openai_api import improve_blog_content
import logging
import traceback
from datetime import datetime
import hashlib

improve_blog_bp = Blueprint('improve_blog', __name__)

def generate_folder_name(url):
    """
    Generate a unique folder name based on the URL and timestamp.
    """
    domain = url.split("//")[-1].split("/")[0].replace(".", "_")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{domain}_{timestamp}"

@improve_blog_bp.route('/improve_blog_content', methods=['POST'])
def improve_blog_content_endpoint():
    """
    Improve the content of a blog article based on its URL.
    """
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        # Scrape the content from the provided URL
        content = scrape_article_content(url)
        if not content:
            return jsonify({"error": "Failed to scrape content from the provided URL"}), 400

        # Generate a folder name and save the content
        folder_name = generate_folder_name(url)
        file_name = "content.txt"
        save_to_file(content, file_name, folder=f"./data/{folder_name}")

        # Improve the content using OpenAI API
        improved_content = improve_blog_content(content)

        return jsonify({
            "message": "Content improved successfully",
            "saved_folder": f"./data/{folder_name}",
            "improved_content": improved_content
        }), 200

    except Exception as e:
        logging.error(f"An error occurred while improving blog content: {traceback.format_exc()}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
