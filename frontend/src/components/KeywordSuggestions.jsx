import React, { useState } from 'react';

function KeywordSuggestions() {
  const [keywords, setKeywords] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/keywords-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords: keywords.split(',') }),
      });
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error fetching keyword suggestions:', error);
    }
  };

  return (
    <div>
      <h2>SEO Keyword Suggestions</h2>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Enter seed keywords"
      />
      <button onClick={fetchSuggestions}>Get Suggestions</button>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            {suggestion.text} - {suggestion.avg_monthly_searches} searches/month
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordSuggestions;
