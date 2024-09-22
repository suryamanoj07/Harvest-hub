/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "./../../../../frontend_assets/assets";

export const storeContext = createContext()

const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState({})
    const [token,setToken]=useState("")
    const [food_list,setFoodList]=useState([])

    const addtoCart=async(id)=>{
       if(!cartItems[id]){
        setCartItems(p=>({...p,[id]:1}))
       }
       else{
        setCartItems(p=>({...p,[id]:p[id]+1}))
       }
       if(token){
        await axios.post("http://localhost:3000/api/cart/add",{itemId:id},{headers:{token}})
       }
    }

    const removeCart=async(id)=>{
        setCartItems(p=>({...p,[id]:p[id]-1}))
        if(token){
            await axios.post("http://localhost:3000/api/cart/remove",{itemId:id},{headers:{token}})
           }
    }


    const getTotalAmount=()=>{
        let totalAmount=0
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id===item)
                totalAmount+= itemInfo.price*cartItems[item]
            }
        }return totalAmount;
    }

    const fetchFood=async()=>{
        const response = await axios.get("http://localhost:3000/api/product/list")
        setFoodList(response.data.message)
    }

    const loadCart = async(token)=>{
        const response = await axios.post("http://localhost:3000/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    useEffect(()=>{
        async function LoadData(){
            await fetchFood()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCart(localStorage.getItem("token"))
            }
        }
        LoadData();
    },[token])

    const contextValue={food_list,cartItems,setCartItems,addtoCart,removeCart,getTotalAmount,token,setToken}

return (
    <storeContext.Provider value={contextValue}>
        {props.children}
    </storeContext.Provider>
)}

export default StoreContextProvider;