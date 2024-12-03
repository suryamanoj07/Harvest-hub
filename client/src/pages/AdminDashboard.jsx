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
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });
  const [topSellers, setTopSellers] = useState([]); // State for top sellers
  const [timePeriod, setTimePeriod] = useState('1month'); // Default time period

  useEffect(() => {
    fetchDashboardData();
    fetchUserGrowthData();
    fetchRevenueData(timePeriod); // Fetch revenue data based on the default time period
    fetchTopSellers(); // Fetch top sellers data
  }, [timePeriod]);

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

  const fetchRevenueData = async (period) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/revenue-data?period=${period}`);
      if (response.data.success) {
        setRevenueData({
          labels: response.data.data.labels,
          datasets: [
            {
              label: 'Revenue Generated',
              data: response.data.data.revenue,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } else {
        toast.error('Error fetching revenue data');
      }
    } catch (error) {
      toast.error('Error fetching revenue data');
    }
  };

  const fetchTopSellers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/top-sellers');
      if (response.data.success) {
        setTopSellers(response.data.data);
      } else {
        toast.error('Error fetching top sellers data');
      }
    } catch (error) {
      toast.error('Error fetching top sellers data');
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
          <div className="chart">
            <h3>Revenue Generated</h3>
            <select onChange={(e) => setTimePeriod(e.target.value)} value={timePeriod}>
              <option value="1month">1 Month</option>
              <option value="6months">6 Months</option>
              <option value="1year">1 Year</option>
              <option value="all">All</option>
            </select>
            <Bar data={revenueData} />
          </div>
        </div>
        <div className="top-sellers-card">
          <h3>Top Sellers</h3>
          <div className="top-sellers-list">
            {topSellers.map((seller, index) => (
              <div key={index} className="top-seller">
                <p><strong>Name:</strong> {seller.name}</p>
                <p><strong>Stock:</strong> {seller.stock}</p>
                <p><strong>Revenue:</strong> Rs {seller.revenue}/-</p>
                <p><strong>Percentage Increase:</strong> {seller.percentageIncrease}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;