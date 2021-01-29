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


const SubmitButton = styled(Button)`
    display:block;
    margin:auto;
    margin-bottom: 2rem;
`;

const SecondaryOptionButton = styled(SecondaryButton)`
    color: ${props => props.theme.black};
    display:block;
    margin:auto;
    margin-bottom: 2rem;
`

const AddAdventure = () => {

    const [displayForm, setDisplayForm] = useState(true)
    const [displayPackingLists, setDisplayPackingLists] = useState(false)
    const [newAdventureInfo, setNewAdventureInfo] = useState({})
    const allEquipment = useRecoilValue(allEquipmentState)
    const  setAllAdventures = useSetRecoilState(allAdventuresState)

    const [packingList, setPackingList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    // const [itemWeightList, setItemWeightList]=useState([])

    // const [totalWeight, setTotalWeight]=useState('')

    // console.log(packingList)


    // if(packingList.length > 0){
    //     allEquipment.map((equipment)=>{

    //         let weight = packingList.find((id)=> id === equipment._id)

    //     })
    // }

    // const handleAddNewAdventure = () =>{


    //     setNewAdventure({...newAdventure, packingList: packingList})
    //     addNewAdventure()

    // }
    let newAdventure = newAdventureInfo
    const handleCreateNewAdventure = () => {

        if (packingList.length < 0) {
            console.log('Validering som säger att den inte innehåller nåt. ')
            return
        }
        else {

            setIsLoading(true)
            newAdventure = { ...newAdventureInfo, packingList: packingList }
            console.log('Från frontend skickas detta till backend: ', newAdventure)
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

            {!displayForm && !isLoading && <FrostedBackground headline={'Dags att packa'}>

                <SecondaryOptionButton onClick={() => setDisplayPackingLists(true)}>Välj en färdig lista</SecondaryOptionButton>
                <AccordionSortedFiltered equipmentList={allEquipment} displayDotOrBox={'box'} packingList={packingList} setPackingList={setPackingList} />

                <SubmitButton onClick={handleCreateNewAdventure}>Skapa äventyr</SubmitButton>
                <SecondaryOptionButton onClick={() => setDisplayForm(true)}>Tillbaka</SecondaryOptionButton>

                {/* <p>Vikt</p> */}
            </FrostedBackground>}

            {isLoading && <FrostedBackground><Spinner spinnerMessage={'sparar äventyret...'} /></FrostedBackground>}





        </>
    )
}

export default AddAdventure

