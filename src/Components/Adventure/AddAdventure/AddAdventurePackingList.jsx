import React from 'react'
import styled from 'styled-components'

//globalstates
import { useRecoilValue } from 'recoil'
import { allEquipmentState } from '../../Shared/GlobalStates'

//components
import AccordionSortedFiltered from '../../Shared/AccordionSortedFiltered'
import FrostedBackground from '../../Shared/FrostedBackground'
import {Button, SecondaryButton} from '../../Shared/ButtonsAndSuch'

import arrowBackwardIcon from '../../../Assets/backArrowBlack.svg'


const SubmitButton = styled(Button)`
    display:block;
    margin:auto;
    margin-bottom: 1rem;
`;

const SecondaryOptionButton = styled(SecondaryButton)`
    color: ${props => props.theme.black};
    font-weight: bold;
    display:block;
    margin:auto;
    margin-bottom: 2rem;
`

const ArrowIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;

`;

const WeightWrapper = styled.div`

    ${'' /* width: 7rem; */}
    ${'' /* border-radius: 50px; */}
    ${'' /* background-color: ${props => props.theme.black}; */}
    display:grid;
    justify-content: end;
`;
const Weight = styled.p`
    color: ${props => props.theme.white};
    display:inline-block;
    margin: 1rem;
    margin-right: 1.5rem;
    margin-top: 0;
   text-align: right;

 
   
`;


const AddAdventurePackingList = (props) => {

    const { packingList, setPackingList, submitFunction, setDisplayForm, totalWeight,
    setTotalWeight} = props

    const allEquipment = useRecoilValue(allEquipmentState)
    // const [totalWeight, setTotalWeight] = useState(0)

    return (

        <FrostedBackground headline={'Dags att packa'}>
            {/* 
        <SecondaryOptionButton onClick={() => setDisplayPackingLists(true)}>Välj en färdig lista</SecondaryOptionButton> */}

            <SecondaryOptionButton>Välj en färdig lista</SecondaryOptionButton>

            <AccordionSortedFiltered
                equipmentList={allEquipment}
                displayDotOrBox={'box'}
                packingList={packingList}
                setPackingList={setPackingList}
                totalWeight={totalWeight}
                setTotalWeight={setTotalWeight}

            />
            <WeightWrapper>
                <Weight> Total vikt <br /> {totalWeight / 1000} kg</Weight>

            </WeightWrapper>

            <SubmitButton onClick={submitFunction}>Skapa äventyr</SubmitButton>

            <SecondaryOptionButton onClick={() => setDisplayForm(true)}><ArrowIcon src={arrowBackwardIcon} />Tillbaka</SecondaryOptionButton>

            {/* <p>Vikt</p> */}
        </FrostedBackground>
    )
}

export default AddAdventurePackingList