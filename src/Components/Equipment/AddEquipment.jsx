import React from 'react'
import FrostedBackground from '../Shared/FrostedBackground';
import styled from 'styled-components';
import { Button } from '../Shared/ButtonsAndSuch'
 

const Wrapper=styled.div`
    border: 1px solid black;
    margin: 1rem 2rem 2rem 2rem
`
const Label = styled.label` 
    font-weight: bold;
    display: block;
    text-align: left;
    padding-bottom: 0.1rem;

`
const InputField = styled.input`
    width: 98%;
    border-radius: 3px;
    border: none;
    padding: 0.5rem;
   
`
const RadioButtonsWrapper = styled.div `
    border:1px solid red;

`;
const RadioButton = styled.input`

`;
const RadioButtonLabel = styled.label `
    display:block;

`
const TextArea = styled.textarea`
    width: 100%;
    border-radius: 3px;
`;

const SubmitButton = styled(Button)`
    display:block;
    margin:auto;
    
`;







const AddEquipment=()=>{
   

    return(
       
        <FrostedBackground headline={'Lägg till ny utrustning'}>

            <Wrapper>

                <Label htmlFor='equipment'>Utrustning</Label>
                <InputField type='text' id='equipment'/>

                <Label>Kategori</Label>
                <RadioButtonsWrapper>

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

                </RadioButtonsWrapper>

       
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


                <Label htmlFor='weight'>Vikt (gram)</Label>
                <InputField type='number' id='weight'/>

                <Label htmlFor='info'>Info</Label>
                <TextArea id='info' rows='4'></TextArea>

                <SubmitButton>Lägg till</SubmitButton>

            
            </Wrapper>
      
        </FrostedBackground>
        
        
    )
}

export default AddEquipment