import React, { useState } from 'react'
import FrostedBackground from '../Shared/FrostedBackground';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom'
import { Button, Label, InputField, SelectInput, ValidateMessage } from '../Shared/ButtonsAndSuch'
import axios from 'axios';
import Spinner from '../Shared/Spinner'


const Wrapper = styled.div`
   
    margin: 1rem 2rem 2rem 2rem;
    background-color: ${props => props.theme.mintGreen};
    margin: 1rem;
    padding: 1rem;
    border-radius: 3px;
`

const StyledSelectInput = styled(SelectInput)` 
    margin-bottom: 1rem;
    option {

        &:first-child {

            color: ${props => props.theme.orange};
        }
        &:nth-child(odd){
            background-color: ${props => props.theme.grey};  
        }
    }

    @media screen and (min-width: 600px){
        margin-bottom: 1rem;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    border-radius: 3px;
    border: none;
    resize: none;
`;

const SubmitButton = styled(Button)`
    display: block;
    margin: auto;
    margin-top: 1rem;
    
`;

const AddEquipment = () => {

    const [equipment, setEquipment] = useState('')
    const [category, setCategory] = useState('')
    const [weight, setWeight] = useState('')
    const [info, setInfo] = useState('')

    //variabler för att visa all validering (border och text)
    const [validateEquipment, setValidateEquipment] = useState(false)
    const [validateWeight, setValidateWeight] = useState(false)
    const [validateCategory, setValidateCategory] = useState(false)

    const [isAddingEquipment, setIsAddingEquipment] = useState(false)

    const history = useHistory()

    async function addNewEquipment() {

        try {
            const responseAddNewEquipment = await axios.post('/api/addNewEquipment', {
                newEquipment: equipment, newCategory: category, newWeight: weight, newInfo: info
            })

            if(!responseAddNewEquipment){
                console.log('nånting gick fel nånstans')
                setIsAddingEquipment(false)
            }
            else{
                // console.log('success, ny equipmenttillagd: ', responseAddNewEquipment)
                // setIsAddingEquipment(false)
                // setEquipment('')
                // setCategory('')
                // setWeight('')
                // setInfo('')
                history.push('/allequipment')
            }
           
        }
        catch (err) {
            console.log('Something went wrong ', err)
        }
    }



    //validerar frontend
    const handleAddNewEquipment = () => {

        if (equipment.length < 1 || weight < 0.1 || category === 'category' || category === '') {

            if (equipment.length < 1) { setValidateEquipment(true); }
            if (weight.length < 1) { setValidateWeight(true); }
            if (category === 'category' || category === '') { setValidateCategory(true); }
            return 
        }
        setIsAddingEquipment(true)
        addNewEquipment()

    }

    const resetValidation = () => {

        setValidateEquipment(false);
        setValidateWeight(false)
        setValidateCategory(false)
    }

    const handleSubmit = () => {

        console.log('handlesubmit')
        //resetar så att validering kan börja om ifall man enbart fyllt i vissa fält rätt
        resetValidation();

        handleAddNewEquipment();

    }

    return (

        <FrostedBackground headline={'Lägg till ny utrustning'}>
                {isAddingEquipment ? <Spinner spinnerMessage={'slänger in grejer på hyllan...'}/> : 
            <Wrapper>

                {/* Equipment */}
                <Label htmlFor='equipment'>Utrustning</Label>
                <InputField
                    type='text'
                    id='equipment'
                    value={equipment}
                    onChange={event => setEquipment(event.target.value)}
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
                    onChange={event => setCategory(event.target.value)}>
                    <option value='category'>Välj kategori</option>
                    <option value="living">Boende</option>
                    <option value="storage">Bära/Förvaring</option>
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
                <InputField
                    type='number'
                    id='weight'
                    step="0.1"
                    placeholder='(g)'
                    value={weight}
                    onChange={event => setWeight(event.target.value)}
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
                    onChange={event => setInfo(event.target.value)}></TextArea>

                <SubmitButton onClick={(event) => handleSubmit(event)}>Lägg till</SubmitButton>

            </Wrapper>
        }
        </FrostedBackground>


    )
}

export default AddEquipment

