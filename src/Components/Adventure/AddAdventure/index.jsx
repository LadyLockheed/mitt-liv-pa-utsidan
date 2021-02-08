import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

//globalstates
import {  useSetRecoilState } from 'recoil'
import { allAdventuresState } from '../../Shared/GlobalStates'

//components
import AddAdventureForm from './AddAdventureForm'
import FrostedBackground from '../../Shared/FrostedBackground'
import AddAdventurePackingList from './AddAdventurePackingList'
import Spinner from '../../Shared/Spinner'


const AddAdventure = () => {

    const setAllAdventures = useSetRecoilState(allAdventuresState)

    const [displayForm, setDisplayForm] = useState(true)
    const [newAdventureInfo, setNewAdventureInfo] = useState({})
    const [totalWeight, setTotalWeight] = useState(0)
    const [packingList, setPackingList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

  
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
         

                <AddAdventurePackingList
                    packingList={packingList}
                    setPackingList={setPackingList}
                    submitFunction = {handleCreateNewAdventure}
                    setDisplayForm = {setDisplayForm}
                    totalWeight = {totalWeight}
                    setTotalWeight = {setTotalWeight}
                />
          
             }

            {isLoading &&
                <FrostedBackground><Spinner spinnerMessage={'sparar äventyret...'} /></FrostedBackground>}





        </>
    )
}

export default AddAdventure

