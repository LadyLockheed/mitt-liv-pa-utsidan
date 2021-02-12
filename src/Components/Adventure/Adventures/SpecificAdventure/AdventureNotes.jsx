import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components'
import {useSetRecoilState } from 'recoil';
import {  allAdventuresState } from '../../../Shared/GlobalStates'


const StyledNoteInput = styled.textarea`
    width: 96%;
    font-family: 'Quicksand', sans-serif;
    border-radius: 3px;
    font-weight: bold;
    border: none;
    resize: none;
    padding: 8px;
`;


const AdventureNotes = (props) => {

    const { specificAdventure } = props
    
    const setAllAdventures = useSetRecoilState(allAdventuresState)
    const [ notes, setNotes ] = useState(specificAdventure.notes)
 
    async function saveAdventureNotes() {
        
        try {

            await axios.put('/api/saveAdventureNotes', {notes: notes, adventureId:specificAdventure._id})
            getAllAdventures();
        }
        catch(err){
            console.log('Something went wrong: ', err)
        }

    }

    async function getAllAdventures() {
    
        try {
            const response = await axios.get('/api/allAdventures')
            setAllAdventures(response.data)
        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
        }
    };

    return (

        <>
            <StyledNoteInput
                id='notes'
                rows='8'
                type='text'
                value = {notes}
                onChange={(event)=> setNotes(event.target.value)}
                onBlur = {saveAdventureNotes}
                 
            />
        
        </>

    )

}

export default AdventureNotes