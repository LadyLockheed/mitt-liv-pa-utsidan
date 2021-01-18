import React,  { useState } from 'react'

import AddAdventureForm from './AddAdventureForm'
import AllEquipment from '../../Equipment/AllEquipment'



const AddAdventure = () => {

    const [newAdventure, setNewAdventure] = useState(null)


    return (
        <>
            {!newAdventure ? <AddAdventureForm setNewAdventure = {setNewAdventure} /> : <AllEquipment/> }
            
        </>
    )
}

export default AddAdventure

