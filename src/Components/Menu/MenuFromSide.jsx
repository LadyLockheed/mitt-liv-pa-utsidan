import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useSetRecoilState } from "recoil";
import { isAuthenticatedState } from '../Shared/GlobalStates'
import LogOutIcon from '../../Assets/logouticon.svg'


const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${props => props.theme.darkgrey};
    height: 91vh;
    text-align: left;
    padding: 2rem;
    position: fixed;
    top: 0;
    right: 0;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translate(100%)'};
    z-index:9;
  
`;
const LinksWrapper = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom:1px solid black;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
    text-transform: uppercase;
    color: ${props => props.theme.black};
    transition: color 0.3s linear;
    letter-spacing: 0.3rem;
    font-weight: bold;
    padding: 1rem 0;
 
    &:hover {
      color:${props => props.theme.white}; 
    }

`;
const LogOutWrapper = styled.div `
   ${'' /* justify-self:flex-end; */}
    display:flex;
    justify-content:center;
    align-items: center;
    cursor:pointer;
    ${'' /* justify-self:flex-end; */}
    margin-top:2rem;
 
`

const LogOutButton = styled.span`
   padding:1rem;
   transition: color 0.3s linear;

   &:hover {
      color:${props => props.theme.white}; 
    }


  
 
`

const LogoutIcon = styled.img`
    height:1.5rem;
    width:auto;
   
`;



const MenuFromSide = ({ isOpen, setIsOpen }) => {

    

    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
 
    const history=useHistory()
    const logOut=()=>{
        setIsAuthenticatedState(false);
        history.push('/')
    }

    return (

        <StyledMenu isOpen={isOpen} >
        {/* <p>Utrustning</p> */}
        <LinksWrapper>
            <LinkStyled to='/allequipment' onClick={()=>setIsOpen(!isOpen)}>All utrustning</LinkStyled>

            <LinkStyled to='/addequipment' onClick={()=>setIsOpen(!isOpen)}>Lägg till <br/> ny utrustning</LinkStyled>

            <LinkStyled to='/packinglists' onClick={()=>setIsOpen(!isOpen)}>Packlistor</LinkStyled>
        </LinksWrapper>
        {/* <p>Äventyr</p> */}
        <LinksWrapper>
            <LinkStyled to='/alladventures' onClick={()=>setIsOpen(!isOpen)}>Alla äventyr</LinkStyled>

            <LinkStyled to='/addadventure' onClick={()=>setIsOpen(!isOpen)}>Lägg till <br/> nytt äventyr</LinkStyled>

            {/* <LinkStyled to='/specificadventure' onClick={()=>setIsOpen(!isOpen)}>Äventyret</LinkStyled> */}
        </LinksWrapper>

        <LinkStyled to='/gallery' onClick={()=>setIsOpen(!isOpen)}>Gallery</LinkStyled>
        
        <LogOutWrapper onClick={logOut}>
            <LogoutIcon src={LogOutIcon}/>
            <LogOutButton >Logga ut</LogOutButton>

        </LogOutWrapper>
        
    
    </StyledMenu>
    )
}

export default MenuFromSide