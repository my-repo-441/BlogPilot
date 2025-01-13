from flask import jsonify
from pytrends.request import TrendReq

def get_trends_util(keywords, timeframe, geo):
    """
    Fetches trend data for given keywords using pytrends.
    """
    try:
        pytrends = TrendReq(hl='en-US', tz=360)
        pytrends.build_payload(keywords, cat=0, timeframe=timeframe, geo=geo, gprop='')
        trends_data = pytrends.interest_over_time()

        if trends_data.empty:
            return jsonify({"message": "No data available for the selected keywords."})

        response = trends_data.reset_index().to_dict(orient='records')
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
