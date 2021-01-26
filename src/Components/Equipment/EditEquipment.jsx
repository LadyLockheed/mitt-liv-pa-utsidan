import React, { useState } from 'react'

import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import { Button, Label, InputField, SelectInput, ValidateMessage } from '../Shared/ButtonsAndSuch'
import axios from 'axios';
import Spinner from '../Shared/Spinner'


const Wrapper = styled.div`
    background-color: ${props => props.theme.mediumbeige};
    padding: 0.5rem 0.8rem;
    border-radius: 3px;
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 4;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    @media screen and (min-width: 600px){
        width: 50%;
    }
`;
const TopWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
  
`;

const CloseButton = styled.button`
    height: 1.2rem;
    width: 1.3rem;
    border-radius: 3px;
    border: 1px solid ${props => props.theme.darkgrey};
    color: ${props => props.theme.black};
    cursor: pointer;
    padding-bottom:3px;
`;

const StyledSelectInput = styled(SelectInput)` 
    ${'' /* margin-bottom: 1rem; */}
    padding:0.1rem;
    font-size: 0.8rem;

    option {

        &:first-child {

            color: ${props => props.theme.orange};
        }
        &:nth-child(odd){
            background-color: ${props => props.theme.grey};  
        }
    }

`;

const StyledLabel = styled(Label)`
    font-size:0.8rem;
    margin-top: 0.3rem;
    margin-bottom: 0.1rem;
    

`;
const StyledInputField = styled(InputField)`
   padding: 0.1rem;
 
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
    margin-top: 0.5rem;
    padding: 0.2rem 0.4rem;
    font-size: 0.8rem;
    
`;

const EditEquipment = (props) => {

    const { setDisplayEditEquipment, equipmentToEdit } = props;
   
    const [equipment, setEquipment] = useState(equipmentToEdit.equipment)
    const [category, setCategory] = useState(equipmentToEdit.category)
    const [weight, setWeight] = useState(equipmentToEdit.weight)
    const [info, setInfo] = useState(equipmentToEdit.info)

    //variabler för att visa all validering (border och text)
    const [validateEquipment, setValidateEquipment] = useState(false)
    const [validateWeight, setValidateWeight] = useState(false)
    const [validateCategory, setValidateCategory] = useState(false)

    const [isUpdatingEquipment, setIsUpdatingEquipment] = useState(false)

    const history = useHistory()

    async function editEquipment() {

        try {
            const responseUpdatedEquipment = await axios.put('/api/editEquipment', {
                updatedEquipment: equipment, updatedCategory: category, updatedWeight: weight, updatedInfo: info, equipmentId:equipmentToEdit._id
            })
            console.log('frontend response: ',responseUpdatedEquipment)

            // if(!responseAddNewEquipment){
            //     console.log('nånting gick fel nånstans')
            //     setIsAddingEquipment(false)
            // }
            // else{

            //     history.push('/allequipment')
            // }

        }
        catch (err) {
            console.log('Something went wrong ', err)
        }
    }



    //validerar frontend
    const handleEditEquipment = () => {

        resetValidation();

        if (equipment.length < 1 || weight < 0.1 || category === 'category' || category === '') {

            if (equipment.length < 1) { setValidateEquipment(true); }
            if (weight.length < 1) { setValidateWeight(true); }
            if (category === 'category' || category === '') { setValidateCategory(true); }
            return
        }
        // setIsUpdatingEquipment(true)
        editEquipment()

    }

    const resetValidation = () => {

        setValidateEquipment(false);
        setValidateWeight(false)
        setValidateCategory(false)
    }

    // const handleSubmit = () => {

    //     //resetar så att validering kan börja om ifall man enbart fyllt i vissa fält rätt

    //     handleUpdateEquipment();

    // }


    return (
        <>

            {isUpdatingEquipment ? <Spinner spinnerMessage={'utför ändring...'} /> :
                <Wrapper>
                    <TopWrapper>
                        <StyledLabel htmlFor='equipment'>Utrustning</StyledLabel>
                        <CloseButton onClick={() => setDisplayEditEquipment(false)}>x</CloseButton>
                        {/* Equipment */}

                    </TopWrapper>
                    <StyledInputField
                        type='text'
                        id='equipment'
                        value={equipment}
                        onChange={event => setEquipment(event.target.value)}
                        isValid={validateEquipment}
                    />
                    <ValidateMessage displayMessage={validateEquipment}>Vad är det för pryl?</ValidateMessage>

                    {/* Category */}

                    <StyledLabel>Kategori</StyledLabel>

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
                    <StyledLabel htmlFor='weight'>Vikt</StyledLabel>
                    <StyledInputField
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
                    <StyledLabel htmlFor='info'>Info</StyledLabel>
                    <TextArea
                        id='info'
                        rows='2'
                        type='text'
                        value={info}
                        onChange={event => setInfo(event.target.value)}></TextArea>

                    <SubmitButton onClick={() => handleEditEquipment()}>Uppdatera</SubmitButton>

                </Wrapper>
            }

        </>
    )
}

export default EditEquipment

