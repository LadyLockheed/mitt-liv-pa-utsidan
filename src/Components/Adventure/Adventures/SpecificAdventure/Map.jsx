import React, { useEffect } from 'react'
import styled from 'styled-components'

const StyledMap = styled.div`
    border: 1px solid black;
    background-color: white;
    height: 15rem;
    width: 100%;

`;

const Map = () => {

    // let geo = navigator.geolocation

    useEffect(() => {
        console.log('i useEffect map')
        // navigator.geolocation.getCurrentPosition(success, error, options)
      navigator.geolocation.getCurrentPosition(success, error)
    
    })

    function success(pos) {
        console.log(pos)
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    // let options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0
    // };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    // navigator.geolocation.getCurrentPosition(success, error, options);

    return (
        <StyledMap></StyledMap>
    )
}

export default Map