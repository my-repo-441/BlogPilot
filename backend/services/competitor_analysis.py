import requests
from bs4 import BeautifulSoup

def get_competitor_keywords(url):
    """
    Extract keywords from a competitor's website meta tags.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        meta_keywords = soup.find("meta", attrs={"name": "keywords"})
        if meta_keywords:
            keywords = meta_keywords["content"].split(',')
            return {"url": url, "keywords": [keyword.strip() for keyword in keywords]}
    except Exception as e:
        return {"url": url, "keywords": [], "error": str(e)}

    return {"url": url, "keywords": []}
