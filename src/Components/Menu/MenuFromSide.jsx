import React, { useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

//globalstates
import { useSetRecoilState } from "recoil";
import { isAuthenticatedState } from '../Shared/GlobalStates'

//components
// import { HandleOutsideClick } from '../Shared/Helpers'

//images
import LogOutIcon from '../../Assets/logouticon.svg'
import userIcon from '../../Assets/user.svg'

const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${props => props.theme.darkgrey};
    height: 95vh;
    text-align: left;
    padding: 2rem;
    position: fixed;
    top: 0;
    right: 0;
    transition: transform 0.3s ease-in-out;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    z-index:9;
   
  
`;
const LinksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom:1px solid black;
   
    margin-bottom: 2rem;

    @media screen and (min-width: 600px){
        padding-bottom: 2rem;
    }
`;

const LinkStyled = styled(Link)`
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.8rem;
    color: ${props => props.theme.black};
    transition: color 0.3s linear;
    letter-spacing: 0.3rem;
    font-weight: bold;
    padding: 0.7rem 0;
    
 
    &:hover {
      color:${props => props.theme.white}; 
    }

    @media screen and (min-width: 600px){
        padding: 1rem 0;
        font-size: 1rem;
    }

`;
const LogOutWrapper = styled.div`
    margin-top:2rem;
 
`;
const InnerWrapper = styled.div`
    display:flex;
    align-items: center;

`;
const UserName = styled.p`
    margin-left: 1rem;
    font-size: 0.8rem;

    @media screen and (min-width: 600px){
        font-size: 1rem;
    }
    

`;

const UserIcon = styled.img`
    height: 1.3rem;
    width: auto;

    @media screen and (min-width: 600px){
        height:1.5rem;
    }

`;
const LogOutButton = styled.span`
   padding:1rem;
   transition: color 0.3s linear;
   font-size: 0.8rem;

   &:hover {
      color:${props => props.theme.white}; 
      cursor:pointer;
    }

    @media screen and (min-width: 600px){
        font-size: 1rem;
    }

`
const LogoutIcon = styled.img`
    height:1.3rem;
    width:auto;
    cursor: pointer;

    @media screen and (min-width: 600px){
        height:1.5rem;
    }

`;

const MenuFromSide = (props) => {

    const { isOpen, setIsOpen } = props

    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
    const currentUser = localStorage.getItem('userName')


    //! handleOutsideClick funkar inte här
    //closing modal on click outside
       const ref = useRef();
    //    HandleOutsideClick(ref, setIsOpen)

    const logOut = () => {

        logOutSession();
        setIsAuthenticatedState(false);
        localStorage.removeItem('userName');
    }



    async function logOutSession() {

        try {
            await axios.post('/api/logOutSession')

        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
        }
    };

    return (

        <StyledMenu isOpen={isOpen} ref={ref}>
            <LinksWrapper>
                <LinkStyled to='/allequipment' onClick={() => setIsOpen(!isOpen)}>All utrustning</LinkStyled>

                <LinkStyled to='/addequipment' onClick={() => setIsOpen(!isOpen)}>Lägg till <br /> ny utrustning</LinkStyled>

                <LinkStyled to='/packinglists' onClick={() => setIsOpen(!isOpen)}>Packlistor</LinkStyled>
            </LinksWrapper>
            {/* <p>Äventyr</p> */}
            <LinksWrapper>
                <LinkStyled to='/alladventures' onClick={() => setIsOpen(!isOpen)}>Alla äventyr</LinkStyled>

                <LinkStyled to='/addadventure' onClick={() => setIsOpen(!isOpen)}>Lägg till <br /> nytt äventyr</LinkStyled>

            </LinksWrapper>

            <LogOutWrapper >

                <InnerWrapper>
                    <UserIcon src={userIcon} />
                    <UserName> {currentUser} </UserName>
                </InnerWrapper>
                <InnerWrapper onClick={logOut}>
                    <LogoutIcon src={LogOutIcon} />
                    <LogOutButton >Logga ut</LogOutButton>
                </InnerWrapper>


            </LogOutWrapper>

        </StyledMenu>
    )
}

export default MenuFromSide