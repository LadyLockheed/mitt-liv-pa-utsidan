
import React from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticatedState} from './GlobalStates.jsx';
import { useRecoilState } from "recoil";

const ProtectedRoute = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);

   
        const Component = props.component;
       
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to = {{ pathname: '/' }} />
        );
    
}

export default ProtectedRoute;