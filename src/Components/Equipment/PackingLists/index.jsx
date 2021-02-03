import React,{ useState } from 'react'
import AllPackingLists from './AllPackingLists'
import SpecificPackingList from './SpecificPackingList'


const PackingLists = () => {

    const [displayAllPackingLists, setDisplayAllPackingLists] = useState(true)
    const [specificPackingList, setSpecificPackingList] = useState({})
    


    return (

        <>
            {displayAllPackingLists ?
                <AllPackingLists 
                setDisplayAllPackingLists = {setDisplayAllPackingLists}
                setSpecificPackingList = {setSpecificPackingList} />
                :
                <SpecificPackingList
                setDisplayAllPackingLists = {setDisplayAllPackingLists}
                specificPackingList = {specificPackingList} />
            }

        </>




    )
}

export default PackingLists