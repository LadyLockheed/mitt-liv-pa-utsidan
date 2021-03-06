import React from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticatedState } from './GlobalStates.jsx';
import { useRecoilValue } from "recoil";

const ProtectedRoute = (props) => {
    const isAuthenticated = useRecoilValue(isAuthenticatedState);
    
        const Component = props.component;
       
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to = '/' />
        );
    
}

export default ProtectedRoute;