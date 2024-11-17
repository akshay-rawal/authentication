
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
 

 
  

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-lg">
        <Link to="/">Home</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/login" className="text-white">Login</Link>
        <Link to="/register" className="text-white">Register</Link>
        <Link to='/logout' className="text-white">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
