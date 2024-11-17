import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utills/axios';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    setData({ email: '', password: '' });
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both email and password are filled
    if (!data.email || !data.password) {
      alert("Please fill out both email and password fields.");
      return; 
    }

    try {
      const response = await api.post('auth/login', data);
      const token = response.data.token;
      localStorage.setItem('token', token);

      setData({ email: '', password: '' }); // Clear inputs after successful login
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.log("Invalid credentials", error.message);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold text-center mb-6'>Login</h1>
      <form onSubmit={handleSubmit} className='space-y-4' autoComplete="off">
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={data.email} 
          onChange={handleChange} 
          autoComplete="off" 
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={data.password} 
          onChange={handleChange} 
          autoComplete="off" 
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button 
          type='submit' 
          className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
