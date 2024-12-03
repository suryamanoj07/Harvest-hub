import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import axios from 'axios';
import './AdminDashboard.css';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalSales: 0,
    totalProducts: 0,
    totalRevenue: 0, // Add totalRevenue to the state
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [userGrowthData, setUserGrowthData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchDashboardData();
    fetchUserGrowthData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/dashboard-stats');
      if (response.data.success) {
        setDashboardData(response.data.data);
        setChartData({
          labels: ['Users', 'Products'],
          datasets: [
            {
              label: 'Website Stats',
              data: [response.data.data.totalUsers, response.data.data.totalProducts],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
          ],
        });
      } else {
        toast.error('Error fetching dashboard data');
      }
    } catch (error) {
      toast.error('Error fetching dashboard data');
    }
  };

  const fetchUserGrowthData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/user-growth-data');
      if (response.data.success) {
        setUserGrowthData({
          labels: response.data.data.labels,
          datasets: [
            {
              label: 'User Growth Over Time',
              data: response.data.data.users,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
          ],
        });
      } else {
        toast.error('Error fetching user growth data');
      }
    } catch (error) {
      toast.error('Error fetching user growth data');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>{dashboardData.totalUsers}</p>
          </div>
          <div className="card">
            <h3>Total Products</h3>
            <p>{dashboardData.totalProducts}</p>
          </div>
          <div className="card">
            <h3>Total Revenue</h3>
            <p>Rs {dashboardData.totalRevenue}/-</p>
          </div>
        </div>
        <div className="charts-section">
          <div className="chart">
            <Bar data={chartData} />
          </div>
          <div className="chart">
            <Pie data={chartData} />
          </div>
          <div className="chart">
            <Line data={userGrowthData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;