import React from 'react'
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

//global states
import { isAuthenticatedState} from './Shared/GlobalStates';
import { useRecoilValue } from "recoil";

//routes
import ProtectedRoute from './Shared/ProtectedRoute'

//images/assets
// import landingImage from '../Assets/landingpageDSC00149.JPG'
import imageTentSolo from '../Assets/mainDSC00103.JPG'
import imagePinkField from '../Assets/DSC00009.JPG'
// import imagelake from '../Assets/DSC_1663.JPG'
// import imageStorm from '../Assets/DSC_1540.JPG'
// import imageTent from '../Assets/DSC_1347.JPG'

//general components
import Header from './Header';
import Login from './Login/Login';
import AddNewUser from './Login/AddNewUser'
//Equipment components

import AllEquipment from './Equipment/AllEquipment'
import PackingLists from './Equipment/PackingLists'
import AddEquipment from './Equipment/AddEquipment'
//Adventure components
import AllAdventures from './Adventure/AllAdventures'
import AddAdventure from './Adventure/AddAdventure/AddAdventure'
import SpecificAdventure from './Adventure/SpecificAdventure'

import Gallery from '../Components/Gallery'


const MyApp = styled.div`
    box-sizing:border-box;
    padding: 0;
    margin: 0;
    height:100%;
    min-height:100vh;
    background-image:url(${props => props.isAuthenticated ? `${imageTentSolo}` : `${imagePinkField}`});
    background-position:left;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;

` ;

const Application=()=>{

    const isAuthenticated = useRecoilValue(isAuthenticatedState);
  
   
    //TODO validering på login
  

    return(
        <MyApp isAuthenticated={isAuthenticated}>
        
            {isAuthenticated && <Header/>} 
      
            <Switch>
                {!isAuthenticated && 
                    <>
                        <Route path='/addnewuser'>
                            <AddNewUser/>
                        </Route>
                        <Route exact={true} path='/'>
                            <Login/>
                        </Route>
                    </>
                }
            
                <ProtectedRoute path="/allequipment" component={AllEquipment}/>
                <ProtectedRoute path="/packinglists" component={PackingLists}/>
                <ProtectedRoute path="/addequipment" component={AddEquipment}/>
                <ProtectedRoute path="/alladventures" component={AllAdventures}/>
                <ProtectedRoute path="/addadventure" component={AddAdventure}/>
                <ProtectedRoute path="/specifikadventure" component={SpecificAdventure}/>
                <ProtectedRoute path="/gallery" component={Gallery}/>
             
   
          
            </Switch>
        </MyApp>
        
    )
}

export default Application
