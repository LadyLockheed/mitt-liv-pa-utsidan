import React, { useState } from 'react'
import AllPackingLists from './AllPackingLists'
import SpecificPackingList from './SpecificPackingList'
import FrostedBackground from '../../Shared/FrostedBackground'


const PackingLists = () => {

    const [displayAllPackingLists, setDisplayAllPackingLists] = useState(true)
    const [specificPackingList, setSpecificPackingList] = useState({})


    return (

        <>
            {displayAllPackingLists ?
                <FrostedBackground headline={'Packlistor'}>
                    <AllPackingLists
                        setDisplayAllPackingLists={setDisplayAllPackingLists}
                        setSpecificPackingList={setSpecificPackingList} />
                </FrostedBackground>
                :
                
                <FrostedBackground headline={`Packlista, totalt ${specificPackingList.totalWeight}kg`}>
                    <SpecificPackingList
                        setDisplayAllPackingLists={setDisplayAllPackingLists}
                        specificPackingList={specificPackingList} />
                </FrostedBackground>
            }

        </>




    )
}

export default PackingLists