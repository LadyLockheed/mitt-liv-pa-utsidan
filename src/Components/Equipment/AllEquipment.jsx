import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import Accordion from '../Shared/Accordion'
import FrostedBackground from '../Shared/FrostedBackground'
import axios from 'axios';
import styled from 'styled-components'
import spinnerDayNight from '../../Assets/animatedDayNight.gif'


const LoadingWrapper = styled.div `
   
    display:grid;
    justify-content: center;

`;
const LoadingText = styled.p`
    margin-top: 2rem;
    text-align:center;
    font-weight: bold;
    margin-bottom:0;

`; 
const IsLoadingSpinner = styled.img `
 
    height:12rem;
    width:auto;
   

`;

const ErrorInfo = styled.p `
    margin-top: 2rem;
    text-align:center;
    font-weight: bold;
    margin-bottom:0;
`;




const AllEquipment=()=>{
   //Här ska jag på nåt sätt ta in allEquipment, antingen från global states 
   //eller så görs fetchen här.

    useEffect(()=>{
        
        getAllEquipment();
      
    },[])

    async function getAllEquipment() {
        setIsLoading(true)
        setDisplayErrorInfo(false)
        await axios.get('/api/allEquipment')
        .then(res => {

            setAllEquipment(res.data)
            setIsLoading(false)
        })
        .catch(err => {
            console.log('Something went wrong', err)
            setDisplayErrorInfo(true)
        })
    };

    // const [allEquipment, setAllEquipment]=useRecoilState(AllEquipment)
    //denna ska bytas ut mot nåt från recoil
    const [allEquipment, setAllEquipment] = useState([])
  
    const [isLoading, setIsLoading] = useState(false)

    const [displayErrorInfo, setDisplayErrorInfo] = useState(false)
    
   
    return(
       
        <FrostedBackground headline={'All utrustning'}>

            {displayErrorInfo && <ErrorInfo>Nån gick vilse. Kolla kompassen och försök igen</ErrorInfo>}

            {isLoading ? 
            <LoadingWrapper> 
                <LoadingText>Hämtar all utrustning</LoadingText>
                <IsLoadingSpinner src={spinnerDayNight} alt="loading..."/>
            </LoadingWrapper> :
            <Accordion equipmentList={allEquipment}/> }

        </FrostedBackground>
        
        
    )
}

export default AllEquipment