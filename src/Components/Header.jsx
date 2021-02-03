import React, { useState } from 'react'
import {  useHistory } from 'react-router-dom';
import styled from 'styled-components';

import mainLogo from '../Assets/mainLogo.svg'

import Burger from './Menu/Burger'
import MenuFromSide from './Menu/MenuFromSide'

const Navigation = styled.div`
    background-color: ${props => props.theme.green};
    padding: 0.5rem 3rem;
    position: relative;
    display:grid;
    grid-template-columns: repeat(5, 1fr);
    align-items:center;
    margin-bottom: 0.5rem;
    

    @media screen and (min-width: 600px){

        margin-bottom: 5rem;
    }
`;
const H1 = styled.h1`
    color: ${props => props.theme.white};
    font-weight: 300;
    font-size: 1rem;
    grid-column:1/3;
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
const Logo = styled.img` 
    height: 4rem;
    margin: auto;
    grid-column:3/4;

    &:hover {
        cursor: pointer;
    }

`;

const Header = () => {

    const history=useHistory()
    const goToAllEquipment=()=>{

        history.push('/allequipment')
    }

    const [isOpen, setIsOpen]=useState(false)
    return(
        <Navigation>

            <H1>Mitt liv på utsidan</H1>
            <Logo src={mainLogo} onClick={goToAllEquipment}></Logo>
                <Burger isOpen={isOpen} setIsOpen={setIsOpen}/>
            <MenuFromSide isOpen={isOpen} setIsOpen={setIsOpen}/>

        </Navigation>
    )
}

export default Header