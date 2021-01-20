import React from 'react'
// import AnimatedCampfire from '../../Assets/animatedCampire.gif'
// import AnimatedCampfireSmaller from '../../Assets/animatedCampfireSmaller.gif'
import styled from 'styled-components'
import FrostedBackground from '../Shared/FrostedBackground'
import { Adventures } from '../Shared/GlobalStates';
import { useRecoilValue } from 'recoil';
import {useHistory} from 'react-router-dom'

// const Campfire = styled.img`
//     height:7rem;
//     width:auto;
// `;

const Wrapper = styled.div`
    margin: 1rem 1rem 2rem 1rem;

    @media screen and (min-width:600px;){
        margin: 1rem 2rem 2rem 2rem;
    }

`;

const AdventureWrapper = styled.div`
    display:grid;
    align-items: center;
    grid-template-columns: repeat(14, 1fr);
    background-color:rgba(233,235,218,0.8);
    padding: 1rem;

    &:nth-child(odd) {
        background-color:rgb(219,221,205);
    }
    &:nth-child(even) {
        background-color:rgb(233,235,218);
    }
    &:first-child {
        border-radius: 3px 3px 0px 0px;
    }
    &:last-child {
        border-radius: 0px 0px 3px 3px;
    }

    &:hover {
        cursor:pointer;
    }


`;

const InfoText = styled.p`
    font-weight:bold;
    ${'' /* text-transform: uppercase; */}
    text-align: left;
    grid-column: 3/12;
 
`;

const AllAdventure=()=>{

    const adventures = useRecoilValue(Adventures)
    const history = useHistory()
    const goToSpecificAdventure = () => {

        history.push('/specificadventure')
    }

    return(
  
        

        <FrostedBackground headline={'Alla äventyr'}>

        <Wrapper>



            {adventures.map((adventure, index)=> {
                  
              return ( <AdventureWrapper key = {adventure.adventureName + index} onClick= {goToSpecificAdventure}>
                    <InfoText> { adventure.adventureName } </InfoText>
              

                </AdventureWrapper> )
            })}

        </Wrapper>

            {/* <Campfire src={AnimatedCampfire} alt="loading..." />
            <Campfire src={AnimatedCampfireSmaller} alt="loading..." /> */}

        </FrostedBackground>
      
      
    )
}

export default AllAdventure