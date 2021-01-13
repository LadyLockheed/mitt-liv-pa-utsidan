
import React from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticatedState } from './GlobalStates.jsx';
import { useRecoilValue } from "recoil";

const ProtectedRoute = (props) => {
    const isAuthenticated = useRecoilValue(isAuthenticatedState);
        // console.log(isAuthenticated)
        // console.log('protected route')
   
        const Component = props.component;
       
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to = {{ pathname: '/' }} />
        );
    
}

export default ProtectedRoute;