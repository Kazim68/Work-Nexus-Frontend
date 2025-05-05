import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const HRRoute = ({ children }) => {
    const user = useSelector(state => state.user);
    const role = user?.data?.employee?.userRole;

    if (!user) return <Navigate to="/signin" />; // optional guard

    return role === 'hr' ? children : <Navigate to="/dashboard" />;
};

export default HRRoute;
