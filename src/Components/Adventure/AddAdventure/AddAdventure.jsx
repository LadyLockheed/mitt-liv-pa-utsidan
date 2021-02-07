import React, { useState } from 'react'
import AddAdventureForm from './AddAdventureForm'
// import PackingListsOnly from '../../Shared/PackingListsOnly'
import styled from 'styled-components'
import FrostedBackground from '../../Shared/FrostedBackground'
import AccordionSortedFiltered from '../../Shared/AccordionSortedFiltered'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { allEquipmentState, allAdventuresState } from '../../Shared/GlobalStates'
import { Button, SecondaryButton } from '../../Shared/ButtonsAndSuch'
import axios from 'axios'
import Spinner from '../../Shared/Spinner'
import { useHistory } from 'react-router-dom'

import arrowBackwardIcon from '../../../Assets/backArrowBlack.svg'


const SubmitButton = styled(Button)`
    display:block;
    margin:auto;
    margin-bottom: 1rem;
`;

const SecondaryOptionButton = styled(SecondaryButton)`
    color: ${props => props.theme.black};
    font-weight: bold;
    display:block;
    margin:auto;
    margin-bottom: 2rem;
`

const ArrowIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;

`;

const WeightWrapper = styled.div`

    ${'' /* width: 7rem; */}
    ${'' /* border-radius: 50px; */}
    ${'' /* background-color: ${props => props.theme.black}; */}
    display:grid;
    justify-content: end;
`;
const Weight = styled.p`
    color: ${props => props.theme.white};
    display:inline-block;
    margin: 1rem;
    margin-right: 1.5rem;
    margin-top: 0;
   text-align: right;

 
   
`;

const AddAdventure = () => {

    const [displayForm, setDisplayForm] = useState(true)
    // const [displayPackingLists, setDisplayPackingLists] = useState(false)
    const [newAdventureInfo, setNewAdventureInfo] = useState({})
    const allEquipment = useRecoilValue(allEquipmentState)
    const setAllAdventures = useSetRecoilState(allAdventuresState)

    const [packingList, setPackingList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const [totalWeight, setTotalWeight] = useState(0)

    let newAdventure = newAdventureInfo
    const handleCreateNewAdventure = () => {

        if (packingList.length < 0) {
            console.log('Validering som säger att den inte innehåller nåt. ')
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
            console.log('resonse frontend efter att ha addat: ', responseAddNewAdventure)
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
            //TODO använd history och skicka vidare till specifikt äventyr, nu skickar den till alla äventyr

            history.push("/alladventures")

        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)

        }
    };


    return (
        <>

            {displayForm && !isLoading &&
                <AddAdventureForm setDisplayForm={setDisplayForm} setNewAdventureInfo={setNewAdventureInfo} newAdventureInfo={newAdventureInfo} />}

            {!displayForm && !isLoading &&
                <FrostedBackground headline={'Dags att packa'}>
                    {/* 
                    <SecondaryOptionButton onClick={() => setDisplayPackingLists(true)}>Välj en färdig lista</SecondaryOptionButton> */}

                    <SecondaryOptionButton>Välj en färdig lista</SecondaryOptionButton>

                    <AccordionSortedFiltered
                        equipmentList={allEquipment}
                        displayDotOrBox={'box'}
                        packingList={packingList}
                        setPackingList={setPackingList}
                        totalWeight={totalWeight}
                        setTotalWeight={setTotalWeight}

                    />
                    <WeightWrapper>
                        <Weight> Total vikt <br /> {totalWeight / 1000} kg</Weight>

                    </WeightWrapper>

                    <SubmitButton onClick={handleCreateNewAdventure}>Skapa äventyr</SubmitButton>

                    <SecondaryOptionButton onClick={() => setDisplayForm(true)}><ArrowIcon src={arrowBackwardIcon} />Tillbaka</SecondaryOptionButton>

                    {/* <p>Vikt</p> */}
                </FrostedBackground>}

            {isLoading &&
                <FrostedBackground><Spinner spinnerMessage={'sparar äventyret...'} /></FrostedBackground>}





        </>
    )
}

export default AddAdventure

