import { useEffect, useState } from "react";
import api from "../utills/axios";
import { useNavigate } from "react-router-dom";


const Logout = ({logout})=>{
    const navigate = useNavigate()

   useEffect(()=>{
    const logoutUser = async ()=>{
      const token = localStorage.getItem('token');
      if (!token) {
        alert("no user found.invalid")
        return;
    }
      try {  
            const response = await api.post('auth/logout',{},{headers:{Authorization:`Bearer ${token}`},})
           if(response.status===200){

            localStorage.removeItem("token");
            setLoggedIn(false);
            alert("successfully logout");
            navigate('/home')
           }

      }catch (error) {
        console.log({message:'user invalid',error})
      }}
        logoutUser()
     },[])
return(
  <div class="flex items-center justify-center h-screen">
   <p className="text-xl  text-gray-700"> you have been logout sucessfully</p>
   </div>
)}
export default Logout;