import React from 'react'
import styled from 'styled-components'
import FrostedBackground from '../../Shared/FrostedBackground'
import { useRecoilValue } from 'recoil';
import { allEquipmentState } from '../../Shared/GlobalStates'
import AccordionSortedFiltered from '../../Shared/AccordionSortedFiltered'
import backArrowBlack from '../../../Assets/backArrowBlack.svg'
import { SecondaryButton } from '../../Shared/ButtonsAndSuch'

const StyledGoBackButton = styled(SecondaryButton)`
    display: block;
    margin: auto;
    margin-bottom: 16px;
    color: ${props => props.theme.black};
 
`;
const StyledArrowIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
`;


const SpecificPackingList = (props) => {

    const { setDisplayAllPackingLists, specificPackingList } = props;
    const { item, totalWeight } = specificPackingList;
    const allEquipment = useRecoilValue(allEquipmentState)
    const packingListArray = item.packingList;

    let packingListEquipment = [];

    packingListArray.forEach((listId) => {
        allEquipment.find((equipment) => {
            if (equipment._id === listId) {

                packingListEquipment.push(equipment)


            }

        })
    })

    return (

        <FrostedBackground headline={`Packlista, totalt ${totalWeight}kg`}>
            <AccordionSortedFiltered
                equipmentList={packingListEquipment}
                displayDotOrBox={'dot'}
            />

            <StyledGoBackButton onClick={() => setDisplayAllPackingLists(true)}>
                <StyledArrowIcon src={backArrowBlack} />Tillbaka
                </StyledGoBackButton>
         
        </FrostedBackground>

    )
}

export default SpecificPackingList