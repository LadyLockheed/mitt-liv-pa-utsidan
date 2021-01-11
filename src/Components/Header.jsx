import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';


import styled from 'styled-components';
import mainlogo from '../Assets/mainlogo.svg'
import DropdownMenu from '../DropdownMenu'
import Burger from './Menu/Burger'
import MenuFromSide from './Menu/MenuFromSide'

import { useRecoilState } from "recoil";
import { isAuthenticatedState } from '../GlobalStates.jsx';


const Navigation = styled.div`
    background-color: ${props => props.theme.green};
    display: flex;
    padding: 0.2rem 3rem;
    position:relative;
  
    
`;

const H1=styled.h1`
    color: ${props => props.theme.white};
    font-weight: 300;
    font-size: 1rem;
    align-self: center;
    margin:0;
    display: none;

    @media screen and (min-width: 600px){
        font-size: 1.5rem;
        display: block;
    }

    @media screen and (min-width: 800px){
        font-size: 1.7rem;
   
    }

    @media screen and (min-width: 1000px){
        font-size: 2rem;
     
    }

`;
const Logo=styled.img` 
    height: 4rem;
    margin:auto;

    &:hover{
        cursor: pointer;
    }

`;

const LinksContainer = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
      
    
`;



const Header = () => {

    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState)
 
    const history=useHistory()
    const goToAllEquipment=()=>{

        history.push('/allequipment')
    }

    const logOut=()=>{
        setIsAuthenticated(false);
        history.push('/')
    }


   const linksEquipment = [
       {
           linkText:'All utrustning',
           linkAdress:'/allequipment'
       },
       {
           linkText:'Lägg till utrustning',
           linkAdress:'/addequipment',
       },
       {
            linkText:'Packlistor',
            linkAdress:'/packinglists'
       }
   ]
   
   const linksAdventure = [
    {
        linkText:'Alla äventyr',
        linkAdress:'/alladventures'
    },
    {
        linkText:'Lägg till äventyr',
        linkAdress:'/addnewadventure',
    },
    {
        linkText:'Äventyret',
        linkAdress:'/specificadventure'
    }
]

    const [isOpen, setIsOpen]=useState(false)
    return(
        <Navigation>

            <H1>Mitt liv på utsidan</H1>
            <Logo src={mainlogo} onClick={goToAllEquipment}></Logo>

            <Burger isOpen={isOpen} setIsOpen={setIsOpen}/>
            <MenuFromSide isOpen={isOpen} setIsOpen={setIsOpen}/>





            {/* <LinksContainer>
                <button onClick={logOut}>Logga ut</button>

             
                <DropdownMenu  menuHeadline={'Utrustning'} links={linksEquipment}/>
                <DropdownMenu  menuHeadline={'Äventyr'} links={linksAdventure}/>
           
           
            </LinksContainer> */}
    
                
        
        
        </Navigation>
    )
}

export default Header