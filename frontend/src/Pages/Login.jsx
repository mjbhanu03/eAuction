// LoginPage.jsx
import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginPage = ({ onSwitch }) => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'post',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
    const data = await res.json(); 
    if (res.ok && data.success) {
      navigate('/', { replace: true });
    } else {
      alert(data.message || 'Login failed');
    }

    } catch(error){
      console.log("Errorrrr: ", error)
    }
  } 

  return (
    <div className="bg-white h-screen flex">
      {/* Green section */}
      <div className="w-1/3 navbar text-white flex flex-col items-center justify-center p-6 text-center">
        
        <h2 className="text-2xl font-bold mb-2">New Here?</h2>
        <p className="mb-6 text-sm">Create your account and join us today!</p>
        <button
          onClick={onSwitch}
          className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#475e3a] transition"
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <div className="w-2/3 p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold olive-dark mb-6 flex flex-col items-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8 w-full flex flex-col items-center">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
          />
          <button
            type="submit"
            className="w-2/4 navbar text-white py-2 rounded-full font-semibold"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};


export default LoginPage;
