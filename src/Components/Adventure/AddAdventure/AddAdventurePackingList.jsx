import React from 'react'
import styled from 'styled-components'

//globalstates
import { useRecoilValue } from 'recoil'
import { allEquipmentState } from '../../Shared/GlobalStates'

//components
import AccordionSortedFiltered from '../../Shared/AccordionSortedFiltered'
import FrostedBackground from '../../Shared/FrostedBackground'
import { Button, SecondaryButton } from '../../Shared/ButtonsAndSuch'

import arrowBackwardIcon from '../../../Assets/backArrowBlack.svg'


const SubmitButton = styled(Button)`
    display:block;
    margin:auto;
    margin-bottom: 2rem;

`;

const SecondaryOptionButton = styled(SecondaryButton)`
    color: ${props => props.theme.black};
    font-weight: bold;
    display:block;
    margin:auto;
    margin-bottom: 1rem;
 
`

const ArrowIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;

`;

const WeightWrapper = styled.div`
    display:grid;
    justify-content: end;
    margin-bottom: 0;

`;
const Weight = styled.p`
    color: ${props => props.theme.white};
    display:inline-block;
    margin-right: 1.5rem;
    margin-top: 0;
    text-align: right;


   @media screen and (min-width: 600px){
        margin-bottom: 0;
   }

   
`;


const AddAdventurePackingList = (props) => {

    const { packingList, setPackingList, submitFunction, setDisplayForm, totalWeight,
        setTotalWeight, setDisplayPackingLists, submitButtonText } = props

    const allEquipment = useRecoilValue(allEquipmentState)
  

    return (

        <FrostedBackground headline={'Dags att packa'}>
       
            <SecondaryOptionButton onClick={() => setDisplayPackingLists(true)}>Välj en färdig lista</SecondaryOptionButton>

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

            <SecondaryOptionButton onClick={() => setDisplayForm(true)}><ArrowIcon src={arrowBackwardIcon} />Tillbaka</SecondaryOptionButton>

            <SubmitButton onClick={submitFunction}>{submitButtonText}</SubmitButton>



        </FrostedBackground>
    )
}

export default AddAdventurePackingList