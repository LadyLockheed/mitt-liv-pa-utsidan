import React from 'react'
import AnimatedCampfire from '../../Assets/animatedCampire.gif'
import AnimatedCampfireSmaller from '../../Assets/animatedCampfireSmaller.gif'
import styled from 'styled-components'
import FrostedBackground from '../Shared/FrostedBackground'

const Campfire = styled.img`
    height:7rem;
    width:auto;
`;

const AllAdventure=()=>{

    return(

        <div>
           AllAdventures
        <FrostedBackground headline={'Alla äventyr'}>
            <Campfire src={AnimatedCampfire} alt="loading..." />
            <Campfire src={AnimatedCampfireSmaller} alt="loading..." />

        </FrostedBackground>
      
        </div>
    )
}

export default AllAdventure