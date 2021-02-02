import React, { useState } from 'react'
import styled from 'styled-components'
import Accordion from './Accordion'
import { SelectInput } from './ButtonsAndSuch'


const WrapperSelectInput = styled.div`

    display:grid;
    grid-template-columns: 1fr;
    
    @media screen and (min-width: 600px){
        grid-template-columns: 1fr 1fr;

    }
`;
const StyledSelectInput = styled(SelectInput)` 
    margin-left:1rem;
    margin-right: 1rem;


`;


const AccordionSortedFiltered = (props) => {

    // const { equipmentList, displayDotOrBox, packingList, setPackingList } = props;
    const { equipmentList, displayDotOrBox, packingList, setPackingList, totalWeight, setTotalWeight } = props;

    const [filter, setFilter] = useState('')
    const [sorting, setSorting] = useState('')

    let filteredEquipment = equipmentList;
    const updateFilter = ({ target: { value } }) => {

        setFilter(value);
    };

    const updateSorting = ({ target: { value } }) => {

        setSorting(value);
    };

    if (filter || sorting) {

        if (filter) {

            filteredEquipment = filteredEquipment.filter((equipment) => equipment.category === filter)
        }
        if (sorting) {

            if (sorting === 'highest') {
                filteredEquipment = [...filteredEquipment].sort((a, b) => {
                    return b.weight - a.weight
                })
            }
            if (sorting === 'lowest') {
                filteredEquipment = [...filteredEquipment].sort((a, b) => {
                    return a.weight - b.weight
                })
            }

        }

    }

    return (
        <>
            <WrapperSelectInput>
                <StyledSelectInput
                    name="category"
                    id="category"
                    type='text'
                    value={filter}
                    onChange={updateFilter}>

                    <option value=''>Välj kategori</option>
                    <option value=''>Allt</option>
                    <option value="living">Boende</option>
                    <option value="storage">Bära/Förvaring</option>
                    <option value="sleeping">Sova</option>
                    <option value="clothes">Kläder</option>
                    <option value="electronics">Elektronik</option>
                    <option value="fun">Nöje</option>
                    <option value="cooking">Laga mat</option>
                    <option value="hygiene">Hygien</option>
                    <option value="other">Övrigt</option>

                </StyledSelectInput>

                <StyledSelectInput
                    name="category"
                    id="category"
                    type='text'
                    value={sorting}
                    onChange={updateSorting}>

                    <option value=''>Sortera</option>
                    <option value=''>Senast tillagd</option>
                    <option value="highest">Högsta vikt</option>
                    <option value="lowest">Lägsta vikt</option>

                </StyledSelectInput>

            </WrapperSelectInput>
            <Accordion
                equipmentList={filteredEquipment}
                displayDotOrBox={displayDotOrBox}
                packingList={packingList}
                setPackingList={setPackingList}
                totalWeight={totalWeight}
                setTotalWeight={setTotalWeight}
            />


        </>
    )

}



export default AccordionSortedFiltered