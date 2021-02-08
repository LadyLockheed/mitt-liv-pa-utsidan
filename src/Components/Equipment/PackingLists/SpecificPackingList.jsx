import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil';
import { allEquipmentState } from '../../Shared/GlobalStates'
import AccordionSortedFiltered from '../../Shared/AccordionSortedFiltered'
import backArrowBlack from '../../../Assets/backArrowBlack.svg'
import { SecondaryButton } from '../../Shared/ButtonsAndSuch'

const StyledGoBackButton = styled(SecondaryButton)`
    display: block;
    font-weight: bold;
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

    const { setDisplayAllPackingLists, specificPackingList, setPackingList } = props;
    const { item } = specificPackingList;

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

        <>
            <AccordionSortedFiltered
                equipmentList={packingListEquipment}
                displayDotOrBox={'dot'}
            />

            <StyledGoBackButton onClick={() => setDisplayAllPackingLists(true)}>
                <StyledArrowIcon src={backArrowBlack} />Tillbaka
                </StyledGoBackButton>

                {/* <button onClick={()=>setPackingList(packingListArray)}>Välj denna lista och avsluta</button> */}
         </>

    )
}

export default SpecificPackingList