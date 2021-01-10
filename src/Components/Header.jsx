import React, {useRef, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';


import styled from 'styled-components';
import mainlogo from '../Assets/mainlogo.svg'
import DropdownMenu from '../DropdownMenu'

import { useRecoilState } from "recoil";
import { isAuthenticatedState } from '../GlobalStates.jsx';


const Navigation = styled.div`
    background-color: ${props => props.theme.green};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: .2rem 3rem;
    
`;

const H1=styled.h1`
    color: ${props => props.theme.white};
    font-weight: 300;
    font-size: 1rem;

    @media only screen and (min-width: 600px){
        border:2px solid red;
        font-weight: 300;
        font-size: 2rem;
        
    }

    @media only screen and (min-width: 997){
        border:2px solid blue;
        font-weight: 300;
        font-size: 2rem;
        
    }


`
const Logo=styled.img` 
    height: 4rem;
    justify-self: center;
    align-self: center;

    &:hover{
        cursor: pointer;
    }


`



const LinksContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;

`;


const Header = () => {

    const [isAuthenticated, setIsAuthenticated]=useRecoilState(isAuthenticatedState)
 
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
        linkAdress:'./packinglists'
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
     linkAdress:'./specificadventure'
    }
]


    return(
        <Navigation>

            <H1>Mitt liv på utsidan</H1>
            <Logo src={mainlogo} onClick={goToAllEquipment}></Logo>
            <LinksContainer>
            <button onClick={logOut}>Logga ut</button>
                <DropdownMenu  menuHeadline={'Utrustning'} links={linksEquipment}/>
                <DropdownMenu  menuHeadline={'Äventyr'} links={linksAdventure}/>
               
                {/* <Li onClick={()=>console.log('click')}>Utrustning</Li>
                <Li>Äventyr</Li> */}
            </LinksContainer>
            {/* <DropdownMenu menuHeadline={'Utrustning'} linkOptions={['Utrustning', 'Lägg till utrustning', 'Packlistor']}/> */}
          

            {/* <Ul>

            
                    <Li><NavLinkStyled to={`/${props.userId}/equipment`}>Equipment</NavLinkStyled></Li>
                    <Li><NavLinkStyled to={`/equipment`}>Utrustning</NavLinkStyled></Li>


                <Li><NavLinkStyled to={`/${props.userId}/equipment`}>Equipment</NavLinkStyled></Li>
            
                <Li><NavLinkStyled to={`/equipment/:${props.userId}`}>Equipment</NavLinkStyled></Li>
                <Li><NavLinkStyled to='/adventure' exact>Äventyr</NavLinkStyled></Li>
            </Ul> */}
                
        
        
        </Navigation>
    )
}

export default Header