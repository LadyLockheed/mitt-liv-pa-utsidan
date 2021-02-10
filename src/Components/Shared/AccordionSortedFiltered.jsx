import React, { useState } from 'react'
import styled from 'styled-components'
import Accordion from './Accordion'
import { SelectInput } from './ButtonsAndSuch'
import searchIcon from '../../Assets/search.svg'


const StyledWrapper = styled.div`
    padding: 0 1rem 1rem 1rem;

`;

const SearchWrapper = styled.div`
    border-bottom: 1px solid ${props => props.theme.black};
    margin-bottom: 0.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
    display:flex;
    align-items: center;
`;
const SearchIcon = styled.img`
   
    height: 1rem;
    width: auto;
    padding: 0.5rem;
    border-radius: 10px;
    cursor:pointer;

`;

const SearchField = styled.input`
    background: rgba(255,255,255,0.001);
    outline:none;
    border: none;
    padding: 0.5rem;
    width: 100%;

  
`;
const WrapperSelectInput = styled.div`

    display:grid;
    grid-template-columns: 1fr;

    .categorySelect{
       margin-top:0;
      
    }
    .sortingSelect{
        margin-bottom: 8px;
        
    }
    
    @media screen and (min-width: 600px){
        grid-template-columns: 1fr 1fr;

        .categorySelect{
            margin-bottom: 8px;
            margin-right: 1rem;
        }
        .sortingSelect{
            margin-bottom: 8px;
            margin-left: 1rem;
        }

    }
`;


const AccordionSortedFiltered = (props) => {

    const { equipmentList, displayDotOrBox, packingList, setPackingList, totalWeight, setTotalWeight } = props;

    const [filter, setFilter] = useState('')
    const [sorting, setSorting] = useState('')
    const [searchParam, setSearchParam]=useState('')

    let filteredEquipment = equipmentList;
    const updateFilter = ({ target: { value } }) => {

        setFilter(value);
    };

    const updateSorting = ({ target: { value } }) => {

        setSorting(value);
    };

    if (searchParam || filter || sorting ) {

        if(searchParam){
            filteredEquipment = filteredEquipment.filter(equipment =>{
                return(
                    equipment.equipment.toLowerCase().includes(searchParam.toLowerCase())
                )
            })
        }

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
        <StyledWrapper>
            <SearchWrapper>
                <SearchIcon src={searchIcon} />
                <SearchField
                   
                    type='text'
                    name='search'
                    id='search'
                    value={searchParam}
                    onChange={(event)=> setSearchParam(event.target.value)}
                />
            </SearchWrapper>
            <WrapperSelectInput>
                <SelectInput
                    className='categorySelect'
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

                </SelectInput>

                <SelectInput
                    className='sortingSelect'
                    name="category"
                    id="category"
                    type='text'
                    value={sorting}
                    onChange={updateSorting}>

                    <option value=''>Sortera</option>
                    <option value=''>Senast tillagd</option>
                    <option value="highest">Högsta vikt</option>
                    <option value="lowest">Lägsta vikt</option>

                </SelectInput>

            </WrapperSelectInput>
            <Accordion
                equipmentList={filteredEquipment}
                displayDotOrBox={displayDotOrBox}
                packingList={packingList}
                setPackingList={setPackingList}
                totalWeight={totalWeight}
                setTotalWeight={setTotalWeight}
            />


        </StyledWrapper>
    )

}



export default AccordionSortedFiltered