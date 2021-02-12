import React, { useState } from 'react'

import AllAdventures from './AllAdventures'
import SpecificAdventure from './SpecificAdventure/index'
// import { allAdventuresState } from '../../Shared/GlobalStates'
// import { useRecoilValue } from 'recoil';




const Adventures = () => {

    const [displayAllAdventures, setDisplayAllAdventures] = useState(true)
    const [specificAdventure, setSpecificAdventure] = useState('')
 
    return (
        <>
            {displayAllAdventures ?
                <AllAdventures 
                setDisplayAllAdventures = {setDisplayAllAdventures}
                setSpecificAdventure = {setSpecificAdventure} />
                :
                <SpecificAdventure 
                setDisplayAllAdventures = {setDisplayAllAdventures} 
                specificAdventure = {specificAdventure}

                />
            }
        </>

    )


}

export default Adventures