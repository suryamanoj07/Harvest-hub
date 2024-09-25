import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { loginInFailure,loginInStart,loginInSuccess } from "./redux/user/userSlice"
import { storeContext } from "./redux/context/storeContext"
// import { response } from "express"

export const Login = () => {
    const [formData,setFormData] = useState({})
    const {setToken} = useContext(storeContext)
    const {loading,error}=useSelector((state)=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange=(e)=>{    
        setFormData({
            ...formData,
            [e.target.id] : e.target.value,
        })
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        dispatch(loginInStart())
        try{
            const res = await axios.post('http://localhost:3000/api/auth/login',formData)
        if(res.data.success=='false'){
            dispatch(loginInFailure(res.data.message))  
            return
        }
        dispatch(loginInSuccess(res.data.user))
        setToken(res.data.token)
        localStorage.setItem("token",res.data.token)
        
        navigate('/')
        }catch(err){
            dispatch(loginInFailure(err.message))
        }
    }

  return (
    <div className="max-w-lg p-3 mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
        <form onSubmit={submitForm} className="flex flex-col gap-4">
            <input type="email" id="email" placeholder="email" onChange={handleChange} className="border-blue-500 p-3 rounded-lg border-2" />
            <input type="password" id="password" placeholder="password" onChange={handleChange} className="border-blue-500 p-3 rounded-lg border-2" />
            <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading...":"Login"}</button>
        </form>
        <div className="flex gap-2 mt-5">
            <p>Dont have an account?</p>
            <Link to='/Signup'><span className="text-blue-700">Sign up</span></Link>
        </div>
        <div>
            {error && <p className="text-red-600 mt-s">{error}</p> }
        </div>
    </div>
  )
}
