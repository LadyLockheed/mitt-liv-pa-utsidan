import React, { useEffect, useState } from 'react'
import { allAdventuresState, allEquipmentState } from '../../Shared/GlobalStates';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components'
import autumnIcon from '../../../Assets/autumnLeafIcon.svg'
import summerIcon from '../../../Assets/summerSunIcon.svg'
import winterIcon from '../../../Assets/winterSnowFlaceIcon.svg'
import springIcon from '../../../Assets/springBranchIcon.svg'
import { SelectInput } from '../../Shared/ButtonsAndSuch'



const Wrapper = styled.div`
   
    margin: 1rem;
    border-radius: 3px;
    max-height: 60vh;
    overflow:scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }

`;

const WrapperSelectInput = styled.div`

    display:grid;
    grid-template-columns: 1fr;

    .seasonSelect{
       margin-top:0;
      
    }
    .daysSelect{
        margin-bottom: 8px;
        
    }
    
    @media screen and (min-width: 600px){
        grid-template-columns: 1fr 1fr;

        .seasonSelect{
            margin-bottom: 8px;
            margin-right: 1rem;
        }
        .daysSelect{
            margin-bottom: 8px;
            margin-left: 1rem;
        }

    }
`;

const StyledSelectInput = styled(SelectInput)`

    margin-left:1rem;
    margin-right: 1rem;

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


const AllPackingLists = (props) => {

    const { setDisplayAllPackingLists, setSpecificPackingList, setPackingList, creatingPackingList } = props;

    const allAdventures = useRecoilValue(allAdventuresState)
    const allEquipment = useRecoilValue(allEquipmentState)
    const [filter, setFilter] = useState('')
    const [sorting, setSorting] = useState('')
    let filteredAdventures = allAdventures;

    //kollar om setPackingList-prop skickats in i komponenten. Förhindrar att AllpackingList kraschar när man klickar på en packlista och setPackingList-propsen inte finns.
    const handleSetPackingList = (packingList)=>{
        
        if (creatingPackingList){

            setPackingList(packingList)
        }
        else{
           return
        }
    }

    useEffect(()=>{
       
    },[filter, sorting])

    const updateFilter = ({ target: { value } }) => {

        setFilter(value);
    };

    const updateSorting = ({ target: { value } }) => {

        setSorting(value);
    };

    if (filter || sorting) {

        if (filter) {

            filteredAdventures = filteredAdventures.filter((adventure) => adventure.season === filter)
        }
        if (sorting) {
            
            if (sorting === 'longest') {
                filteredAdventures = [...filteredAdventures].sort((a, b) => {
                    return b.days - a.days
                })
            }
            if (sorting === 'shortest') {
                filteredAdventures = [...filteredAdventures].sort((a, b) => {
                    return a.days - b.days
                })
            }

        }

    }

    const calculatedTotalWeight = (packingList) => {
        let totalWeight = 0;

        packingList.forEach((listId) => {

            allEquipment.find((equipment) => {

                if (equipment._id === listId) {

                    totalWeight = totalWeight + equipment.weight

                }

            })
        })

        return totalWeight / 1000
    }

    const calculatedIcon = (season) => {

        if (season === 'autumn') return autumnIcon;
        if (season === 'summer') return summerIcon
        if (season === 'winter') return winterIcon
        if (season === 'spring') return springIcon

    }


    return (
        // <FrostedBackground headline={'Packlistor'}>
        <>
    <WrapperSelectInput>
            <StyledSelectInput
                className='seasonSelect'
                name="season"
                id="season"
                type='text'
                value={filter}
                onChange={updateFilter}
            >
                <option value=''>Årstid</option>
                <option value=''>Alla</option>
                <option value='summer'>Sommar</option>
                <option value='autumn'>Höst</option>
                <option value='winter'>Vinter</option>
                <option value='spring'>Vår</option>
            </StyledSelectInput>

            <StyledSelectInput
                className='daysSelect'
                name="days"
                id="days"
                type='text'
                value={sorting}
                onChange={updateSorting}
            >
                <option value=''>Antal dygn</option>
                <option value=''>Senast tillagd</option>
                <option value="longest">Längst tid</option>
                <option value="shortest">Kortast tid</option>
            </StyledSelectInput>

            </WrapperSelectInput>

            <Wrapper>

                {filteredAdventures.map((item) => {
                    return (
                        <ItemWrapper 
                        key={item._id} 
                        onClick={() => { 
                            setDisplayAllPackingLists(false); 
                            // setPackingList(item.packingList);
                            handleSetPackingList(item.packingList) ;
                            setSpecificPackingList({ item: item, totalWeight: calculatedTotalWeight(item.packingList) }) }}>

                            <SeasonIcon src={calculatedIcon(item.season)} />
                            <InfoText>
                                <p className='days'>{item.days}<span> dygn</span></p>
                                <p className='adventureName'>{item.adventure}</p>
                            </InfoText>

                            <WeightText>{calculatedTotalWeight(item.packingList)}<span> kg</span></WeightText>


                        </ItemWrapper>)
                })}

            </Wrapper>
            </>

        // </FrostedBackground >

    )
}

export default AllPackingLists