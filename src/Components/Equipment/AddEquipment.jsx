import React, {useState} from 'react'
import FrostedBackground from '../Shared/FrostedBackground';
import styled from 'styled-components';
import { Button, Label, InputField, SelectInput } from '../Shared/ButtonsAndSuch'
 

const Wrapper = styled.div`
   
    margin: 1rem 2rem 2rem 2rem;
    background-color:#D4DBD4;
    margin:1rem;
    padding:1rem;
    border-radius:3px;
`

const ValidateMessage = styled.span `
    color:${props => props.theme.red};
    visibility: ${props => props.displayMessage ? 'visible' : 'hidden'};
    margin-left: 0.5rem;
`;

const StyledInputField = styled(InputField)`
    border:2px solid ${props => props.isValid ? `red` : `white`};


`
const StyledSelectInput = styled(SelectInput)` 
    border:2px solid ${props => props.isValid ? `red` : `white`};
    
    option {

        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
        font-size:1rem;
    
        &:first-child {

            color:orange;
        }
        &:nth-child(odd){
            background-color: ${ props => props.theme.grey};  
        }
    
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    border-radius: 3px;
    border: none;
    resize: none;
`;

const SubmitButton = styled(Button)`
    display:block;
    margin:auto;
    margin-top: 1rem;
    
`;


const AddEquipment=()=>{

    const [equipment, setEquipment]=useState('')
	const [category, setCategory]=useState('')
	const [weight, setWeight]=useState('')
    const [info, setInfo]=useState('')
    
    const [validateEquipment, setValidateEquipment] = useState(false)
    const [validateWeight, setValidateWeight] = useState(false)
    const [validateCategory, setValidateCategory] = useState(false)

    const handleValidation = () => {
        if (equipment.length < 1 || weight < 0.1 || category === 'category' || category === ''){
            
            if(equipment.length < 1) { setValidateEquipment(true); }
            if(weight.length < 1) { setValidateWeight(true); }
            if(category === 'category' || category === '' ){ setValidateCategory(true); }
            
            return false
        }
        else { return true }

    }

    const resetValidation = () => {
       
        setValidateEquipment(false); 
        setValidateWeight(false)
        setValidateCategory(false)
    }

   
    const handleSubmit = (e)=>{
        //resetar så att validering kan börja om ifall man enbart fyllt i vissa fält rätt
        resetValidation();

       let allIsValid =  handleValidation();

        if (allIsValid){

            console.log('posta equipment, lägg till spinner (då ser man inte heller ev validerade fält)')
        }
        else{
            return
        }
        
       
    }
  
    return(
       
        <FrostedBackground headline={'Lägg till ny utrustning'}>

            <Wrapper>

                {/* Equipment */}
                <Label htmlFor='equipment'>Utrustning</Label>
                <StyledInputField
                type='text' 
                id='equipment'
                value={equipment}
                onChange={event=>setEquipment(event.target.value)}
                isValid={validateEquipment}
                />
                <ValidateMessage displayMessage={validateEquipment}>Vad är det för pryl?</ValidateMessage>

                {/* Category */}
                <Label>Kategori</Label>

                <StyledSelectInput 
                name="category" 
                id="category"
                type='text' 
                value={category}
                isValid={validateCategory}   
                onChange={event=>setCategory(event.target.value)}>
                    <option value='category'>Välj kategori</option>
                    <option value="living">Boende</option>
                    <option value="storage">Förvaring</option>
                    <option value="sleeping">Sova</option>
                    <option value="clothes">Kläder</option>
                    <option value="electronics">Elektronik</option>
                    <option value="fun">Nöje</option>
                    <option value="cooking">Laga mat</option>
                    <option value="hygiene">Hygien</option>
                    <option value="other">Övrigt</option>
                    
                </StyledSelectInput>

                <ValidateMessage displayMessage={validateCategory}>What for stuff now?</ValidateMessage>

                {/* Weight */}
                <Label htmlFor='weight'>Vikt</Label>
                <StyledInputField
                type='number' 
                id='weight' 
                step="0.1" 
                placeholder='(g)'
                value={weight}
                onChange={event=>setWeight(event.target.value)}
                isValid={validateWeight}
                />
                <ValidateMessage displayMessage={validateWeight}>Vikten är viktig</ValidateMessage>

                {/* Info */}
                <Label htmlFor='info'>Info</Label>
                <TextArea 
                id='info' 
                rows='4'
                type='text' 
                value={info}  
                onChange={event=>setInfo(event.target.value)}></TextArea>

                <SubmitButton onClick={(event)=> handleSubmit(event)}>Lägg till</SubmitButton>

            </Wrapper>
      
        </FrostedBackground>
        
        
    )
}

export default AddEquipment


const equipmentIsValid = (equipment, equipmentIsTouched) => {
    
    
    if(equipment.length < 1 && equipmentIsTouched){
        return [false, 'Vilken pryl vill du lägga till?']
    }
    else{
        return [true, 'This message will be hidden']
    }
};

// const categoryIsValid = (category) => {

//     if(category.length < 1 && categoryIsTouched){
//         return [false, 'Glöm ej att välja kategori']
//     }
//     else{
//         return [true, 'This message will be hidden']
//     }

// }

const weightIsValid = (weight, weightIsTouched) => {

    if(weight.length < 1 && weightIsTouched){
        return [false, 'Vikten är viktig']
    }
    else{
        return [true, 'This message will be hidden']
    }

}