import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const DashboardChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donorsResponse, recipientsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/countDonors'),
          axios.get('http://localhost:5000/api/countRecipients'),
        ]);

        const donorCount = donorsResponse.data.count;
        const recipientCount = recipientsResponse.data.count;

        setData([
          { name: 'Donors', value: donorCount },
          { name: 'Recipients', value: recipientCount },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Donor and Recipient Ratio</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            color="#000000"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
            }}
            cursor={{ fill: 'transparent' }}
          />
          <Legend
            iconType="circle"
            iconSize={12}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;