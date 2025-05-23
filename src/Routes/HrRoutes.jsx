import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const HRRoute = ({ children }) => {
    
    const { data } = useSelector((state) => state.user);
    const role = data?.employee?.userRole;

    if (!data) return <Navigate to="/signin" />; // optional guard

    return role === 'hr' ? children : <Navigate to="/dashboard" />;
};

export default HRRoute;
