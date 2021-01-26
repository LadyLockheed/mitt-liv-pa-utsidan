import React from 'react'
import styled from 'styled-components'
import animatedCampfire from '../../Assets/animatedCampfireSmaller.gif'



const InnerWrapper = styled.div `
  
    display:grid;
    justify-content: center;
`; 

const AnimatedCampfireGif = styled.img`
    height: 10rem;
    margin: auto;

`;

const NoDataText = styled.h3`


`;


const SpinnerFireLog = ({text})=> {

    return (
  

            <InnerWrapper>
                <AnimatedCampfireGif src ={animatedCampfire}/>
                <NoDataText>{text}</NoDataText>
            </InnerWrapper>
          
      
    )

}

export default SpinnerFireLog