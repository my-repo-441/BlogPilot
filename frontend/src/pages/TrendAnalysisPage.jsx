import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTrendChart } from '../hooks/useTrendChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendAnalysisPage = () => {
  const [keywords, setKeywords] = useState('');
  const { chartData, fetchTrends } = useTrendChart();

  const handleFetchTrends = () => {
    if (!keywords.trim()) {
      alert('Please enter at least one keyword.');
      return;
    }
    fetchTrends(keywords);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trend Analysis</h1>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Enter keywords, separated by commas"
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleFetchTrends}>Fetch Trends</button>
      {chartData && (
        <div style={{ marginTop: '20px' }}>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default TrendAnalysisPage;
