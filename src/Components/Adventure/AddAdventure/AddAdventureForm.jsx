import React, { useState } from 'react'
import styled from 'styled-components'
import FrostedBackground from '../../Shared/FrostedBackground'
import { Button, Label, InputField, SelectInput, ValidateMessage } from '../../Shared/ButtonsAndSuch';
import arrowForwardICon from '../../../Assets/arrowForward.svg'

const Wrapper=styled.div`
   
    margin: 1rem 2rem 2rem 2rem;
    background-color:${props => props.theme.mintGreen};
    margin:1rem;
    padding:1rem;
    border-radius:3px;
`;


const SelectInputStyled = styled(SelectInput)` 
    

    option {

        &:first-child {
            color: ${props => props.theme.orange};
        }
        &:nth-child(odd){
            background-color: ${ props => props.theme.grey};  
        }

    }

    @media screen and (min-width: 600px){
        margin-bottom: 1rem;
    }

`;

const SubmitButton = styled(Button)`
    display: block;
    margin: auto;
    margin-top: 1rem;
`;

const ArrowForwardIcon = styled.img `
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
`;


const AddNewAdventure=()=>{

    const [adventure, setAdventure] = useState('')
	const [season, setSeason] = useState('')
	const [dateStarting, setDateStarting] = useState('')
    const [days, setDays] = useState('')
    
    const [validateAdventure, setValidateAdventure] = useState(false)
    const [validateSeason, setValidateSeason] = useState(false)
    const [validateDateStarting, setValidateDateStarting] = useState(false)
    const [validateDays, setValidateDays] = useState(false)

 
    const handleValidation = () => {
        
        if (adventure.length < 1 ||  season === 'season' || season === '' || days < 1 || dateStarting.length < 1) {
       
            if (adventure.length < 1) { setValidateAdventure(true); }
            if (season === 'season' || season === '' ){ setValidateSeason(true); }
            if (days < 0.5) { setValidateDays(true); }
            if (dateStarting.length < 1 ) { setValidateDateStarting(true); }

            return false
        }
        else { return true }
    }

    const resetValidation = () => {
       
        setValidateAdventure(false); 
        setValidateSeason(false)
        setValidateDateStarting(false)
        setValidateDays(false)
    }

    const handleSubmit = () =>{
        
        resetValidation();
           
        let allIsValid =  handleValidation();

        if (allIsValid){

            console.log('posta equipment, lägg till spinner (då ser man inte heller ev validerade fält)')
        }
        else{
            console.log('inte godkänt enligt handlesubmit')
            return
        }

    }

    return(

        <FrostedBackground headline = {'Skapa äventyr'}>

            <Wrapper>
                {/* Adventure */}
                <Label htmlFor = 'adventure'> Namn på äventyr </Label>
                <InputField 
                type = 'text' 
                id = 'adventure'
                value = {adventure}
                onChange = {event=>setAdventure(event.target.value)}
                isValid = {validateAdventure}
                />
                <ValidateMessage displayMessage = {validateAdventure}> Vart ska du nånstans? </ValidateMessage>

                <Label> Årstid </Label>
                <SelectInputStyled 
                name = "season" 
                id = "season"
                type = 'text' 
                value = {season}
                isValid = {validateSeason}   
                onChange = {event=>setSeason(event.target.value)}>
                    <option value = "season"> Välj vilken säsong </option>
                    <option value = "summer"> Sommar </option>
                    <option value = "autumn"> Höst </option>
                    <option value = "winter"> Vinter </option>
                    <option value = "spring"> Vår </option>
                </SelectInputStyled>
                <ValidateMessage displayMessage = {validateSeason}> Osäker? Kolla ut genom fönstret </ValidateMessage>

                {/* Startdatum */}
                <Label htmlFor = "dateStarting"> Startdatum </Label>
                <InputField 
                type = "date"
                name = "dateStarting" 
                id = "dateStarting" 
                onChange = {event=>setDateStarting(event.target.value)}
                isValid = {validateDateStarting}/>
                <ValidateMessage displayMessage = {validateDateStarting}> När ska du ut? </ValidateMessage>

                {/* Hur många dygn */}
                <Label htmlFor = "days"> Hur länge </Label>
                <InputField 
                type = 'number' 
                id = 'days' 
                step = "0.5" 
                placeholder = 'Dygn'
                onChange = {event=>setDays(event.target.value)}
                isValid = {validateDays}
                />
                <ValidateMessage displayMessage = {validateDays}> Hur många dygn? </ValidateMessage>

                {/* <LabelStyled htmlFor="days">Hur långt</LabelStyled>
                <InputFieldStyled type='number' id='days' step="0.5"/> */}

                <SubmitButton onClick={handleSubmit}>Packa ryggsäcken <ArrowForwardIcon src = {arrowForwardICon}/> </SubmitButton>

                





            </Wrapper>
            
        </FrostedBackground>
    )
}

export default AddNewAdventure