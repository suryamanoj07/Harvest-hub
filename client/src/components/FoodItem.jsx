// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from './../../frontend_assets/assets'
import { storeContext } from './../pages/redux/context/storeContext'
import { useContext } from 'react'

const FoodItem = ({id,name,price,description,image}) => {
    const{cartItems,addtoCart,removeCart} = useContext(storeContext)

  return (
    <div className='food-item transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'>
        <div className="food-item-img-container">
            <img src={"http://localhost:3000/images/"+image} alt="food" className="food-item-image bg-slate-100" />
                {!cartItems[id]
                    ?<img className='add' onClick={()=>addtoCart(id)} src={assets.add_icon_white} alt="" />
                    :<div className='food-item-counter'>
                        <img onClick={()=>removeCart(id)}  src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p> 
                        <img onClick={()=>addtoCart(id)} src={assets.add_icon_green} alt="" />    
                    </div> 
                    
                }
        </div>    
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p className='h-8 m-2'>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc h-16">{description}</p>
            <p className="food-item-price">Rs. {price}/-</p>
        </div>
    </div>
  )
}
export default FoodItem