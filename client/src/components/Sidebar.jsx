import add_icon from "./../../assets/add_icon.png"
import order_icon from "./../../assets/order_icon.png"
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className=" max-w-76 border-r-slate-400 border-2 flex flex-col gap-0" style={{height:"89.9vh"}}>
        <Link to="/add">
        <div className="flex flex-col gap-2 p-6 justify-center items-center  hover:bg-slate-300 cursor-pointer border-b-2 border-slate-400">
            <img src={add_icon} alt="add product" className="h-6 w-6" />
            <p>Add new product</p>
        </div>
        </Link>
        <Link to="/list">
        <div className="flex flex-col gap-2 p-6 justify-center items-center  hover:bg-slate-300 cursor-pointer border-b-2 border-slate-400">
            <img src={order_icon} alt="add product" className="h-6 w-6" />
            <p>All products</p>
        </div>
        </Link>
        <Link to="/orders">
        <div className="flex flex-col gap-2 p-6 justify-center items-center  hover:bg-slate-300 cursor-pointer border-b-2 border-slate-400">
            <img src={order_icon} alt="add product" className="h-6 w-6" />
            <p>Orders</p>
        </div>
        </Link>
    </div>
  )
}