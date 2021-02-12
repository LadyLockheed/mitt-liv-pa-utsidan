import React, {useEffect} from 'react'
import styled from 'styled-components';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios'

//global states
import { isAuthenticatedState} from './Shared/GlobalStates';
import { useRecoilState } from "recoil";

//routes
import ProtectedRoute from './Shared/ProtectedRoute'

//images/assets
// import imagePinkField from '../Assets/landingpageDSC00149.JPG'
// import imageTentSolo from '../Assets/mainDSC00103.JPG'
// import imageTentSoloSmaller from '../Assets/mainDSC00103smaller.jpg'
import imageTentSoloSmaller from '../Assets/mainDSC00103beskuren.jpg'
import imageGrassAndPlankSmaller from '../Assets/DSC00009smaller.jpg'
// import imageGrassAndPlank from '../Assets/DSC00009.JPG'
// import imagelake from '../Assets/DSC_1663.JPG'
// import imageStorm from '../Assets/DSC_1540.JPG'
// import imageTent from '../Assets/DSC_1347.JPG'

//general components
import Header from './Header';
import Login from './Login/Login'
import AddNewUser from './Login/AddNewUser'

//Equipment components
import AllEquipment from './Equipment/AllEquipment'
import PackingLists from './Equipment/PackingLists/index'
import AddEquipment from './Equipment/AddEquipment'
//Adventure components
import Adventures from './Adventure/Adventures/index'
import AddAdventure from './Adventure/AddAdventure/index'


//gör så att alla request kommer skicka med kakor
//kakorna behövs för sessions
axios.defaults.withCredentials = true

const MyApp = styled.div`
    box-sizing:border-box;
    padding: 0;
    margin: 0;
    height:100%;
    min-height:100vh;
    background-image:url(${props => props.isAuthenticated ? `${imageTentSoloSmaller}` : `${imageGrassAndPlankSmaller}`});
    background-position:left;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    ${'' /* display: flex;
    flex-direction: column;
    justify-content: center; */}


`;

const Application=()=>{

    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
   
    const history = useHistory()
    
    useEffect(()=>{
        

        //kollar om session finns i localstorage, om det finns är man fortfarande inloggad och behöver inte logga in igen om man laddar om sidan
        let loggedInUser = localStorage.getItem('userName')
        if (loggedInUser){
        
            setIsAuthenticated(true)
            history.push('/allEquipment')
 
        }
        
        return

    },[history, setIsAuthenticated])
    

    return(
        <MyApp isAuthenticated={isAuthenticated}>
        
            {isAuthenticated && <Header/>} 
      
            <Switch>
          
                <Route path='/addnewuser'>
                    <AddNewUser/>
                </Route>
                <Route exact={true} path='/'>
                    <Login/>
                </Route>
           
                <ProtectedRoute path="/allequipment" component={AllEquipment}/>
                <ProtectedRoute path="/packinglists" component={PackingLists}/>
                <ProtectedRoute path="/addequipment" component={AddEquipment}/>
                <ProtectedRoute path="/alladventures" component={Adventures}/>
                <ProtectedRoute path="/addadventure" component={AddAdventure}/>
               
               
            </Switch>
        </MyApp>
        
    )
}

export default Application
