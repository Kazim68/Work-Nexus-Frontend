import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({ children }) => {

    const { data } = useSelector((state) => state.user);
    const role = data?.employee?.userRole;

    if (!data) return <Navigate to="/signin" />; // optional guard

    return role === 'admin' ? children : <Navigate to="/dashboard" />;
}

export default AdminRoutes
