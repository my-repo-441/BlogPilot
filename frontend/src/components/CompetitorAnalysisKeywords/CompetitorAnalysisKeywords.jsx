import React, { useState } from 'react';

function CompetitorAnalysisKeywords() {
    const [url, setUrl] = useState('');
    const [keywords, setKeywords] = useState([]);

    const fetchKeywords = async () => {
        try {
            const response = await fetch('/competitor_keywords', {
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
        <div>
            <h2>Competitor Keywords</h2>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter competitor URL"
            />
            <button onClick={fetchKeywords}>Fetch Keywords</button>
            {keywords.length > 0 && (
                <ul>
                    {keywords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CompetitorAnalysisKeywords;
