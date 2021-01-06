import React, {useRef, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import autumnleaf from './Assets/autumnleaf.svg'
import DropdownMenu from './DropdownMenu'


const H1=styled.h1`
 color:#EFEFEF;
 font-weight:300;
`
const Logo=styled.img` 
    height:4rem;
    justify-self:center;
    align-self:center;

`

const Navigation = styled.div`
    background-color:#606338;
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    padding:.2rem 3rem;
    
`;

const LinksContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;

`;
// const Li = styled.li`
//     list-style:none;
//     color:#EFEFEF;
//     text-decoration:none;
//     margin-right:4rem;
//     &:hover{
//         color:#a9c9c2;
//     }
// `;

// const NavLinkStyled = styled(NavLink)`
//     text-decoration:none;
//     color:#d6c5b7;
//     &.active{
//         color:white;
//         border-bottom:1px solid white;
//     }
//     &.selected{
//         color:white;
//     }

// `;

const Header = () => {


   const links=[
       {
           text:'All utrustning',
           link:'/allequipment'
       },
       {
           text:'Lägg till utrustning',
           link:'/addequipment',
        
       },
       {
        text:'Packlistor',
        link:'./packinglists'

       }
     
   ]


    return(
        <Navigation>
            {/* <H1> <NavLinkStyled to='/' exact activeClassName="selected"> React Router</NavLinkStyled></H1> */}
            <H1>Mitt liv på utsidan</H1>
            <Logo src={autumnleaf}></Logo>
            <LinksContainer>
                <DropdownMenu  menuHeadline={'Utrustning'} links={links}/>
                <DropdownMenu  menuHeadline={'Äventyr'} linkOptions={['Mina äventyr', 'Skapa nytt äventyr']}/>
               
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