import React, { useEffect, useState, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'


import styled from 'styled-components'

const StyledMap = styled(MapContainer)`
    
    background-color: white;
    height: 15rem;
    width: 100%;

`;

const SaveButton = styled.button`


`

const Map = (props) => {


    const { longAndLat } = props
    // console.log(L)

    const userSavedLocations = [
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
    ]

    const saveLocation = () => {
        
    }


    // let geo = navigator.geolocation

    // const [currentCoordinates, setCurrentCoordinates] = useState({})
    // const [longAndLat, setLongAndLat]=useState([])

    // console.log(longAndLat)

    // useEffect(() => {
    //     console.log('i useEffect map')
    //     // navigator.geolocation.getCurrentPosition(success, error)
    //     getLocation();

    // }, [])

    // async function getLocation() {
    //     try {
    //         await navigator.geolocation.getCurrentPosition(success, error)

    //     }
    //     catch (err) {
    //         console.log('nåt gick fel: ', err)
    //     }
    // }

    // async function success(pos) {
    //     try {
    //         await setCurrentCoordinates(pos.coords)
    //         await setLongAndLat([pos.coords.latitude, pos.coords.longitude])

    //     }
    //     catch (err) {
    //         console.log('nåt gick fel: ', err)
    //     }

    // }

    // function error(err) {
    //     console.warn(`ERROR(${err.code}): ${err.message}`);
    // }



    return (
        <>
            <StyledMap>


                {/* <StyledMap center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}> */}
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
            </StyledMap>
            <SaveButton onClick={saveLocation}>Spara plats</SaveButton>
        </>
    )
}

export default Map