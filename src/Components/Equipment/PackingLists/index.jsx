import React, { useState } from 'react'
import AllPackingLists from './AllPackingLists'
import SpecificPackingList from './SpecificPackingList'
import FrostedBackground from '../../Shared/FrostedBackground'


const PackingLists = (props) => {
    const { setPackingList, GoBackButton, SubmitButton, creatingPackingList=false } = props

    //setPackingLIst finns bara om man kommer från Skapa äventyr
    //om man går in direkt i packlistor och vidare till specifik packlista så kraschar det pga att den inte kan setta PackingList pga att den inte finns. 
    //hur sätter man defaultvärde på en funktion?

    const [displayAllPackingLists, setDisplayAllPackingLists] = useState(true)
    const [specificPackingList, setSpecificPackingList] = useState({})
    

    return (

        <>
            {displayAllPackingLists ?
                <FrostedBackground headline={'Packlistor'}>
                    <AllPackingLists
                        setDisplayAllPackingLists={setDisplayAllPackingLists}
                        setSpecificPackingList={setSpecificPackingList}
                        setPackingList = {setPackingList}
                        creatingPackingList={creatingPackingList}
                      
                        />
                  
                    {creatingPackingList && <GoBackButton/>}  
                </FrostedBackground>
                :
                
                <FrostedBackground headline={`Packlista, totalt ${specificPackingList.totalWeight}kg`}>
                    <SpecificPackingList
                        setDisplayAllPackingLists={setDisplayAllPackingLists}
                        specificPackingList={specificPackingList}
                        setPackingList ={setPackingList} />
                        {creatingPackingList && <SubmitButton/>}  
                </FrostedBackground>
            }

        </>




    )
}

export default PackingLists