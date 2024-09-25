/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */

import { useContext, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { storeContext } from "./../pages/redux/context/storeContext";
// import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems, food_list, removeCart, token, tool_list } = useContext(storeContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!token) {
      // toast.error("to place an order sign in first");
      navigate("/cart");
    } else if (getTotalAmount() === 0) {
      // toast.error("cart cannot be empty!");
      navigate("/empty");
    }
  }, [token]);

  return (
    <div className="cart">
      <div className="cart-items mx-20">
        <div className="cart-items-title ml-4 font-bold text-black">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p className="-ml-8">Quantity</p>
          <p>Total</p>
          <p className="-ml-8">Remove</p>
        </div>
        <br />
        <hr />

        {list.map((item,idx) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="">
                <div className="cart-items-title cart-items-item transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-4 hover:border-blue-400 hover:bg-blue-200 bg-blue-300 p-3" key={idx} >
                  <img
                    src={"http://localhost:3000/images/" + item.image}
                    alt=""
                    className="bg-slate-100 h-24"
                  />
                  <p>{item.name}</p>
                  <p>Rs {item.price}/-</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rs {item.price * cartItems[item._id]}/-</p>
                  <p onClick={() => removeCart(item._id)} className="cross bg-red-500 max-w-6 pl-2 rounded-full font-bold">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2 className="font-bold">Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p style={{ marginLeft: "50px" }}>Rs {getTotalAmount()}/-</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p style={{ marginLeft: "50px" }}>
                Rs {getTotalAmount() === 0 ? 0 : 50}/-
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b style={{ marginLeft: "50px" }}>
                Rs {getTotalAmount() === 0 ? 0 : getTotalAmount() + 50}/-
              </b>
            </div>
          </div>
          <button className="hover:opacity-85" onClick={() => navigate("/order")}>ORDER NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
