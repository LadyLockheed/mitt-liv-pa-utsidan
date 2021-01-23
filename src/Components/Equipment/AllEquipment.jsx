import React, { useEffect, useState } from 'react'
// import { useRecoilState, useSetRecoilState } from 'recoil';
import Accordion from '../Shared/Accordion'
import FrostedBackground from '../Shared/FrostedBackground'
import axios from 'axios';
import styled from 'styled-components'
import spinnerDayNight from '../../Assets/animatedDayNight.gif'
import NoDataAddedYet from '../Shared/NoDataAddedYet'


const Wrapper = styled.div`
    position: relative;
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

const Button = styled.button`

`;

const FilterWrapper = styled.div` 
    background-color: ${props => props.theme.yellow};
    border-radius: 3px;
    height: auto;
    width: 60%;
    position: absolute;
    top: 1rem;
    left: 0;
    transform: ${({ toggleMenu }) => toggleMenu ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
   
`;

const FilterOption = styled.p`
    ${'' /* visibility: ${props => props.toggleMenu ? 'visible' : 'hidden'}; */}
    margin-top:none;
    color: ${props => props.toggleMenu ? 'black' : 'pink'};
    transition: color 2s ease;
    cursor: pointer;
    margin-left: 1rem;
    border-radius: 3px;
`;

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
            setFilteredEquipmentList(response.data)
            setIsLoading(false)
            console.log('equipmentlist: ', response.data)
            if(response.data.length < 1){
                console.log('ingen data')
                setDisplayNoDataInfo(true)
            }
        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
            setDisplayErrorInfo(true)
            setIsLoading(false)
        }
    };

    const [allEquipment, setAllEquipment] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const [displayErrorInfo, setDisplayErrorInfo] = useState(false)
    const [displayNoDataInfo, setDisplayNoDataInfo] = useState(false)

    const [toggleMenu, setToggleMenu] = useState(false)

    const [filteredEquipmentList, setFilteredEquipmentList] = useState([])
    const changeMenu = () => {
        setToggleMenu(!toggleMenu)

    }



    const filterFunc = (filter) => {
        console.log('filter: ', filter)

    }

    const categories = [
        {
            categoryName: 'boende',
            isActive: false
        },
        {
            categoryName: 'kläder',
            isActive: false
        },
        {
            categoryName: 'sova',
            isActive: false
        },
        {
            categoryName: 'Nöje',
            isActive: false
        },
        {
            categoryName: 'Matlagning',
            isActive: false
        },
        {
            categoryName: 'Elektronik',
            isActive: false
        },
        {
            categoryName: 'Hygien',
            isActive: false
        },
        {
            categoryName: 'Bära/förvaring',
            isActive: false
        },
        {
            category: 'Övrigt',
            isActive: false
        },
    ]


    return (

        <FrostedBackground headline={'All utrustning'}>


            {displayErrorInfo && <ErrorInfo>Nån gick vilse. Kolla kompassen och försök igen</ErrorInfo>}
            {displayNoDataInfo && <NoDataAddedYet/>}

            

            {isLoading && !displayNoDataInfo ?
                <LoadingWrapper>
                    <LoadingText>Hämtar all utrustning</LoadingText>
                    <IsLoadingSpinner src={spinnerDayNight} alt="loading..." />
                </LoadingWrapper> :

                <Wrapper>
                    <Button onClick={changeMenu}>Filter</Button>
                    <FilterWrapper toggleMenu={toggleMenu}>

                        {/* {categories.map((category, index)=>{
                            <FilterOption 
                                key = {category.categoryName + index} 
                                toggleMenu = {toggleMenu} 
                                onClick = {() => filterFunc({category})}>{category.categoryName}
                            </FilterOption>    
                        })} */}
                        <FilterOption toggleMenu={toggleMenu} onClick={() => filterFunc('boende')}>Boende</FilterOption>
                        <FilterOption toggleMenu={toggleMenu}>Kläder</FilterOption>
                        <FilterOption toggleMenu={toggleMenu}>Sova</FilterOption>
                        <FilterOption toggleMenu={toggleMenu}>Nöje</FilterOption>
                        <FilterOption toggleMenu={toggleMenu}>Matlagning</FilterOption>
                        <FilterOption toggleMenu={toggleMenu}>Elektronik</FilterOption>
                        <FilterOption toggleMenu={toggleMenu}>Hygien</FilterOption>
                        <FilterOption toggleMenu={toggleMenu}>Bära/förvaring</FilterOption>
                        <FilterOption toggleMenu={toggleMenu}>Övrigt</FilterOption>

                    </FilterWrapper>
                    <Accordion equipmentList={filteredEquipmentList} />
                </Wrapper>}

        </FrostedBackground>


    )
}

export default AllEquipment