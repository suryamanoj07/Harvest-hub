import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
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
    totalTools: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });
  const [topSellers, setTopSellers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [timePeriod, setTimePeriod] = useState('1month');

  useEffect(() => {
    fetchDashboardData();
    fetchRevenueData(timePeriod);
    fetchTopSellers();
    fetchTopSellingProducts();
  }, [timePeriod]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/dashboard-stats');
      if (response.data.success) {
        setDashboardData(response.data.data);
        setChartData({
          labels: ['Users', 'Products', 'Tools'],
          datasets: [
            {
              label: 'Website Stats',
              data: [response.data.data.totalUsers, response.data.data.totalProducts, response.data.data.totalTools],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(153, 102, 255, 0.6)'],
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

  const fetchTopSellingProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/product/top-selling-products');
      if (response.data.success) {
        setTopProducts(response.data.data);
      } else {
        toast.error('Error fetching top selling products data');
      }
    } catch (error) {
      toast.error('Error fetching top selling products data');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
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
            <h3>Total Tools</h3>
            <p>{dashboardData.totalTools}</p>
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
        </div>
        <div className="chart">
          <h3>Revenue Generated</h3>
          <select onChange={(e) => setTimePeriod(e.target.value)} value={timePeriod}>
            <option value="1day">1 Day</option>
            <option value="1week">1 Week</option>
            <option value="1month">1 Month</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
            <option value="all">All</option>
          </select>
          <Bar data={revenueData} />
        </div>
        <div className="top-sellers-card">
          <h3>Top Sellers</h3>
          <div className="top-sellers-list">
            {topSellers.map((seller, index) => (
              <div key={index} className="top-seller">
                <p><strong>Email:</strong> {seller._id}</p>
                <p><strong>Name:</strong> {seller.name}</p>
                <p><strong>Stock:</strong> {seller.stock}</p>
                <p><strong>Revenue:</strong> Rs {seller.revenue}/-</p>
              </div>
            ))}
          </div>
        </div>
        <div className="top-products-card">
          <h3>Top Selling Products</h3>
          <div className="top-products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="top-product">
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Price:</strong> Rs {product.price}/-</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Total Orders:</strong> {product.totalOrders}</p>
                <p><strong>Total Amount:</strong> Rs {product.totalAmount}/-</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;