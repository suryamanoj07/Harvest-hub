// import add_icon from "./../../assets/add_icon.png"
import order_icon from "./../../assets/order_icon.png"
import admin_dash from "./../../assets/admin_dash.jpg";
import manage_user from "./../../assets/manage_user.png";
import feedback_icon from "./../../assets/feedback.png"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser?.role.toLowerCase() === 'admin' && (
        <div className="max-w-80 border-r-slate-400 border-2 flex flex-col gap-0 fixed" style={{ height: "91.5vh" }}>
          <Link to="/admin">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-400 cursor-pointer border-b-2 border-slate-400 bg-slate-300">
              <img src={admin_dash} alt="add product" className="h-6 w-6" />
              <p>Admin Dashboard</p>
            </div>
          </Link>
          <Link to="/list">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-400 cursor-pointer border-b-2 border-slate-400 bg-slate-300">
              <img src={order_icon} alt="all products" className="h-6 w-6" />
              <p>All products</p>
            </div>
          </Link>
          <Link to="/orders">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-400 cursor-pointer border-b-2 border-slate-400 bg-slate-300">
              <img src={order_icon} alt="orders" className="h-6 w-6" />
              <p>Orders</p>
            </div>
          </Link>
          <Link to="/manage-users">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-400 cursor-pointer border-b-2 border-slate-400 bg-slate-300">
              <img src={manage_user} alt="manage user" className="h-6 w-6" />
              <p>Manage Users</p>
            </div>
          </Link>
          <Link to="/feedbacks">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-400 cursor-pointer border-b-2 border-slate-400 bg-slate-300">
              <img src={feedback_icon}  alt="add tool" className="h-6 w-6" />
              <p>User Feedbacks</p>
            </div>
          </Link>
          <Link to="/listtool">
            <div className="flex flex-col gap-2 p-6 justify-center items-center hover:bg-slate-400 cursor-pointer border-b-2 border-slate-400 bg-slate-300">
              <img src={order_icon} alt="all tools" className="h-6 w-6" />
              <p>All Tools</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
