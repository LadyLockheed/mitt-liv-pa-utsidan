import React from 'react'
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

//global states
import { isAuthenticatedState} from './Shared/GlobalStates';
import { useRecoilValue } from "recoil";

//routes
import ProtectedRoute from './Shared/ProtectedRoute'

//images/assets
import landingImage from '../Assets/landingpageDSC00149.JPG'
import mainImage from '../Assets/mainDSC00103.JPG'
import image from '../Assets/DSC00009.JPG'
import imagelake from '../Assets/DSC_1663.JPG'
import imagestorm from '../Assets/DSC_1540.JPG'
import imagetent from '../Assets/DSC_1347.JPG'

//general components
import Header from './Header';
import Login from './Login/Login';
import AddNewUser from './Login/AddNewUser'
//Equipment components
import Equipment from './Equipment/Equipment'
import AllEquipment from './Equipment/AllEquipment'
import PackingLists from './Equipment/PackingLists'
import AddEquipment from './Equipment/AddEquipment'
//Adventure components
import AllAdventures from './Adventure/AllAdventures'
import AddNewAdventure from './Adventure/AddNewAdventure'
import SpecificAdventure from './Adventure/SpecificAdventure'



const MyApp = styled.div`
    box-sizing:border-box;
    padding: 0;
    margin: 0;
    height:100%;
    min-height:100vh;
    background-image:url(${props => props.isAuthenticated ? `${imagetent}` : `${image}`});
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
                        <Route exact path='/'>
                            <Login/>
                        </Route>
                    </>
                }
                
                {/* <Route path='/addnewuser'>

                    <Login 
                        headline={'Skapa ny användare'} 
                        labelTop={'Välj användarnamn'} 
                        labelBottom={'Välj lösenord'}
                        buttonText={'Klar!'}
                       
                        displayBackArrow={true} />

                </Route>

                <Route exact path='/'>
                    <Login 
                        headline={'Mitt liv på utsidan'} 
                        labelTop={'Login'} 
                        labelBottom={'Lösen'}
                        buttonText={'Logga in'}
                        displayBackArrow={false}
                    /> 
                </Route> */}
               
                <Route path="/equipment">
                    <Equipment/>
                </Route>

                <ProtectedRoute path="/allequipment" component={AllEquipment}/>
                <ProtectedRoute path="/packinglists" component={PackingLists}/>
                <ProtectedRoute path="/addequipment" component={AddEquipment}/>
                <ProtectedRoute path="/alladventures" component={AllAdventures}/>
                <ProtectedRoute path="/addnewadventure" component={AddNewAdventure}/>
                <ProtectedRoute path="/specifikadventure" component={SpecificAdventure}/>
   
          
            </Switch>
        </MyApp>
        
    )
}

export default Application
