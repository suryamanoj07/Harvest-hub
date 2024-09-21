/* eslint-disable react/jsx-key */
// eslint-disable-next-line no-unused-vars
import  { useContext,useEffect } from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom';
import { storeContext } from './../pages/redux/context/storeContext';
// import { toast } from 'react-toastify';

const Cart = () => {

  // eslint-disable-next-line no-unused-vars
  const { cartItems, food_list, removeCart,getTotalAmount,token } = useContext(storeContext);
  const navigate = useNavigate();
   
//   useEffect(() => {
//     if (!token) {
//         toast.error("to place an order sign in first")
//         navigate('/cart')
//     }
//     else if (getTotalAmount() === 0) {
//       toast.error("cart cannot be empty!")
//         navigate('/cart')
//     }
// }, [])


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={"http://localhost:3000/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}

      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p style={{marginLeft:"50px"}}>{getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p style={{marginLeft:"50px"}}>{getTotalAmount()===0?0:50}</p>

            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b style={{marginLeft:"50px"}}>{getTotalAmount()===0?0:getTotalAmount() + 50}</b>

            </div>
          </div>
          <button onClick={()=>navigate('/order')}>ORDER NOW</button>
        </div>
      </div>

    </div>
  )
}

export default Cart