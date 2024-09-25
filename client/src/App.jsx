import { Header } from "./components/Header";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Products } from "./pages/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Schemes } from "./pages/Schemes";
import { Signup } from "./pages/Signup";
import React, { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import { Add } from "./components/Add";
import List from "./components/List";
import { Order } from "./pages/Order";
import Cart from "./pages/Cart";
import Verify from "./pages/Verify";
import MyOrders from "./pages/Myorders";
import Aorder from "./pages/Aorders";
import { Empty } from "./components/Empty";
import { AddTool } from "./components/AddTool";
import ListTool from "./components/ListTool";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Addfarmer } from "./pages/AddFarmer";

function App() {
  const [category, setCategory] = useState("All");

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home category={category} setCategory={setCategory} />}
          />
          <Route
            path="/Market"
            element={<Products category={category} setCategory={setCategory} />}
          />
          <Route path="/About" element={<About />} />
          <Route path="/Schemes" element={<Schemes />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/empty" element={<Empty />} />
            {/* <Route path="/addfarmer" element={<Addfarmer />} /> */}
            <Route path="/order" element={<Order />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/admin" element={<Add />} />
          </Route>
          <Route path="/add" element={<Add />} />
          <Route path="/addtool" element={<AddTool />} />
          <Route path="/list" element={<List />} />
          <Route path="/listtool" element={<ListTool />} />
          <Route path="/orders" element={<Aorder />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
