import React, { useState } from 'react'
import AddAdventureForm from './AddAdventureForm'
// import PackingListsOnly from '../../Shared/PackingListsOnly'
import styled from 'styled-components'
import FrostedBackground from '../../Shared/FrostedBackground'
import AccordionSortedFiltered from '../../Shared/AccordionSortedFiltered'
import { useRecoilValue } from 'recoil'
import { allEquipmentState } from '../../Shared/GlobalStates'
import { Button, SecondaryButton } from '../../Shared/ButtonsAndSuch'
import axios from 'axios'
import Spinner from '../../Shared/Spinner'


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
    const [packingList, setPackingList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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

        if (packingList.length > 0) {
            setIsLoading(true)
            newAdventure = { ...newAdventureInfo, packingList: packingList }
            console.log(newAdventure)
            addNewAdventure()
        }
        else {
            console.log('Validering som säger att den inte innehåller nåt. ')
            return
        }

    }

    async function addNewAdventure() {

        try {
            const responseAddNewAdventure = await axios.post('/api/addNewAdventure', { newAdventure })
            console.log('resonse frontend: ', responseAddNewAdventure)
            if (responseAddNewAdventure) {
                setIsLoading(false)

                //TODO använd history och skicka vidare till specifikt äventyr

            }
            else {
                console.log('nånting gick fel nånstans')

            }

        }
        catch (err) {
            console.log('Something went wrong ', err)
        }
    }
    // console.log('newAdventure: ', newAdventure)

    return (
        <>


            {displayForm && !isLoading &&
                <AddAdventureForm setDisplayForm={setDisplayForm} setNewAdventureInfo={setNewAdventureInfo} newAdventureInfo={newAdventureInfo} />}

            {!displayForm && !isLoading && <FrostedBackground headline={'Dags att packa'}>
                {/* <ChooseDoneListButton onClick= {setDisplayPackingLists(true)}>Välj en färdig lista</ChooseDoneListButton> */}
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

