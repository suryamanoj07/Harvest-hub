/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import './Myorders.css';
import axios from 'axios';
import { storeContext } from './../pages/redux/context/storeContext';
import { assets } from './../../frontend_assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState({
    totalOrders: 0,
    countLast60Min: 0,
    countLast2Days: 0,
    countLast1Week: 0,
  });
  const [selectedFilter, setSelectedFilter] = useState('totalOrders');
  const { token } = useContext(storeContext);
  const url = 'http://localhost:3000';

  // Fetch Orders Function
  const fetchOrders = async (filter) => {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      { headers: { token } }
    );
    
    // Set counts and filter data based on selected filter
    const { totalOrders, countLast60Min, countLast2Days, countLast1Week, orders } = response.data.message;
    setCounts({ totalOrders, countLast60Min, countLast2Days, countLast1Week });

    let filteredData = orders;
    if (filter === 'countLast60Min') {
      filteredData = orders.filter(order => new Date(order.createdAt) >= new Date(Date.now() - 60 * 60 * 1000));
    } else if (filter === 'countLast2Days') {
      filteredData = orders.filter(order => new Date(order.createdAt) >= new Date(Date.now() - 2 * 24 * 60 * 60 * 1000));
    } else if (filter === 'countLast1Week') {
      filteredData = orders.filter(order => new Date(order.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    }
    setData(filteredData.reverse());
  };

  useEffect(() => {
    if (token) {
      fetchOrders(selectedFilter);
    }
  }, [token, selectedFilter]);

  return (
    <div className='my-orders'>
      <h2 className='text-blue-500 text-center mb-2 text-3xl'>My Orders</h2>
      <div className="filter-options">
        <label>Filter by: </label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="totalOrders">Total Orders ({counts.totalOrders})</option>
          <option value="countLast10Min">Last 60 Minutes ({counts.countLast60Min})</option>
          <option value="countLast2Days">Last 2 Days ({counts.countLast2Days})</option>
          <option value="countLast1Week">Last 1 Week ({counts.countLast1Week})</option>
        </select>
      </div>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className='my-orders-order bg-orange-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-4 hover:border-blue-400 hover:bg-orange-300'>
            <img src={assets.parcel_icon} alt="" />
            <p>{order.items.map((item, idx) => `${item.name} x ${item.quantity}${idx < order.items.length - 1 ? ', ' : ''}`)}</p>
            <p>Rs {order.amount}.00/-</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
