import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { allEquipmentState, allAdventuresState } from '../Shared/GlobalStates'

import AccordionSortedFiltered from '../Shared/AccordionSortedFiltered'
import FrostedBackground from '../Shared/FrostedBackground'
import axios from 'axios';
import styled from 'styled-components'
import spinnerDayNight from '../../Assets/animatedDayNight.gif'
import SpinnerFireLog from '../Shared/SpinnerFireLog'


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


const AllEquipment = () => {

    const [allEquipment, setAllEquipment] = useRecoilState(allEquipmentState)
    const setAllAdventures = useSetRecoilState(allAdventuresState)

    const [isLoading, setIsLoading] = useState(false)
    const [displayErrorInfo, setDisplayErrorInfo] = useState(false)
    const [displayNoDataInfo, setDisplayNoDataInfo] = useState(false)

    useEffect(() => {

        getAllEquipment();
        getAllAdventures();

    }, [])

    async function getAllEquipment() {
        setIsLoading(true)
        setDisplayErrorInfo(false)

        try {
            const response = await axios.get('/api/allEquipment')
            setAllEquipment(response.data)
            console.log('response equipment: ', response.data)
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

    async function getAllAdventures() {
        // setIsLoading(true)
        // setDisplayErrorInfo(false)

        try {
            const response = await axios.get('/api/allAdventures')
            setAllAdventures(response.data)
            console.log('response adventure: ', response.data)
            // setIsLoading(false)

            // if (response.data.length < 1) {

            //     setDisplayNoDataInfo(true)
            // }
        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
            setDisplayErrorInfo(true)
            setIsLoading(false)
        }
    };


    return (

        <FrostedBackground headline={'All utrustning'} use>

            {displayErrorInfo && <ErrorInfo>Nån gick vilse. Kolla kompassen och försök igen</ErrorInfo>}

            {displayNoDataInfo && <SpinnerFireLog text={'Inget tillagt än'} />}

            {isLoading && !displayNoDataInfo && !displayErrorInfo &&
                <LoadingWrapper>
                    <LoadingText>Hämtar all utrustning</LoadingText>
                    <IsLoadingSpinner src={spinnerDayNight} alt="loading..." />
                </LoadingWrapper>}

            {!isLoading && !displayNoDataInfo && <Wrapper>

                <AccordionSortedFiltered equipmentList={allEquipment} displayDotOrBox={'dot'} />

            </Wrapper>}


        </FrostedBackground>


    )
}

export default AllEquipment