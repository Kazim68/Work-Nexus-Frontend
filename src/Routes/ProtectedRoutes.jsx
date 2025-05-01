import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { data } = useSelector(state => state.user);
    return data?.employee ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
