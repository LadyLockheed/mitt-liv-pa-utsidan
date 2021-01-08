import React from 'react';
import styled from 'styled-components';

const Container=styled.div`
    
    background: inherit;
    ${'' /* width: 40rem; */}
    width:60%;
    min-height: 20rem;
    box-shadow:0 0 1rem 0 rgba(0,0,0, .2);
    position: relative;
    margin-left:auto;
    margin-right:auto;
    margin-top:3rem;
    z-index:1;
    overflow:hidden;
    ${'' /* border:50px solid rgba(233,235,218,0.8); */}
    border-radius:5px;
    text-align:center;
    

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
        filter: blur(10px);
        z-index:-1;
    }

` 
const FrostedBackground=(props)=>{

return(

    <Container>
        {props.headline}

       {props.children}
       
    </Container>

)
  


}

export default FrostedBackground