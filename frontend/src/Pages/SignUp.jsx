// SignUpPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ onSwitch }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
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
    e.preventDefault()

    try{
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      // if(res.data.success){
        console.log('Submitted', res) 
        alert('User Created Successfully')
        navigate('/login')

      // }
    } catch (error){
      console.error('Error:', error)
    }
  }

  return (
    <div className="bg-white h-screen flex">
            {/* Form */}
      <div className="w-2/3 p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold olive-dark mb-6 flex flex-col items-center">
          Create a New Account
        </h2>
        <form  onSubmit={handleSubmit} className="space-y-8 w-full flex flex-col items-center">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            name = 'name'
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
          />
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            className="w-2/4 px-4 py-3 rounded-full bg-gray-200 focus:outline-none"
          />
          <button
            type="submit"
            className="w-2/4 navbar text-white py-2 rounded-full font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
      
      {/* Green section */}
      <div className="w-1/3 navbar text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p className="mb-6 text-sm">
          Already have an account? Log in to continue your journey!
        </p>
        <button
          onClick={onSwitch}
          className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#475e3a] transition"
        >
          Log In
        </button>
      </div>


    </div>
  );
};


export default SignUpPage;
