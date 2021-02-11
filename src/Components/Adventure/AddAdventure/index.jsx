import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

//globalstates
import { useSetRecoilState } from 'recoil'
import { allAdventuresState } from '../../Shared/GlobalStates'

//components
import AddAdventureForm from './AddAdventureForm'
import FrostedBackground from '../../Shared/FrostedBackground'
import AddAdventurePackingList from './AddAdventurePackingList'
import Spinner from '../../Shared/Spinner'
import PackingLists from '../../Equipment/PackingLists/index'

import {Button, SecondaryButton} from '../../Shared/ButtonsAndSuch'
import arrowBackwardIcon from '../../../Assets/backArrowBlack.svg'

const StyledSecondaryButton = styled(SecondaryButton) `
    color: ${props => props.theme.black};
    font-weight: bold;
    display:block;
    margin:auto;
    margin-bottom: 2rem;
`;
const ArrowIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;

`;

const StyledButton = styled(Button)`
    display:block;
    margin:auto;
    margin-bottom: 2rem;

`;
const AddAdventure = () => {

    const setAllAdventures = useSetRecoilState(allAdventuresState)

    const [displayForm, setDisplayForm] = useState(true)
    const [displayPackingLists, setDisplayPackingLists] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newAdventureInfo, setNewAdventureInfo] = useState({})
    const [totalWeight, setTotalWeight] = useState(0)
    const [packingList, setPackingList] = useState([])
    const [submitButtonText, setSubmitButtonText]=useState('Skapa äventyr')
    let newAdventure = newAdventureInfo

    const history = useHistory()

    const GoBackButton = () => {
        return (
            <StyledSecondaryButton onClick={() => { setDisplayPackingLists(false); setPackingList([]); setTotalWeight(0); setSubmitButtonText('Skapa äventyr') }}><ArrowIcon src = {arrowBackwardIcon}/>Tillbaka</StyledSecondaryButton>
        )
    }

    const SubmitButton = () => {
        return (
            <StyledButton onClick={() => { setDisplayPackingLists(false); handleCreateNewAdventure() }}>Skapa äventyr</StyledButton>
        )
    }

    const handleCreateNewAdventure = () => {
       
        if (packingList.length === 0) {
           
            setSubmitButtonText('Glöm ej packlistan')
            return
        }
        else {
            
            setIsLoading(true)
            newAdventure = { ...newAdventureInfo, packingList: packingList }
            addNewAdventure()

        }

    }

    async function addNewAdventure() {

        try {
            const responseAddNewAdventure = await axios.post('/api/addNewAdventure', { newAdventure })
            
            if (responseAddNewAdventure) {

                getAllAdventures()
            }
            else {
                console.log('nånting gick fel nånstans')
            }

        }
        catch (err) {
            console.log('Something went wrong ', err)
        }
    }

    async function getAllAdventures() {

        try {
            const response = await axios.get('/api/allAdventures')
            setAllAdventures(response.data)
            setIsLoading(false)
          
            history.push("/alladventures")

        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)

        }
    };


    return (
        <>

            {displayForm && !isLoading &&

                <AddAdventureForm
                    setDisplayForm={setDisplayForm}
                    setNewAdventureInfo={setNewAdventureInfo}
                    newAdventureInfo={newAdventureInfo} 
                    
                />
            }

            {!displayForm && !isLoading && !displayPackingLists &&

                <AddAdventurePackingList
                    packingList={packingList}
                    setPackingList={setPackingList}
                    submitFunction={handleCreateNewAdventure}
                    setDisplayForm={setDisplayForm}
                    totalWeight={totalWeight}
                    setTotalWeight={setTotalWeight}
                    setDisplayPackingLists={setDisplayPackingLists}
                    submitButtonText = {submitButtonText}
                />

            }

            {!displayForm && !isLoading && displayPackingLists &&
                <PackingLists
                    setPackingList={setPackingList}
                    GoBackButton={GoBackButton}
                    SubmitButton={SubmitButton}
                    creatingPackingList={true}
                />
            }


            {isLoading &&
                <FrostedBackground><Spinner spinnerMessage={'sparar äventyret...'} /></FrostedBackground>
            }


        </>
    )
}

export default AddAdventure

