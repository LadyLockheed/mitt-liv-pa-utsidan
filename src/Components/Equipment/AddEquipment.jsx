import React from 'react'
import FrostedBackground from '../Shared/FrostedBackground';
import styled from 'styled-components';
import { Button } from '../Shared/ButtonsAndSuch'
 

const Wrapper=styled.div`
   
    margin: 1rem 2rem 2rem 2rem
`
const Label = styled.label` 
    font-weight: bold;
    display: block;
    text-align: left;
    margin-bottom: 0.3rem;
    margin-top: 0.5rem;
    text-transform: uppercase;

`
const InputField = styled.input`
    width: 98%;
    border-radius: 3px;
    border: none;
    padding: 0.5rem;
   
`
const ValidateMessage = styled.span `
    color:red;
    ${'' /* visibility: hidden; */}
    margin-left: 0.5rem;
`;
const RadioButtonsOuterWrapper = styled.div `
   
    display:grid;
    grid-template-columns: 1fr 1fr;

`;

const RadioButtonsInnerWrapper = styled.div `
   
`;
const RadioButton = styled.input`

`;
const RadioButtonLabel = styled.label `
    display:block;

`
const TextArea = styled.textarea`
    width: 100%;
    border-radius: 3px;
    resize: none;
`;

const SubmitButton = styled(Button)`
    display:block;
    margin:auto;
    margin-top: 1rem;
    
`;


const AddEquipment=()=>{
  
    return(
       
        <FrostedBackground headline={'Lägg till ny utrustning'}>

            <Wrapper>

                <Label htmlFor='equipment'>Utrustning</Label>
                <InputField type='text' id='equipment'/>
                <ValidateMessage >Validering</ValidateMessage>

                <Label>Kategori</Label>

                <RadioButtonsOuterWrapper>

                    <RadioButtonsInnerWrapper>
                        <RadioButtonLabel htmlFor='Living'>
                            <RadioButton type='radio' id='living' name='category' value='living'/>
                            Boende
                        </RadioButtonLabel>

                        <RadioButtonLabel fhtmlForor='storage'>
                            <RadioButton type='radio' id='storage' name='category' value='storage'/>
                            Förvara 
                        </RadioButtonLabel>

                        <RadioButtonLabel htmlFor='sleeping'>
                            <RadioButton type='radio' id='sleeping' name='category' value='sleeping'/>
                            Sova
                        </RadioButtonLabel>

                        <RadioButtonLabel htmlFor='clothes'>
                            <RadioButton type='radio' id='clothes' name='category' value='clothes'/>
                            Kläder
                        </RadioButtonLabel>

                        <RadioButtonLabel htmlFor='electronics'>
                            <RadioButton type='radio' id='electronics' name='category' value='electronics'/>
                            Elektronik
                        </RadioButtonLabel>

                    </RadioButtonsInnerWrapper>

                    <RadioButtonsInnerWrapper>
                        <RadioButtonLabel htmlFor='fun'>
                            <RadioButton type='radio' id='fun' name='category' value='fun'/>
                            Nöje
                        </RadioButtonLabel>

                        <RadioButtonLabel htmlFor='cooking'>
                            <RadioButton type='radio' id='cooking' name='category' value='cooking'/>
                            Matlagning
                        </RadioButtonLabel>

                        <RadioButtonLabel htmlFor='storage'>
                            <RadioButton type='radio' id='hygiene' name='category' value='hygiene'/>
                            Hygien
                        </RadioButtonLabel>

                        <RadioButtonLabel htmlFor='other'>
                            <RadioButton type='radio' id='other' name='category' value='other'/>
                            Övrigt
                        </RadioButtonLabel>

                </RadioButtonsInnerWrapper>

            </RadioButtonsOuterWrapper>
            <ValidateMessage>Validering</ValidateMessage>


                <Label htmlFor='weight'>Vikt (gram)</Label>
                <InputField type='number' id='weight'/>
                <ValidateMessage>Validering</ValidateMessage>


                <Label htmlFor='info'>Info</Label>
                <TextArea id='info' rows='4'></TextArea>

                <SubmitButton>Lägg till</SubmitButton>

            
            </Wrapper>
      
        </FrostedBackground>
        
        
    )
}

export default AddEquipment