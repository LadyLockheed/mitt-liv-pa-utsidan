import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil';
import { allEquipmentState } from '../../Shared/GlobalStates'
import Accordion from '../../Shared/Accordion'

const Wrapper = styled.div`
    border: 1px solid black;
    width: 20rem;
    height: 20rem;
    background-color: ${props => props.theme.green};
    margin:auto;


`;


const SpecificAdventure = (props) => {

    const { setDisplayAllAdventures, specificAdventure } = props;
    const allEquipment = useRecoilValue(allEquipmentState)
    const packingListArray = specificAdventure.packingList

    let packingListEquipment = [];

    packingListArray.forEach((listId) => {
        allEquipment.find((equipment) => {
            if (equipment._id === listId) {
                packingListEquipment.push(equipment)
            }
        })
    })

    console.log(packingListEquipment)



    return (

        <Wrapper>
            <p>{specificAdventure.adventure}</p>
            <p>{specificAdventure.dateStarting}</p>
            <p>{specificAdventure.season}</p>
            <Accordion
                equipmentList={packingListEquipment}
                displayDotOrBox={'dot'} 

                />

            <button onClick={() => setDisplayAllAdventures(true)}>Gå tillbaka</button>

        </Wrapper>
    )
}

export default SpecificAdventure