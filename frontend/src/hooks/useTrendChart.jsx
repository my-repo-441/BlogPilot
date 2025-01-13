import { useState } from 'react';
import axios from 'axios';

export const useTrendChart = () => {
  const [chartData, setChartData] = useState(null);

  const fetchTrends = async (keywords) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/get_trends', {
        keywords: keywords.split(','),
      });
      const data = response.data;

      const labels = data.map((item) => new Date(item.date).toLocaleString());
      const datasets = Object.keys(data[0])
        .filter((key) => key !== 'date' && key !== 'isPartial')
        .map((key) => ({
          label: key,
          data: data.map((item) => item[key]),
          fill: false,
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.7)`,
        }));

      setChartData({ labels, datasets });
    } catch (error) {
      console.error('Error fetching trends:', error);
      setChartData(null);
    }
  };

  return { chartData, fetchTrends };
};

export default useTrendChart;