import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


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

  div {

    display: flex;
    flex-direction: column;
    justify-content: center;
        border-bottom:1px solid black;
    }
  

`;

const LinkStyled = styled(Link)`
    text-decoration:none;
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

const MenuFromSide = ({ isOpen, setIsOpen }) => {

        

    return (

        <StyledMenu isOpen={isOpen} >
        <p>Utrustning</p>
        <div>
            <LinkStyled to='/allequipment' onClick={()=>setIsOpen(!isOpen)}>All utrustning</LinkStyled>

            <LinkStyled to='/addequipment' onClick={()=>setIsOpen(!isOpen)}>Lägg till <br/> ny utrustning</LinkStyled>

            <LinkStyled to='/packinglists' onClick={()=>setIsOpen(!isOpen)}>Packlistor</LinkStyled>
        </div>
        <p>Äventyr</p>
        <div>
            <LinkStyled to='/alladventures' onClick={()=>setIsOpen(!isOpen)}>Alla äventyr</LinkStyled>

            <LinkStyled to='/addnewadventure' onClick={()=>setIsOpen(!isOpen)}>Lägg till <br/> nytt äventyr</LinkStyled>

            {/* <LinkStyled to='/specificadventure' onClick={()=>setIsOpen(!isOpen)}>Äventyret</LinkStyled> */}
        </div>
    
    </StyledMenu>
    )
}

export default MenuFromSide