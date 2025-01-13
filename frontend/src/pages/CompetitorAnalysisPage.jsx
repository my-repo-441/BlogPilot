import React, { useState } from 'react';

const CompetitorAnalysisPage = () => {
  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState([]);

  const fetchCompetitorKeywords = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/competitor_keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setKeywords(data.keywords || []);
      console.log(data.keywords);
    } catch (error) {
      console.error('Error fetching competitor keywords:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Competitor Analysis</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter competitor URL"
        style={{ width: '400px', marginRight: '10px' }}
      />
      <button onClick={fetchCompetitorKeywords}>Fetch Keywords</button>
      {keywords.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Keywords Found</h2>
          <ul>
            {keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompetitorAnalysisPage;
