import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isAuthenticatedState, currentUserState } from '../Shared/GlobalStates'
import LogOutIcon from '../../Assets/logouticon.svg'
import userIcon from '../../Assets/userIcon.svg'
import axios from 'axios'


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
    margin-top:2rem;
 
`;
const InnerWrapper = styled.div `
    display:flex;
    align-items: center;

`;
const UserName = styled.p `
    margin-left: 1rem;

`;

const UserIcon = styled.img`
    height: 1.5rem;
    width: auto;

`;
const LogOutButton = styled.span`
   padding:1rem;
   transition: color 0.3s linear;

   &:hover {
      color:${props => props.theme.white}; 
      cursor:pointer;
    }

`
const LogoutIcon = styled.img`
    height:1.5rem;
    width:auto;
    cursor: pointer;

`;

const MenuFromSide = ({ isOpen, setIsOpen }) => {


    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
    const currentUser = useRecoilValue(currentUserState)
   
    const history=useHistory()
    const logOut=()=>{

        logOutSession();
        setIsAuthenticatedState(false);
        history.push('/')
    }

    async function logOutSession() {

        try {
            const response = await axios.post('/api/logOutSession')
            console.log('log out response: ', response)
        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err) 
        }
    };


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

        </LinksWrapper>

       
        
        <LogOutWrapper >

            <InnerWrapper>
                <UserIcon src= {userIcon}/>
                <UserName> {currentUser.userName} </UserName>
            </InnerWrapper>
            <InnerWrapper onClick = {logOut}>
                <LogoutIcon src={LogOutIcon}/>
                <LogOutButton >Logga ut</LogOutButton>
            </InnerWrapper>
         

        </LogOutWrapper>
        
    
    </StyledMenu>
    )
}

export default MenuFromSide