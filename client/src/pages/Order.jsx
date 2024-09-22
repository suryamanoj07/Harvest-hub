/* eslint-disable no-unused-vars */
import { useContext, useState , useEffect} from 'react'
import './Order.css'
import { storeContext } from './../pages/redux/context/storeContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import { useSelector } from 'react-redux'

export const Order = () => {
  const {food_list,token,cartItems,tool_list} = useContext(storeContext)
  const { currentUser } = useSelector((state) => state.user);


  const navigate = useNavigate()
  const [data,setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const list = currentUser.role == "Customer" ? food_list : tool_list;

  const getTotalAmount=()=>{
    let totalAmount=0
    for(const item in cartItems){
        if(cartItems[item]>0){
            let itemInfo = list.find((product)=>product._id===item)
            totalAmount+= itemInfo.price*cartItems[item]
        }
    }return totalAmount;
  }

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async(event) =>{
    event.preventDefault()
    let orderItems=[]
    list.map(item=>{
      if(cartItems[item._id]){
        let itemInfo = item
        itemInfo["quantity"]=cartItems[item._id] 
        orderItems.push(itemInfo)
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalAmount()+50
    }
    let url = "http://localhost:3000"
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {success_url} = response.data
      window.location.replace(success_url)
    }
  }
//     useEffect(() => {
//       if (!token) {
//           toast.error("to place an order sign in first")
//           navigate('/cart')
//       }
//       else if (getTotalAmount() === 0) {
//         toast.error("cart cannot be empty!")
//         //   navigate('/cart')
//       }
//   }, [token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city}type="text" placeholder='City' />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalAmount()===0?0:50}</p>

            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount()===0?0:getTotalAmount() + 50}</b>

            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>


      </div>
      
    </form>
  )
}
