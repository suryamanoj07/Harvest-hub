import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import signbg from "../../../client/assets/signbg.jpg";

export const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setFormData((p) => ({ ...p, [id]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      if (res.data.success === "false") {
        setError(res.data.message);
        setLoading(false);
        console.log(res.data.message);
        return;
      }
      setLoading(false);
      setError(false);
      navigate("/Login");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-no-repeat"
      style={{
        minHeight: "89vh",
        backgroundImage: `url(${signbg})`,
        backgroundSize: "115%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-40 backdrop-blur-md shadow-2xl rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ease-in-out">
        <h1 className="text-4xl text-center font-bold text-purple-700 mb-6">
          Sign Up
        </h1>

        <form onSubmit={submitForm} className="flex flex-col gap-5">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              id="user_name"
              placeholder="Username"
              onChange={handleChange}
              className="w-full pl-10 p-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none shadow-md transition-all duration-200"
            />
          </div>
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
          <div className="flex items-center gap-4">
            <p className="font-medium">Role:</p>
            <select
              id="role"
              onChange={handleChange}
              className="px-3 py-2 border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
            >
              <option value="Farmer">Farmer</option>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg uppercase font-bold hover:shadow-lg hover:from-purple-600 hover:to-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
          <OAuth />
        </form>
        <div className="flex justify-center items-center mt-5">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/Login">
            <span className="text-blue-600 font-bold ml-2 hover:underline">
              Sign in
            </span>
          </Link>
        </div>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};
