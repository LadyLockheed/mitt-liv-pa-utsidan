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


const NoDataAddedYet = ()=> {

    return (
  

            <InnerWrapper>
                <AnimatedCampfireGif src ={animatedCampfire}/>
                <NoDataText>Ingen utrustning tillagd än</NoDataText>
            </InnerWrapper>
          
      
    )

}

export default NoDataAddedYet