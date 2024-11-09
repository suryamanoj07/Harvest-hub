<<<<<<< HEAD
import add_icon from "./../../assets/add_icon.png"
import order_icon from "./../../assets/order_icon.png"
=======
import React from 'react';
import add_icon from "./../../assets/add_icon.png";
import order_icon from "./../../assets/order_icon.png";
>>>>>>> c7c8b6c9619d9db1563655c8921139b64eb035b5
import manage_user from "./../../assets/manage_user.png";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser?.role.toLowerCase() === 'admin' && (
        <div className="max-w-76 border-r-slate-400 border-2 flex flex-col gap-0" style={{ height: "89.9vh" }}>
          <Link to="/add">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-300 cursor-pointer border-b-2 border-slate-400">
              <img src={add_icon} alt="add product" className="h-6 w-6" />
              <p>Add new product</p>
            </div>
          </Link>
          <Link to="/list">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-300 cursor-pointer border-b-2 border-slate-400">
              <img src={order_icon} alt="all products" className="h-6 w-6" />
              <p>All products</p>
            </div>
          </Link>
          <Link to="/orders">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-300 cursor-pointer border-b-2 border-slate-400">
              <img src={order_icon} alt="orders" className="h-6 w-6" />
              <p>Orders</p>
            </div>
          </Link>
          <Link to="/manage-users">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-300 cursor-pointer border-b-2 border-slate-400">
              <img src={manage_user} alt="manage user" className="h-6 w-6" />
              <p>Manage Users</p>
            </div>
          </Link>
          <Link to="/addtool">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-300 cursor-pointer border-b-2 border-slate-400">
              <img src={add_icon} alt="add tool" className="h-6 w-6" />
              <p>Add new Tool</p>
            </div>
          </Link>
          <Link to="/listtool">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-300 cursor-pointer border-b-2 border-slate-400">
              <img src={order_icon} alt="all tools" className="h-6 w-6" />
              <p>All Tools</p>
            </div>
          </Link>
        </div>
<<<<<<< HEAD
        </Link>
        <Link to="/list">
        <div className="flex flex-col gap-2 p-6 justify-center items-center  bg-teal-400  hover:bg-teal-500 cursor-pointer border-b-2 border-slate-400">
            <img src={order_icon} alt="add item" className="h-6 w-6" />
            <p>All items</p>
        </div>
        </Link>
        <Link to="/orders">
        <div className="flex flex-col gap-2 p-6 justify-center items-center  bg-teal-400  hover:bg-teal-500 cursor-pointer border-b-2 border-slate-400">
            <img src={order_icon} alt="add product" className="h-6 w-6" />
            <p>Orders</p>
        </div>
        </Link>
        <Link to="/addtool">
        <div className="flex flex-col gap-2 p-6 justify-center items-center  bg-teal-400  hover:bg-teal-500 cursor-pointer border-b-2 border-slate-400">
            <img src={add_icon} alt="add product" className="h-6 w-6" />
            <p>Add new Product</p>
        </div>
        </Link>
        <Link to="/listtool">
        <div className="flex flex-col gap-2 p-6 justify-center items-center  bg-teal-400  hover:bg-teal-500 cursor-pointer border-b-2 border-slate-400">
            <img src={order_icon} alt="add product" className="h-6 w-6" />
            <p>All Products</p>
        </div>
        </Link>
        <Link to="/manage-users">
            <div className="flex flex-col gap-2 p-6 justify-center items-center  bg-teal-400  hover:bg-teal-500 cursor-pointer border-b-2 border-slate-400">
              <img src={manage_user} alt="manage user" className="h-6 w-6" />
              <p>Manage Users</p>
            </div>
          </Link>
    </div>
  )
}
=======
      )}
    </>
  );
};
>>>>>>> c7c8b6c9619d9db1563655c8921139b64eb035b5
