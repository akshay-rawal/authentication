
import React, { useState,useEffect } from 'react'
import api from '../utills/axios'

const Dashboard = ()=>{
    const [message,setMessage]= useState("")
    useEffect(() => {
        const fetchData = async ()=>{
      try {
     const token = localStorage.getItem('token')
     const response = await api.get('auth/dashboard',{headers:{Authorization:`Bearer ${token}`},})
     setMessage(response.data.message)

      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
        }
        fetchData();
    }, [])
    return( 

        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
            <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
            <h1 className='text-2xl font-bold text-center text-blue-600 mb-4'>Dashboard</h1>
            <p className='text-lg text-center text-gray-800'>{message || "loading..."}</p>
            </div>
          
        </div>
    )

}
export default Dashboard;

