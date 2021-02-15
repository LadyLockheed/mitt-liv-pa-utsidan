import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import L from 'leaflet'


import styled from 'styled-components'

const StyledMapContainer = styled(MapContainer)`
    
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
        },
        {
            long: 11.936589937554986,
            lat: 57.715458712200494,
            popupText: 'Här finns vatten'
        }
    ]

    // const saveLocation = () => {

    // }
  

    return (
        <>
          
                {/* <StyledMap center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}> */}
                <StyledMapContainer center={longAndLat} zoom={11} scrollWheelZoom={true}>
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


                </StyledMapContainer>
            
            {/* <SaveButton onClick={saveLocation}>Spara plats</SaveButton> */}
        </>
    )
}

export default Map