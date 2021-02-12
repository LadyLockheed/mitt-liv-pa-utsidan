import React from 'react'
import styled from 'styled-components'

const StyledBurger = styled.button` 
    position: absolute;
    top: 25%;
    right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
  
    &:focus {
      outline: none;
    }
  
    div {
      width: 2rem;
      height: 0.25rem;
      background: ${({ theme, isOpen }) => isOpen ? theme.green : theme.white};
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;

      :first-child {
        transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'rotate(0)'};
      }

      :nth-child(2) {
        opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
        transform: ${({ isOpen }) => isOpen ? 'translateX(20px)' : 'translateX(0)'};
      }

    :nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }

`;


const Burger = ({ isOpen, setIsOpen }) => {

  return (

    <StyledBurger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )


}

export default Burger