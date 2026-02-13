import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { amplificationData, platformCoverage } from '../data/chartsData';
import './Analytics.css';

const Analytics = () => {
  const COLORS = ['#ff4444', '#00ff00', '#ffc107'];

  return (
    <div className="analytics-page">
      <h1 className="page-title">Amplification Analytics Dashboard</h1>
      
      <div className="analytics-grid">
        {/* Engagement Spike Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Engagement Spike Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={amplificationData.spikes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="date" stroke="#8e8e8e" />
              <YAxis stroke="#8e8e8e" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #262626' }}
                labelStyle={{ color: '#f0f0f0' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f5576c" 
                strokeWidth={2}
                dot={{ fill: '#f5576c' }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bot Cluster Pie Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Bot Clusters Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={amplificationData.botClusters}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {amplificationData.botClusters.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #262626' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Coordination Heatmap */}
        <div className="chart-card">
          <h3 className="chart-title">Coordination Heatmap</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={amplificationData.coordinationHeatmap}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="hour" stroke="#8e8e8e" />
              <YAxis stroke="#8e8e8e" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #262626' }}
              />
              <Bar dataKey="activity" fill="#f5576c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hashtag Spam Tracker */}
        <div className="chart-card">
          <h3 className="chart-title">Hashtag Spam Tracker</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={amplificationData.hashtagSpam}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="tag" stroke="#8e8e8e" />
              <YAxis stroke="#8e8e8e" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #262626' }}
              />
              <Legend />
              <Bar dataKey="count" fill="#f093fb" name="Total Posts" />
              <Bar dataKey="fake" fill="#f5576c" name="Fake Posts" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Coverage */}
        <div className="chart-card full-width">
          <h3 className="chart-title">Social Media Coverage</h3>
          <div className="platform-grid">
            {Object.entries(platformCoverage).map(([platform, data]) => (
              <div key={platform} className="platform-card">
                <h4 className="platform-name">{platform.charAt(0).toUpperCase() + platform.slice(1)}</h4>
                <div className="platform-stats">
                  <div className="stat-item">
                    <span className="stat-label">AI Media</span>
                    <span className="stat-value risk-high">{data.aiMedia}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Fake Ads</span>
                    <span className="stat-value risk-medium">{data.fakeAds}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Bot Campaigns</span>
                    <span className="stat-value risk-low">{data.botCampaigns}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;