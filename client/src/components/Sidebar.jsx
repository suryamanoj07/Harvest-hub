import add_icon from "./../../assets/add_icon.png";
import admin_dash from "./../../assets/admin_dash.jpg";
import order_icon from "./../../assets/order_icon.png";
import manage_user from "./../../assets/manage_user.png";
import feedback_icon from "./../../assets/feedback.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidebar = ({ isOpen }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {currentUser?.role.toLowerCase() === 'admin' && (
        <>
          <Link to="/admin">
            <div className="sidebar-item">
              <img src={admin_dash} alt="Admin Dashboard" className="h-6 w-6" />
              <p>Admin Dashboard</p>
            </div>
          </Link>
          <Link to="/list">
            <div className="sidebar-item">
              <img src={order_icon} alt="All Products" className="h-6 w-6" />
              <p>All Products</p>
            </div>
          </Link>
          <Link to="/orders">
            <div className="sidebar-item">
              <img src={order_icon} alt="Orders" className="h-6 w-6" />
              <p>Orders</p>
            </div>
          </Link>
          <Link to="/manage-users">
            <div className="sidebar-item">
              <img src={manage_user} alt="Manage Users" className="h-6 w-6" />
              <p>Manage Users</p>
            </div>
          </Link>
          <Link to="/feedbacks">
            <div className="sidebar-item">
              <img src={feedback_icon} alt="User Feedbacks" className="h-6 w-6" />
              <p>User Feedbacks</p>
            </div>
          </Link>
          <Link to="/listtool">
            <div className="sidebar-item">
              <img src={order_icon} alt="All Tools" className="h-6 w-6" />
              <p>All Tools</p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};