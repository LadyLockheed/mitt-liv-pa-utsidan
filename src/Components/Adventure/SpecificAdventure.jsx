import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div `
    border: 1px solid black;
    width: 20rem;
    height: 20rem;
    background-color: lightgrey;

`;


const Button = styled.button `

`;



const SpecificAdventure=()=>{
    // myStorage = window.localStorage;
    const setSession = ()=>{
        // console.log(myStorage)
    }

    return(

        <Wrapper>
            <Button onClick={setSession}>Storage</Button>

           
        </Wrapper>
    )
}

export default SpecificAdventure