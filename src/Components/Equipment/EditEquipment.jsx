import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import axios from 'axios';

//globalstates
import { allEquipmentState } from '../Shared/GlobalStates'
import { useSetRecoilState } from 'recoil'

//components
import Spinner from '../Shared/Spinner'
import { Button, Label, InputField, SelectInput, ValidateMessage } from '../Shared/ButtonsAndSuch'
import { HandleOutsideClick } from '../Shared/Helpers'



const Wrapper = styled.div`
    background-color: ${props => props.theme.mintgreen};
    padding: 0.5rem 0.8rem;
    border-radius: 3px;
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: opacity 0.5s;
    opacity: ${props => props.displayEditEquipment ? 1 : 0};
    visibility: ${props => props.displayEditEquipment ? 'visible' : 'hidden'};

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
    border: 1px solid ${props => props.theme.darkgreygreen};
    color: ${props => props.theme.black};
    cursor: pointer;
    margin-bottom: 0.3rem;
`;

const StyledSelectInput = styled(SelectInput)` 
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
const StyledValidateMessage = styled(ValidateMessage)`
    font-size: 0.8rem;
`
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

    const { setDisplayEditEquipment, equipmentToEdit, displayEditEquipment } = props;
  
    const setAllEquipment = useSetRecoilState(allEquipmentState)

    const [equipment, setEquipment] = useState(equipmentToEdit.equipment)
    const [category, setCategory] = useState(equipmentToEdit.category)
    const [weight, setWeight] = useState(equipmentToEdit.weight)
    const [info, setInfo] = useState(equipmentToEdit.info)

    const [validateEquipment, setValidateEquipment] = useState(false)
    const [validateWeight, setValidateWeight] = useState(false)
    const [validateCategory, setValidateCategory] = useState(false)

    const [isEditing, setIsEditing]= useState(false)

    //when modal opens it scrolls into view
    useEffect(()=>{
        const scrollIntoViewOptions = {block: 'end', behavior: 'smooth'}
        let element = document.getElementById('wrapper')
        element.scrollIntoView(scrollIntoViewOptions)
    },[])

 
    //closing modal on click outside
    const ref = useRef();
    HandleOutsideClick(ref, ()=>displayEditEquipment && setDisplayEditEquipment(false))

    async function editEquipment() {

        try {
            await axios.put('/api/editEquipment', {
                updatedEquipment: equipment, updatedCategory: category, updatedWeight: parseFloat(weight), updatedInfo: info, equipmentId: equipmentToEdit._id
            })

            getAllEquipment()
            setDisplayEditEquipment(false)

        }
        catch (err) {
            console.log('Something went wrong ', err)
        }
    }

    async function getAllEquipment() {

        try {
            const response = await axios.get('/api/allEquipment')
            setAllEquipment(response.data)
        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
        }
    };

    const resetValidation = () => {

        setValidateEquipment(false);
        setValidateWeight(false)
        setValidateCategory(false)
    }

    const handleEditEquipment = () => {

        resetValidation();

        if (equipment.length < 1 || weight < 0.1 || category === 'category' || category === '') {

            if (equipment.length < 1) { setValidateEquipment(true); }
            if (weight.length < 1) { setValidateWeight(true); }
            if (category === 'category' || category === '') { setValidateCategory(true); }
            return
        }
        setIsEditing(true)
        editEquipment()

    }

    return (
  
        <Wrapper id='wrapper' ref={ref} displayEditEquipment={displayEditEquipment}>

        {isEditing ? <Spinner spinnerMessage={'uppdaterar...'}/> :
        <>
            <TopWrapper>
                <StyledLabel htmlFor='equipment'>Ändra utrustning</StyledLabel>
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
            <StyledValidateMessage displayMessage={validateEquipment}>Vad är det för pryl?</StyledValidateMessage>

            {/* Category */}

            <StyledLabel>Ändra kategori</StyledLabel>

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
                <option value="cooking">Matlagning</option>
                <option value="hygiene">Hygien</option>
                <option value="other">Övrigt</option>

            </StyledSelectInput>

            <StyledValidateMessage displayMessage={validateCategory}>What for stuff now?</StyledValidateMessage>

            {/* Weight */}
            <StyledLabel htmlFor='weight'>Ändra vikt</StyledLabel>
            <StyledInputField
                type='number'
                id='weight'
                step="0.1"
                placeholder='(g)'
                value={weight}
                onChange={event => setWeight(event.target.value)}
                isValid={validateWeight}
            />
            <StyledValidateMessage displayMessage={validateWeight}>Vikten är viktig</StyledValidateMessage>

            {/* Info */}
            <StyledLabel htmlFor='info'>Ändra info</StyledLabel>
            <TextArea
                id='info'
                rows='2'
                type='text'
                value={info}
                onChange={event => setInfo(event.target.value)}></TextArea>

            <SubmitButton onClick={() => handleEditEquipment()}>Uppdatera</SubmitButton>
            </>
        }
        </Wrapper>

    )

}

export default EditEquipment

