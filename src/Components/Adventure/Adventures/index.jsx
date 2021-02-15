import React, { useState, useEffect } from 'react'

import AllAdventures from './AllAdventures'
import SpecificAdventure from './SpecificAdventure/index'


const Adventures = () => {

    const [displayAllAdventures, setDisplayAllAdventures] = useState(true)
    const [specificAdventure, setSpecificAdventure] = useState('')

    const [currentCoordinates, setCurrentCoordinates] = useState({})
    const [longAndLat, setLongAndLat]=useState([])

     let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
  };

    console.log(longAndLat)

    useEffect(() => {

        getLocation();

    }, [])

    async function getLocation() {
        try {
            await navigator.geolocation.getCurrentPosition(success, error, options)

        }
        catch (err) {
            console.log('nåt gick fel: ', err)
        }
    }

    async function success(pos) {
        try {
            await setCurrentCoordinates(pos.coords)
            await setLongAndLat([pos.coords.latitude, pos.coords.longitude])
            
        }
        catch (err) {
            console.log('nåt gick fel: ', err)
        }

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
 
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
                longAndLat={longAndLat}

                />
            }
        </>

    )


}

export default Adventures