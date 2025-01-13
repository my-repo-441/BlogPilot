# from google.ads.google_ads.client import GoogleAdsClient

def get_keyword_suggestions(location_ids, language_id, keyword_texts):
    # client = GoogleAdsClient.load_from_storage("google_ads.yaml")
    # service = client.get_service("KeywordPlanIdeaService")
    # request = client.get_type("GenerateKeywordIdeasRequest")

    # request.customer_id = "YOUR_CUSTOMER_ID"
    # request.keyword_and_url_seed.keywords.extend(keyword_texts)
    # request.language = language_id
    # request.geo_target_constants.extend(location_ids)

    # response = service.generate_keyword_ideas(request=request)
    # suggestions = [
    #     {"text": idea.text, "avg_monthly_searches": idea.keyword_idea_metrics.avg_monthly_searches}
    #     for idea in response.results
    # ]
    # return suggestions
    return "test"
