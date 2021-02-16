import React, {useState} from 'react'
// import React, { useEffect, useState, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import L from 'leaflet'


import styled from 'styled-components'

const StyledMap = styled(MapContainer)`
    
    background-color: white;
    height: 15rem;
    width: 100%;

`;

// const SaveButton = styled.button`


// `

const Map = (props) => {


    const { longAndLat } = props
    // console.log(L)
    // console.log(longAndLat)

    // const [locationText, setLocationText]=useState('')
    const [userSavedLocations, setUserSavedLocations]=useState(   [
        {
            long: 11.939411419683836,
            lat: 57.716123811750336,
            popupText: 'Bra tältplats'
        },
        {
            long: 11.943885345114667,
            lat: 57.71441527354612,
            popupText: 'Hittade svamp här!'
        }
    ])


    // const saveLocation = () => {

        
    //     let newUserLocation = {
    //         long: longAndLat[1],
    //         lat: longAndLat[0],
    //         popupText: locationText
    //     }
    //     setUserSavedLocations([...userSavedLocations, newUserLocation])

    // }
    // console.log(userSavedLocations)
   

    return (
        <>

            <StyledMap center={longAndLat} zoom={11} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={longAndLat}>
                    <Popup>
                        Du är här! <br /> Var nu här är nånstans.
                    </Popup>
                </Marker>
                {userSavedLocations.map((location) => {
                    return (<Marker position={[location.lat, location.long]} key={location.lat}>
                        <Popup>
                            {location.popupText}
                        </Popup>
                    </Marker>)
                })}




            </StyledMap>
            
            {/* <label>Platsnotis</label>
            <input
                type='text'
                id='locationText'
                value={locationText}
                onChange={event => setLocationText(event.target.value)} />
                <SaveButton onClick={saveLocation}>Spara plats</SaveButton> */}

        </>
    )
}

export default Map