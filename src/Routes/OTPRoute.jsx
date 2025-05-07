import React from 'react'
import { Navigate } from 'react-router-dom';

const OTPRoute = () => {
    const email = localStorage.getItem("email");
  
    return email ? children : <Navigate to="/signin" />;
}

export default OTPRoute
