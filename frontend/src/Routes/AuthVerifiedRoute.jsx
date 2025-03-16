import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AuthVerifiedRoute = () => {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to={"/login"} />
};

export default AuthVerifiedRoute;