import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FrostedBackground from '../../Shared/FrostedBackground'
import { Button, Label, InputField, SelectInput, ValidateMessage } from '../../Shared/ButtonsAndSuch';
import arrowForwardICon from '../../../Assets/forwardArrowWhite.svg'

const Wrapper = styled.div`
 
    background-color:${props => props.theme.mintGreen};
    margin:1rem;
    padding:1rem;
    border-radius:3px;

    @media  screen and (min-width: 600px){

        ${'' /* margin: 2rem 2rem 2rem 2rem; */}

    }   
`;

const SelectInputStyled = styled(SelectInput)` 
    
    option {

        &:first-child {
            color: ${props => props.theme.orange};
        }
        &:nth-child(odd){
            background-color: ${props => props.theme.grey};  
        }

    }


`;

const SubmitButton = styled(Button)`
    display: block;
    margin: auto;
    margin-top: 1rem;
`;

const ArrowForwardIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
`;


const AddNewAdventure = (props) => {

    const { setDisplayForm, setNewAdventureInfo, newAdventureInfo } = props

    //TODO Datestarting och days syns ej om man backar tillbaka from packlistan. Funkar ju i editEquipment, varför inte här?
    //kollar om man redan har skrivit något i formuläret om man backar tillbaka från skapa packlista, så att allt man skrev fortfarande är ifyllt
    useEffect(()=>{
        if(newAdventureInfo && newAdventureInfo.adventure){
           
            setAdventure(newAdventureInfo.adventure)
            setSeason(newAdventureInfo.season)
            setDateStarting(newAdventureInfo.dateStarting)
            setDays(newAdventureInfo.days)
        }

    },[newAdventureInfo])

    
    const [adventure, setAdventure] = useState('')
    const [season, setSeason] = useState('')
    const [dateStarting, setDateStarting] = useState('')
    const [days, setDays] = useState(null)

    const [validateAdventure, setValidateAdventure] = useState(false)
    const [validateSeason, setValidateSeason] = useState(false)
    const [validateDateStarting, setValidateDateStarting] = useState(false)
    const [validateDays, setValidateDays] = useState(false)


    let adventureInfo = {
        adventure: adventure,
        season: season,
        dateStarting: dateStarting,
        days: parseFloat(days),
        notes: ''
    }

    const handleAddNewAdventure = () => {
        
        resetValidation();

        if (adventure.length < 1 || season === 'season' || season === '' || days < 0.5 || dateStarting.length < 1) {
        
            if (adventure.length < 1) { setValidateAdventure(true); }
            if (season === 'season' || season === '') { setValidateSeason(true); }
            if (days < 0.5) { setValidateDays(true); }
            if (dateStarting.length < 1) { setValidateDateStarting(true); }

            return
        }
  
        setDisplayForm(false)
        setNewAdventureInfo({...adventureInfo, dateEnding:calculateEndDate(adventureInfo)})
    }

    const resetValidation = () => {

        setValidateAdventure(false);
        setValidateSeason(false)
        setValidateDateStarting(false)
        setValidateDays(false)
    }

    return (

        <FrostedBackground headline={'Skapa äventyr'}>

            <Wrapper>
                {/* Adventure */}
                <Label htmlFor='adventure'> Namn på äventyr </Label>
                <InputField
                    type='text'
                    id='adventure'
                    value={adventure}
                    onChange={event => setAdventure(event.target.value)}
                    isValid={validateAdventure}
                />
                <ValidateMessage displayMessage={validateAdventure}> Vart ska du nånstans? </ValidateMessage>

                <Label> Årstid </Label>
                <SelectInputStyled
                    name="season"
                    id="season"
                    type='text'
                    value={season}
                    isValid={validateSeason}
                    onChange={event => setSeason(event.target.value)}>
                    <option value="season"> Välj vilken säsong </option>
                    <option value="summer"> Sommar </option>
                    <option value="autumn"> Höst </option>
                    <option value="winter"> Vinter </option>
                    <option value="spring"> Vår </option>
                </SelectInputStyled>
                <ValidateMessage displayMessage={validateSeason}> Osäker? Kolla ut genom fönstret </ValidateMessage>

                {/* Startdatum */}
                <Label htmlFor="dateStarting"> Startdatum </Label>
                <InputField
                    type="date"
                    name="dateStarting"
                    id="dateStarting"
                    onChange={event => setDateStarting(event.target.value)}
                    isValid={validateDateStarting} />
                <ValidateMessage displayMessage={validateDateStarting}> När ska du ut? </ValidateMessage>

                {/* Hur många dygn */}
                <Label htmlFor="days"> Hur många dygn</Label>
                <InputField
                    type='number'
                    id='days'
                    step="0.5"
                    // placeholder='Dygn'
                    onChange={event => setDays(event.target.value)}
                    isValid={validateDays}
                />
                <ValidateMessage displayMessage={validateDays}> Hur många dygn? </ValidateMessage>

                {/* <LabelStyled htmlFor="days">Hur långt</LabelStyled>
                <InputFieldStyled type='number' id='days' step="0.5"/> */}

                <SubmitButton onClick={handleAddNewAdventure}>Packa ryggsäcken <ArrowForwardIcon src={arrowForwardICon} /> </SubmitButton>







            </Wrapper>

        </FrostedBackground>
    )
}

export default AddNewAdventure

const calculateEndDate = (adventure) => {

    let day = parseInt(adventure.dateStarting.slice(8, 10))
    let month = parseInt(adventure.dateStarting.slice(5, 7))
    let year = parseInt(adventure.dateStarting.slice(0, 4))
    let duration = parseInt(adventure.days)

    switch (month) {

        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            if (day + duration > 31) {
                month = month + 1
                day = (day + duration) - 31

            }
            else {
                day = day + duration
            }

            break;

        case 2:
            if (day + duration > 28) {
                month = month + 1
                day = (day + duration) - 28

            }
            break;

        case 4:
        case 6:
        case 9:
        case 11:
            if (day + duration > 30) {
                month = month + 1
                day = (day + duration) - 30
            }
            break;
        default:
            console.log('nånting default')

    }

    if (month > 12) {
        //obs, only count for +1 year, not several. Maybe need to change form.
        year = year + 1
        month = month + 1
    }

    if (day < 10) {
        day = `0${day}`
    }
    if (month < 10) {
        month = `0${month}`
    }
    return `${year}-${month}-${day}`

}
