import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginInFailure, loginInStart, loginInSuccess } from "./redux/user/userSlice";
import { storeContext } from "./redux/context/storeContext";
import OAuth from "../components/OAuth";
import { FaEnvelope, FaLock } from "react-icons/fa";
import loginBg from "../../../client/assets/signbg.jpg"; // Adjust the path as needed

export const Login = () => {
  const [formData, setFormData] = useState({});
  const { setToken } = useContext(storeContext);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    dispatch(loginInStart());
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData);
      if (res.data.success === "false") {
        dispatch(loginInFailure(res.data.message));
        return;
      }
      dispatch(loginInSuccess(res.data.user));
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      dispatch(loginInFailure(err.message));
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-no-repeat"
      style={{
        minHeight: "89vh",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "115%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-40 backdrop-blur-md shadow-2xl rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ease-in-out">
        <h1 className="text-4xl text-center font-bold text-purple-700 mb-6">Login</h1>

        <form onSubmit={submitForm} className="flex flex-col gap-5">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full pl-10 p-3 border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-md transition-all duration-200"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full pl-10 p-3 border-2 border-pink-400 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none shadow-md transition-all duration-200"
            />
          </div>
          <button
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg uppercase font-bold hover:shadow-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <OAuth />
        </form>
        <div className="flex justify-center items-center mt-5">
          <p className="text-gray-600"> Do not have an account?</p>
          <Link to="/Signup">
            <span className="text-blue-600 font-bold ml-2 hover:underline">Sign up</span>
          </Link>
        </div>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};
