import React from 'react'
import styled from 'styled-components'
import FrostedBackground from '../Shared/FrostedBackground'
import { Button, Label, InputField, SelectInput } from '../Shared/ButtonsAndSuch';

const Wrapper=styled.div`
   
    margin: 1rem 2rem 2rem 2rem;
    background-color:#D4DBD4;
    margin:1rem;
    padding:1rem;
    border-radius:3px;
`;

const LabelStyled = styled(Label)` 


`;
const InputFieldStyled = styled(InputField)`

   
`;

const SelectInputStyled = styled(SelectInput)` 
    

`;

const ValidateMessage = styled.span `
    color:red;
    ${'' /* visibility: hidden; */}
    margin-left: 0.5rem;
`;

const SubmitButton = styled(Button)`
   display:block;
    margin:auto;
    margin-top: 1rem;
`;


const AddNewAdventure=()=>{

    const handleSubmit = () =>{
            console.log('click')

    }

    return(

        <FrostedBackground headline = {'Skapa äventyr'}>

            <Wrapper>

                <LabelStyled htmlFor='adventure'>Namn på äventyr</LabelStyled>
                <InputFieldStyled type='text' id='adventure'/>
                <ValidateMessage>Validering</ValidateMessage>

                <LabelStyled>Årstid</LabelStyled>
                <SelectInputStyled name="season" id="season">
                    <option value="summer">Sommar</option>
                    <option value="autumn">Höst</option>
                    <option value="winter">Winter</option>
                    <option value="spring">Vår</option>
                </SelectInputStyled>
                <ValidateMessage>Validering</ValidateMessage>

                <LabelStyled htmlFor="dateStarting">Startdatum</LabelStyled>
                <InputFieldStyled type="date" name="dateStarting" id="dateStarting"></InputFieldStyled>

                <LabelStyled htmlFor="days">Hur länge</LabelStyled>
                <InputFieldStyled type='number' id='days' step="0.5" placeholder='Dygn'/>

                {/* <LabelStyled htmlFor="days">Hur långt</LabelStyled>
                <InputFieldStyled type='number' id='days' step="0.5"/> */}

                <SubmitButton onClick={handleSubmit}>Movin on</SubmitButton>

                





            </Wrapper>
            
        </FrostedBackground>
    )
}

export default AddNewAdventure