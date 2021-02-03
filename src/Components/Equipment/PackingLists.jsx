import React from 'react'
import { allAdventuresState, allEquipmentState } from '../Shared/GlobalStates';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components'
import FrostedBackground from '../Shared/FrostedBackground'
import autumnIcon from '../../Assets/autumnLeafIcon.svg'
import summerIcon from '../../Assets/summerSunIcon.svg'
import winterIcon from '../../Assets/winterSnowFlaceIcon.svg'
import springIcon from '../../Assets/springBranchIcon.svg'
import { SelectInput } from '../Shared/ButtonsAndSuch'


const Wrapper = styled.div`
   
    margin: 1rem;

`;

const StyledSelectInput = styled(SelectInput)`
    margin-bottom: 8px;

`
const ItemWrapper = styled.div`
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

const SeasonIcon = styled.img`
    height:1.5rem;
    width: auto;
    grid-column: 1/2;
    margin-right: 1rem;
    
`;
const InfoText = styled.div`
    text-align: left;
    grid-column: 2/12;
    font-size: 0.8rem;
    align-self:bottom;

    .days{
        font-weight:bold;
        margin: 0;
    }

    .adventureName{
        font-weight: normal;
        font-size: 0.8rem;
        margin: 0;
    }
  

    @media screen and (min-width: 600px){
        font-size: 1rem;
  
    }
 
`;
const WeightText = styled.p`
    grid-column: 12/15;
    margin: 0;
    font-size: 0.8rem;
    font-weight: bold;

    @media screen and (min-width: 600px){
        font-size: 1rem;
        grid-column: 13/15;
    }
`;


const PackingLists = () => {

    const allAdventures = useRecoilValue(allAdventuresState)
    const allEquipment = useRecoilValue(allEquipmentState)

    const calculatedTotalWeight = (packingList) => {
        let totalWeight = 0;
       
        packingList.forEach((listId) => {
          
            allEquipment.find((equipment) => {
               
                if (equipment._id === listId) {
                 
                    totalWeight = totalWeight+equipment.weight
                    
                }
                
            })
        })

        return totalWeight/1000
    }

 
    const calculatedIcon = (season) => {

        if (season === 'autumn') return autumnIcon;
        if (season === 'summer') return summerIcon
        if (season === 'winter') return winterIcon
        if (season === 'spring') return springIcon

    }

 
    return (
        <FrostedBackground headline={'Packlistor'}>
            <Wrapper>
                <StyledSelectInput>
                    <option>Glöm ej lägga in filtrering och sortering</option>
                </StyledSelectInput>
                {allAdventures.map((item) => {
                    return (
                        <ItemWrapper key={item._id}>

                            <SeasonIcon src={calculatedIcon(item.season)} />
                            <InfoText>
                               
                                <p className='days'>{item.days}<span> dygn</span></p>
                                <p className='adventureName'>{item.adventure}</p>
                            </InfoText>

                            <WeightText>{calculatedTotalWeight(item.packingList)}<span> kg</span></WeightText>


                        </ItemWrapper>)
                })}

            </Wrapper>

        </FrostedBackground>

    )
}

export default PackingLists