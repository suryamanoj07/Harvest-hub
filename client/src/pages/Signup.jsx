import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Signup = () => {
    const [formData,setFormData] = useState({})
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange=(e)=>{    
        setFormData({
            ...formData,
            [e.target.id] : e.target.value,
        })
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            const res = await axios.post('http://localhost:3000/api/auth/signup',formData)
        if(res.data.success=='false'){
            setError(res.data.message)
            setLoading(false)
            console.log(res.data.message);    
            return
        }
        setLoading(false)
        setError(false)
        navigate('/Login')
        }catch(err){
            setLoading(false)
            setError(err.message)
        }
    }

  return (
    <div className="max-w-lg p-3 mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={submitForm} className="flex flex-col gap-4">
            <input type="text" id="username" placeholder="username" onChange={handleChange} className="border-blue-500 p-3 rounded-lg border-2" />
            <input type="email" id="email" placeholder="email" onChange={handleChange} className="border-blue-500 p-3 rounded-lg border-2" />
            <input type="password" id="password" placeholder="password" onChange={handleChange} className="border-blue-500 p-3 rounded-lg border-2" />
            <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading...":"Sign up"}</button>
        </form>
        <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to='/Login'><span className="text-blue-700">Sign in</span></Link>
        </div>
        <div>
            {error && <p className="text-red-600 mt-s">{error}</p> }
        </div>
    </div>
  )
}
