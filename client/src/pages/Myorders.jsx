/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import axios from 'axios'
import { storeContext } from './../pages/redux/context/storeContext';
import { assets } from './../../frontend_assets/assets';

const MyOrders = () => {
  
  const [data,setData] =  useState([]);
  const {token} = useContext(storeContext);
  const url = "http://localhost:3000"
<<<<<<< HEAD
  const [count,setCount] = useState(0)
  const [count2,setCount2] = useState(0)
=======
  // const [count,setCount] = useState(0)
  // const [count2,setCount2] = useState(0)
>>>>>>> c7c8b6c9619d9db1563655c8921139b64eb035b5

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setData(response.data.message)
<<<<<<< HEAD
    setCount(response.data.count)
    setCount2(response.data.count2)
=======
    // setCount(response.data.count)
    // setCount2(response.data.count2)
>>>>>>> c7c8b6c9619d9db1563655c8921139b64eb035b5
  }

  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
<<<<<<< HEAD
      <h2 className='text-3xl'>My Orders</h2>
      <div className='flex gap-12'>
      <h4>Total number of orders : {count}</h4>
      {/* <h4>total income : {count2}</h4> */}
      </div>
=======
      <h2>My Orders</h2>
      {/* <div className='flex gap-12'>
      <h4>Total number of orders : {count}</h4>
      <h4>total income : {count2}</h4>
      </div> */}
>>>>>>> c7c8b6c9619d9db1563655c8921139b64eb035b5
      <div className="container ">
        {data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order  bg-orange-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-4 hover:border-blue-400 hover:bg-orange-300'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                  
                })}</p>
                <p>Rs {order.amount}.00/-</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders