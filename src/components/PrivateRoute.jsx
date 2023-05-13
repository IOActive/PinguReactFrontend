import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../helpers/history';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);
    
    if (!isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    // authorized so return child components
    return children;
}