import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '../helpers/history';
import { refreshToken } from '../actions/auth';
import axios from 'axios';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const { isAuthenticated, token, refreshToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleUnauthorized = async () => {
            try {
                const response = await refreshToken(refreshToken);
                dispatch({ type: 'auth/refresh/', payload: response.data });
            } catch (error) {
                dispatch({ type: 'auth/logout/' });
            }
        };

        const handleResponse = (response) => {
            if (response.status === 403) {
                handleUnauthorized();
            }
        };

        const interceptor = axios.interceptors.response.use(
            (response) => {
                handleResponse(response);
                return response;
            },
            (error) => {
                handleResponse(error.response);
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />;
    }

    // authorized so return child components
    return children;
}