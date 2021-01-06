import React, {useState} from 'react'
import styled from 'styled-components';
import { Route, useHistory } from 'react-router-dom';
import Header from './Header';
import landingImage from './Assets/landingpageDSC00149.JPG';
import mainImage from './Assets/mainDSC00103.JPG'
import image from './Assets/DSC00009.JPG'

import Login from './Login';
import Equipment from './Equipment'
import AllEquipment from './AllEquipment'
import PackingLists from './PackingLists'
import AddEquipment from './AddEquipment'


const MyApp=styled.div`
    box-sizing:border-box;
    padding: 0;
    margin: 0;
    height:100%;
    min-height:100vh;
    background-image:url(${props=> props.isLoggedIn ? `${mainImage}` : `${landingImage}`});
    background-position:left;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    ${'' /* display:grid;
    align-items:center;
    justify-content:center; */}

` ;

const Application=()=>{

    const [displayAddNewUser, setDisplayAddNewUser]=useState(false)
    const [isLoggedIn, setIsLoggedIn]=useState(true)
    //TODO ändra namn på useExist som skickas in som props
    //TODO validering på login
    
    return(
        <MyApp isLoggedIn={isLoggedIn}>
      

        {!isLoggedIn && !displayAddNewUser && 
        <Login 
            headline={'Mitt liv på utsidan'} 
            labelTop={'Login'} 
            labelBottom={'Lösen'}
            buttonText={'Logga in'}
            displayBackArrow={false}
        /> }
        {!isLoggedIn && displayAddNewUser &&  
        <Login 
            headline={'Skapa ny användare'} 
            labelTop={'Välj användarnamn'} 
            labelBottom={'Välj lösenord'}
            buttonText={'Klar!'}
            displayBackArrow={true} />}
       
            

        {isLoggedIn && 
            <> 

                <Header/>

                <Route path="/equipment">
                    <Equipment/>
                </Route>
                <Route path="/allequipment">
                    <AllEquipment/>
                </Route>
                <Route path="/packinglists">
                    <PackingLists/>
                </Route>
                <Route path="/addequipment">
                    <AddEquipment/>
                </Route>
                
            
            </>
        
        }
                    
            


           

         
            
         
         
        
    
        </MyApp>
        
    )
}

export default Application
