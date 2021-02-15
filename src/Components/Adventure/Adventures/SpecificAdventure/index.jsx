import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

//globalstates
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { allEquipmentState, allAdventuresState } from '../../../Shared/GlobalStates'

//Components
import Accordion from '../../../Shared/Accordion'
import AdventureNotes from './AdventureNotes'
import Map from './Map'
import FrostedBackground from '../../../Shared/FrostedBackground'
import { SecondaryButton } from '../../../Shared/ButtonsAndSuch'
import AlertModal from '../../../Shared/AlertModal'
import Spinner from '../../../Shared/Spinner'

//images
import autumnIcon from '../../../../Assets/autumnLeafIcon.svg'
import summerIcon from '../../../../Assets/summerSunIcon.svg'
import winterIcon from '../../../../Assets/winterSnowFlaceIcon.svg'
import springIcon from '../../../../Assets/springBranchIcon.svg'
import backArrowBlack from '../../../../Assets/backArrowBlack.svg'
import trashcanIcon from '../../../../Assets/trashcanIconBlack.svg'


const Wrapper = styled.div`
    border-radius: 3px;
    display: grid;
    margin: 1rem;
   
    grid-template-columns: 1fr;
    grid-template-areas: 
    'header'
    'map'
    'map'
    'map'
    'notes'
    'notes'
    'notes'
    'accordion'
    'accordion'
    'accordion'
    'backButton'
    'deleteButton';

    @media screen and (min-width: 750px){

        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-areas: 
        'header header header header header'
        'map map map map map'
        'map map map map map'
        'notes notes notes notes notes'
        'notes notes notes notes notes'
        'accordion accordion accordion accordion accordion'
        'accordion accordion accordion accordion accordion'
        'accordion accordion accordion accordion accordion'
        'accordion accordion accordion accordion accordion'
        'backButton backButton . . deleteButton';
    }

   
`;


const StyledHeader = styled.div`
    grid-area: header;
    color: ${props => props.theme.black};

    .date{
        display:inline-block;
        margin-top:0;
        font-size: 0.8rem;
        margin-left: 4px;
      
    }

    .start-date{
        margin-left: 3rem;
    }

    span{
        font-weight: bold;
        margin-left: 3px;
        margin-right: -2px;
    }

`;
const StyledHeadlineWrapper = styled.div`
    display:flex;
    align-items: center;
 
`;

const StyledSeasonIcon = styled.img`
    height: 2rem;
    width: auto;
    margin-right: 16px;
`
const StyledAdventureName = styled.p`
    color: ${props => props.theme.black};
    font-size: 1.5rem;
    margin-bottom: 0;
    margin-top:0;
    text-align: left;

    @media screen and (min-width: 600px){
        font-size: 2rem;
    }
   
`;

const StyledSubHeadline = styled.p`
    color: ${props => props.theme.black};
    margin-bottom: 0.1rem;
    margin-top: 0;
    text-align:right;
    margin-right: 0.3rem;

`
const StyledAccordionWrapper = styled.div`
    grid-area: accordion;
    margin: 1rem;
    margin-top: 0;

    .totalWeight {
        color: ${props => props.theme.black};
        font-size: 1.2rem;
        text-align: right;
        margin-bottom: 0;
        margin-top: 8px;
    }
   
`;

const StyledAccordion = styled.div`
    height: 19rem;
    overflow:scroll;
    overflow-x: hidden;
    background-color: ${props => props.theme.white};
    border-radius: 3px;

    &::-webkit-scrollbar {
        display: none;
    }
 
    @media screen and (min-width: 600px){
        height: 25rem;
    }
`

const StyledNoteInputWrapper = styled.div`
    grid-area: notes;
    margin: 1rem;
    margin-top:0;

    @media screen and (min-width: 750px){
        margin-top:1rem;
    }
 
`;

const StyledMapWrapper = styled.div`
    grid-area: map;
    margin: 1rem;
    margin-top:0;

    @media screen and (min-width: 750px){
        margin-top:1rem;
    }
`;

const StyledGoBackButton = styled(SecondaryButton)`
    grid-area: backButton;
    margin: 1rem;
    color: ${props => props.theme.black};
    font-weight: bold;
    width: 90%;

    @media screen and (min-width: 750px){
        margin-bottom: 0;

    }
`;
const StyledArrowIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
`;

const TrachcanIcon = styled.img`
    grid-area: deleteButton;
    height: 1.5rem;
    width: auto;
    align-self:end;
    transition: all .2s ease-in-out;
    justify-self: end;
    margin-right: 0.5rem;
    cursor:pointer;
  
  &:hover {
    transform: scale(1.4);
  }
    
`;


const SpecificAdventure = (props) => {

    const { setDisplayAllAdventures, specificAdventure, longAndLat } = props;
    const allEquipment = useRecoilValue(allEquipmentState)
    const setAllAdventures = useSetRecoilState(allAdventuresState)
    const packingListArray = specificAdventure.packingList
    const [displayModal, setDisplayModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    let packingListEquipment = [];
    let totalWeight = 0;

    packingListArray.forEach((listId) => {
        allEquipment.find((equipment) => {
            if (equipment._id === listId) {

                packingListEquipment.push(equipment)
                totalWeight = totalWeight + equipment.weight

            }

        })
    })

    useEffect(() => {

    }, [specificAdventure])

    const calculatedIcon = (season) => {

        if (season === 'autumn') return autumnIcon;
        if (season === 'summer') return summerIcon
        if (season === 'winter') return winterIcon
        if (season === 'spring') return springIcon

    }

    const handleDelete = () => {

        setDisplayModal(true)
    }

    async function deleteAdventure(id) {
        console.log(id)
        setIsLoading(true)
        try {
            const response = await axios.delete('/api/deleteAdventure', { data: { _id: id } })
            console.log(response)
            getAllAdventures();

        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)
        }
    }

    async function getAllAdventures() {

        try {

            const response = await axios.get('/api/allAdventures')
            setAllAdventures(response.data)
            setIsLoading(false)
            setDisplayAllAdventures(true)

        }
        catch (err) {
            console.log('Meddelande från frontend: nånting gick fel', err)

        }
    };

    return (
        <FrostedBackground>

            {displayModal &&
                <AlertModal
                    setDisplayModal={setDisplayModal}
                    confirmFunction={() => deleteAdventure(specificAdventure._id)}
                />
            }
            {isLoading ? <Spinner spinnerMessage={'Tar bort äventyr'} /> :
                <Wrapper>

                    <StyledHeader>

                        <StyledHeadlineWrapper>
                            <StyledSeasonIcon src={calculatedIcon(specificAdventure.season)} />
                            <StyledAdventureName>{specificAdventure.adventure}</StyledAdventureName>
                        </StyledHeadlineWrapper>
                        <p className='date start-date'>{specificAdventure.dateStarting}</p>
                        <span>-</span>
                        <p className='date'> {specificAdventure.dateEnding}</p>

                    </StyledHeader>

                    <StyledAccordionWrapper>

                        <StyledSubHeadline>Packlista</StyledSubHeadline>
                        <StyledAccordion>

                            <Accordion

                                equipmentList={packingListEquipment}
                                displayDotOrBox={'dot'}
                            />

                        </StyledAccordion>
                        <p className='totalWeight'>Total vikt: <br /> {totalWeight / 1000} kg</p>

                    </StyledAccordionWrapper>

                    <StyledNoteInputWrapper>

                        <StyledSubHeadline htmlFor='notes'>Noteringar</StyledSubHeadline>
                        <AdventureNotes specificAdventure={specificAdventure} />

                    </StyledNoteInputWrapper>


                    <StyledMapWrapper>

                        <StyledSubHeadline>Karta</StyledSubHeadline>
                        <Map longAndLat={longAndLat} />
                    </StyledMapWrapper>

                    <StyledGoBackButton onClick={() => setDisplayAllAdventures(true)}>
                        <StyledArrowIcon src={backArrowBlack} />Tillbaka</StyledGoBackButton>

                    <TrachcanIcon src={trashcanIcon} onClick={() => handleDelete()} ></TrachcanIcon>

                </Wrapper>
            }


        </FrostedBackground>
    )
}

export default SpecificAdventure