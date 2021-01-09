import React from 'react'
import FrostedBackground from '../Shared/FrostedBackground';
import styled from 'styled-components';


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
    border-radius: 5px;
    border: none;
    padding: 0.5rem;
   
`
const RadioButton = styled.input`

`



const AddEquipment=()=>{
   

    return(
       
        <FrostedBackground headline={'Lägg till ny utrustning'}>

            <Wrapper>

                <Label>Utrustning</Label>
                <InputField type='text'/>

                <Label>Kategori</Label>

                <Label for='Living'>Boende</Label>
                <RadioButton type='radio' id='living' name='category'/>

                <Label for='sleeping'>Sova</Label>
                <RadioButton type='radio' id='sleeping' name='category'/>

                <Label for='clothes'>Kläder</Label>
                <RadioButton type='radio' id='clothes' name='category'/>


                <Label>Vikt (gram)</Label>
                <InputField type='number'/>
            
            </Wrapper>
      
        </FrostedBackground>
        
        
    )
}

export default AddEquipment