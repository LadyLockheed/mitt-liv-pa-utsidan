import React from 'react';
import styled from 'styled-components';

const Container=styled.div`
    
    background: inherit;
  
    width:50%;
    min-height: 70vh;
    box-shadow:0 0 1rem 0 rgba(0,0,0, .2);
    position: relative;
    margin-left:auto;
    margin-right:auto;
    margin-top:2rem;
    z-index:1;
    overflow:hidden;
    border-radius:5px;
    

    @media screen and (max-width: 750px) {
        width:95%;
    }
  
    

    &:before{
        content: '';
        background: inherit; 
        position: absolute;
        left: 0;
        right: 0;
        top: 0; 
        bottom: 0;
        box-shadow: inset 0 0 0 2000px rgba(255,255,255,0.3);
        margin:-20px;
        filter: blur(15px);
        z-index:-1;
    }

` 
const Headline=styled.h1`
    color:${props=>props.theme.black};
    font-size: 1.2rem;
    font-weight:bold;
    text-align:center;
    text-transform: uppercase;
    letter-spacing: 0.2rem;

    @media screen and ( min-width: 600px) {

        font-size:1.7rem;
    }
    
`
const FrostedBackground=(props)=>{

return(

    <Container>
        <Headline>
            {props.headline}
        </Headline>

       {props.children}
       
    </Container>

)
  


}

export default FrostedBackground