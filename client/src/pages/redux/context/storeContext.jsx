/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const storeContext = createContext();

const StoreContextProvider = (props) => {
  const [role, setRole] = useState("Admin"); // Default role is "user"
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addtoCart = async (id) => {
    if (!cartItems[id]) {
      setCartItems((p) => ({ ...p, [id]: 1 }));
    } else {
      setCartItems((p) => ({ ...p, [id]: p[id] + 1 }));
    }
    if (token) {
      await axios.post("http://localhost:3000/api/cart/add", { itemId: id }, { headers: { token } });
    }
  };

  const removeCart = async (id) => {
    setCartItems((p) => ({ ...p, [id]: p[id] - 1 }));
    if (token) {
      await axios.post("http://localhost:3000/api/cart/remove", { itemId: id }, { headers: { token } });
    }
  };

  const cartQuantity = () => {
    let quantity = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        quantity += cartItems[item];
      }
    }
    return quantity;
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFood = async () => {
    const response = await axios.get("http://localhost:3000/api/product/list");
    setFoodList(response.data.message);
  };

  const loadCart = async (token) => {
    const response = await axios.post("http://localhost:3000/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  // Function to extract and set role from localStorage
  const loadRoleFromPersist = () => {
    const persistRoleData = localStorage.getItem("persist:role");
    if (persistRoleData) {
      try {
        const parsedData = JSON.parse(persistRoleData);
        const currentUserData = JSON.parse(parsedData.user); // Parse inner user JSON
        if (currentUserData.currentUser && currentUserData.currentUser.role) {
          console.log("Setting role to:", currentUserData.currentUser.role); // Log role
          setRole(currentUserData.currentUser.role); // Set the role based on stored data
        } else {
          console.warn("Role not found in currentUserData", currentUserData);
        }
      } catch (error) {
        console.error("Failed to parse role data from localStorage", error);
      }
    } else {
      console.warn("No persist:role data found in localStorage");
    }
  };

  useEffect(() => {
    const LoadData = async () => {
      await fetchFood();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCart(storedToken);
      }
      loadRoleFromPersist(); // Load role from persist
    };

    LoadData();
  }, []); // Empty dependency array to run only once on mount

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addtoCart,
    removeCart,
    getTotalAmount,
    token,
    setToken,
    cartQuantity,
    role,
    setRole,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
