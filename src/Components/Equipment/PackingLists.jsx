import React from 'react'
import { Adventures } from '../Shared/GlobalStates';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components'
import FrostedBackground from '../Shared/FrostedBackground'
// import autumnIcon from '../../Assets/autumnleaf.svg'
import autumnIcon from '../../Assets/autumnLeafIcon.svg'
import summerIcon from '../../Assets/summerSunIcon.svg'
import winterIcon from '../../Assets/winterSnowFlaceIcon.svg'
import springIcon from '../../Assets/springBranchIcon.svg'


const Wrapper = styled.div`
    margin: 1rem 1rem 2rem 1rem;

    @media screen and (min-width:600px;){
        margin: 1rem 2rem 2rem 2rem;
    }

`;
const ItemWrapper = styled.div`

    background-color:rgba(233,235,218,0.8);
    padding: 1rem;

    &:nth-child(odd) {
        background-color:rgb(219,221,205);
    }
    &:nth-child(even) {
        background-color:rgb(233,235,218);
    }

    display:grid;
    align-items: center;
    grid-template-columns: repeat(14, 1fr);


`;

const SeasonIcon = styled.img `
    height:1.5rem;
    width: auto;
    grid-column: 1/2;
    
`;
const InfoText = styled.p`
    font-weight:bold;
    tex-transform: uppercase;
    text-align: left;
    grid-column: 2/12;
 
`;
const WeightText = styled.p`
    grid-column: 13/15;
`;


const PackingLists=()=>{
    

    const packingLists=useRecoilValue(Adventures)
    console.log(packingLists)

    const calculatedIcon = (season) => {

        if (season === 'autumn') return autumnIcon;
        if (season === 'summer') return summerIcon
        if (season === 'winter') return winterIcon
        if (season === 'spring') return springIcon

    }
    
    return(
        <FrostedBackground headline={'Packlistor'}>
            <Wrapper>
       
            {packingLists.map((item, index) =>{
                return(
                <ItemWrapper key={item.adventureName}>
                  
                    <SeasonIcon src={calculatedIcon(item.season)} />
                    <InfoText>
                        {item.adventureName}, {item.days}<span> dygn</span> 
                        </InfoText>
                      <WeightText>{item.weight} <span> kg</span></WeightText>  

                  
                   
                    
                </ItemWrapper>)
            })}

        </Wrapper>

        </FrostedBackground>
     
    )
}

export default PackingLists