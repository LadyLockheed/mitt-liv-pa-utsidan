import React, {useState} from 'react'
import styled from 'styled-components'

const Wrapper = styled.div `
    border: 1px solid black;
    width: 20rem;
    height: 20rem;
    background-color: lightgrey;

`;

const FilterMenu = styled.div `
    background-color: pink;
    height: 80%;
    width: ${props => props.toggleMenu ? '90%' : '0'};
    transition: width .7s;
   
`;
// transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translate(100%)'};
const FilterText = styled.p `
    visibility: ${props => props.toggleMenu ? 'visible' : 'hidden'};
    margin-top:none;
    color: ${ props => props.toggleMenu ? 'black' : 'pink'};
    transition: color 1s ease;
`;

const Button = styled.button `

`;



const SpecificAdventure=()=>{

    const [toggleMenu, setToggleMenu] = useState(false)
    // const [menuWidth, setMenuWidth] = useState('0')
    console.log('toggleMenu: ', toggleMenu)
    // console.log('menuwidth: ', menuWidth)
    const changeMenu = () =>{
        setToggleMenu(!toggleMenu)
  
    }

    return(

        <Wrapper>
            <Button onClick= {changeMenu}>Filter</Button>

            <FilterMenu toggleMenu={toggleMenu}>
                <FilterText toggleMenu={toggleMenu}>Ett filter</FilterText>
                <FilterText toggleMenu={toggleMenu}>Ett filter</FilterText>
                <FilterText toggleMenu={toggleMenu}>Ett filter</FilterText>
                <FilterText toggleMenu={toggleMenu}>Ett filter</FilterText>
                <FilterText toggleMenu={toggleMenu}>Ett filter</FilterText>
                <FilterText toggleMenu={toggleMenu}>Ett filter</FilterText>

            </FilterMenu>
           
        </Wrapper>
    )
}

export default SpecificAdventure