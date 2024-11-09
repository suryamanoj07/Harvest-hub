/* eslint-disable no-unused-vars */
import  { useEffect, useState } from 'react'
import './Aorders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from './../../frontend_assets/assets';
import { Sidebar } from '../components/Sidebar';

const Aorder = () => {

  const [orders, setOrders] = useState([]);
  const [count,setCount] = useState(0)
  const [count2,setCount2] = useState(0)


  const fetchAllOrders = async () => {
    const url = "http://localhost:3000"
    const response = await axios.get(`${url}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.message.reverse());
      setCount(response.data.count)
      setCount2(response.data.count2)

      // console.log(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event,orderId) => {
    console.log(event,orderId);
    const response = await axios.post(`http://localhost:3000/api/order/status`,{
      orderId,
      status:event.target.value
    })
    if(response.data.success)
    {
      await fetchAllOrders();
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='flex gap-40'>
      <Sidebar/>
      <div className='ml-52 mr-12'>
      <div className='order add p-10'>
      <h3 className='text-center text-3xl'>Orders Information</h3>
      <div className='flex gap-12'>
      <h4>Total number of orders : {count}</h4>
      {/* <h4>total income : {count2}</h4> */}
      </div>
      <div className="order-list ">
        {orders.map((order, index) => (
          <div key={index} className='order-item  bg-orange-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-4 hover:border-blue-400 hover:bg-orange-300'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
                </p>
              <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p className='font-bold'>Rs {order.amount}/-</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} name="" id="">
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  )
}

export default Aorder