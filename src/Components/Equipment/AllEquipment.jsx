import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { allEquipmentState } from '../Shared/GlobalStates'
import Accordion from '../Shared/Accordion'
import FrostedBackground from '../Shared/FrostedBackground'
import axios from 'axios';
import styled from 'styled-components'
import spinnerDayNight from '../../Assets/animatedDayNight.gif'
import NoDataAddedYet from '../Shared/NoDataAddedYet'

import {SelectInput} from '../Shared/ButtonsAndSuch'

const Wrapper = styled.div`

    
`;
const LoadingWrapper = styled.div`
    display:grid;
    justify-content: center;
`;
const LoadingText = styled.p`
    margin-top: 2rem;
    text-align:center;
    font-weight: bold;
    margin-bottom:0;
`;
const IsLoadingSpinner = styled.img`
    height:12rem;
    width:auto;
   
`;
const ErrorInfo = styled.p`
    margin-top: 2rem;
    text-align:center;
    font-weight: bold;
    margin-bottom:0;
`;

// const Button = styled.button`
//     margin-left: 1rem;
//     padding: 0.3rem;
//     border: 2px solid orange;
//     background: none;
//     cursor: pointer;
// `;

// const FilterWrapper = styled.div` 
//     background-color: ${props => props.theme.yellow};
//     border-radius: 3px;
//     height: auto;
//     width: 60%;
//     position: absolute;
//     top: 1rem;
//     left: 0;
//     transform: ${({ toggleMenu }) => toggleMenu ? 'translateX(0)' : 'translateX(-100%)'};
//     transition: transform 0.3s ease-in-out;

// `;

// const FilterOption = styled.p`

//     margin-top:none;
//     color: ${props => props.toggleMenu ? 'black' : 'pink'};
//     transition: color 2s ease;
//     cursor: pointer;
//     margin-left: 1rem;
//     border-radius: 3px;
// `;


const StyledSelectInput = styled(SelectInput)` 
    ${'' /* margin-bottom: 0.5rem; */}
  
    margin-left: 1rem;
    width: 50%;
    option {

        &:first-child {

            color: ${props => props.theme.orange};
        }
        &:nth-child(odd){
            background-color: ${props => props.theme.grey};  
        }
    }

    @media screen and (min-width: 600px){
       
    }
`;

const AllEquipment = () => {

    const [allEquipment, setAllEquipment] = useRecoilState(allEquipmentState)

    const [filter, setFilter] = useState('')

    let filteredEquipment = allEquipment;
    
    if(filter) {
        filteredEquipment = allEquipment.filter((equipment)=> equipment.category === filter)
    }

    const [isLoading, setIsLoading] = useState(false)

    const [displayErrorInfo, setDisplayErrorInfo] = useState(false)
    const [displayNoDataInfo, setDisplayNoDataInfo] = useState(false)

    const [toggleMenu, setToggleMenu] = useState(false)

    useEffect(() => {

        getAllEquipment();
   
    }, [])
    
    const updateFilter = ({target: {value}}) => {
     
        setFilter(value);
      };

    async function getAllEquipment() {
        setIsLoading(true)
        setDisplayErrorInfo(false)

        try {
            const response = await axios.get('/api/allEquipment')
            setAllEquipment(response.data)
            setIsLoading(false)

            if (response.data.length < 1) {

                setDisplayNoDataInfo(true)
            }
        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
            setDisplayErrorInfo(true)
            setIsLoading(false)
        }
    };


    // const changeMenu = () => {
    //     setToggleMenu(!toggleMenu)

    // }


    return (

        <FrostedBackground headline={'All utrustning'} use>


            {displayErrorInfo && <ErrorInfo>Nån gick vilse. Kolla kompassen och försök igen</ErrorInfo>}

            {displayNoDataInfo && <NoDataAddedYet />}


            {isLoading && !displayNoDataInfo ?
                <LoadingWrapper>
                    <LoadingText>Hämtar all utrustning</LoadingText>
                    <IsLoadingSpinner src={spinnerDayNight} alt="loading..." />
                </LoadingWrapper> :

                <Wrapper>

                <StyledSelectInput
                    name="category"
                    id="category"
                    type='text'
                    value={filter} 
                    onChange={updateFilter}
                  > 
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
                    {/* <Button onClick={changeMenu}>Filter</Button>
            
                    <FilterWrapper toggleMenu={toggleMenu}>

         
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('boende')}>Boende</FilterOption>
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('clothes')}>Kläder</FilterOption>
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('sleeping')}>Sova</FilterOption>
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('fun')}>Nöje</FilterOption>
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('cooking')}>Matlagning</FilterOption>
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('electronics')}>Elektronik</FilterOption>
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('hyg')}>Hygien</FilterOption>
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('boende')}>Bära/förvaring</FilterOption>
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('boende')}>Övrigt</FilterOption>

                    </FilterWrapper> */}
                    <Accordion equipmentList={filteredEquipment} />
                </Wrapper>}

        </FrostedBackground>


    )
}

export default AllEquipment