import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { allEquipmentState } from '../Shared/GlobalStates'
import Accordion from '../Shared/Accordion'
import FrostedBackground from '../Shared/FrostedBackground'
import axios from 'axios';
import styled from 'styled-components'
import spinnerDayNight from '../../Assets/animatedDayNight.gif'
import NoDataAddedYet from '../Shared/NoDataAddedYet'


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



const AllEquipment = () => {

    useEffect(() => {

        getAllEquipment();
       
       

    }, [])

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
    //lägger upp allEquipment i globalstate. 
    //TODO Flytta denna så att allequipment hämtas vid login istället
    // const allEquipment = useRecoilValue(allEquipmentState)
    const [allEquipment, setAllEquipment] = useRecoilState(allEquipmentState)

    // const [filteredEquipmentList, setFilteredEquipmentList] = useState([])
 
    const [isLoading, setIsLoading] = useState(false)

    const [displayErrorInfo, setDisplayErrorInfo] = useState(false)
    const [displayNoDataInfo, setDisplayNoDataInfo] = useState(false)

    const [toggleMenu, setToggleMenu] = useState(false)


    const changeMenu = () => {
        setToggleMenu(!toggleMenu)

    }



    // const filterFunc = (filter) => {
    //    //TODO funkar ej pga att hela listan sätts om till endast det som passar filter (kategori) och sen går det inte att filtrer mer
    //     setFilteredEquipmentList(filteredEquipmentList.filter( equipment => equipment.category === filter))
    //             console.log('i filter functionen :',filteredEquipmentList)

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
                    <Accordion equipmentList={allEquipment} />
                </Wrapper>}

        </FrostedBackground>


    )
}

export default AllEquipment