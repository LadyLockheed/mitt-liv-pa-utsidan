import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil';
import { allEquipmentState } from '../../Shared/GlobalStates'
import Accordion from '../../Shared/Accordion'
import autumnIcon from '../../../Assets/autumnLeafIcon.svg'
import summerIcon from '../../../Assets/summerSunIcon.svg'
import winterIcon from '../../../Assets/winterSnowFlaceIcon.svg'
import springIcon from '../../../Assets/springBranchIcon.svg'
import FrostedBackground from '../../Shared/FrostedBackground'
import { SecondaryButton } from '../../Shared/ButtonsAndSuch'
import backArrowWhite from '../../../Assets/backArrowWhite.svg'


const Wrapper = styled.div`
    border-radius: 3px;
    display: grid;
    margin: 1rem;
   
    grid-template-columns: 1fr;
    grid-template-areas: 
    'header'
    'accordion'
    'accordion'
    'accordion'
    'notes'
    'notes'
    'notes'
    'map'
    'map'
    'map'
    'map'
    'bottom';

    @media screen and (min-width: 700px){

        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-areas: 
        'header header header header'
        'accordion accordion notes notes'
        'accordion accordion notes notes'
        'accordion accordion map map'
        'accordion accordion map map'
        'bottom . . .';
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

    span{
        font-weight: bold;
        margin:4px;
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
    margin: 0.5rem;
  
    .totalWeight {
        color: ${props => props.theme.black};
        font-size: 1.2rem;
        text-align: right;
        margin-bottom: 0;
        margin-top: 8px;
    }
   
`;

const StyledAccordion = styled.div`
    height: 20rem;
    overflow:scroll;
    overflow-x: hidden;
    background-color: ${props => props.theme.white};
    border-radius: 3px;
    &::-webkit-scrollbar {
        display: none;
    }
 
    @media screen and (min-width: 600px){
        max-height: 26rem;
    }
`

const StyledNoteInputWrapper = styled.div`
    grid-area: notes;
    margin: 0.5rem;
 
`;

const StyledNoteInput = styled.textarea`
    width: 96%;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    border: none;
    resize: none;
    padding: 8px;
`;

const StyledMapWrapper = styled.div`
    grid-area: map;
    margin: 0.5rem;
`;

const StyledMap = styled.div`
    
    border: 1px solid black;
    background-color: grey;
    height: 15rem;
    width: 100%;

`;

const StyledGoBackButton = styled(SecondaryButton)`
    grid-area: bottom;
    margin-left: 0.5rem;
`;
const StyledArrowIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
`;


const SpecificAdventure = (props) => {

    const { setDisplayAllAdventures, specificAdventure } = props;
    const allEquipment = useRecoilValue(allEquipmentState)
    const packingListArray = specificAdventure.packingList

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

    const calculatedIcon = (season) => {

        if (season === 'autumn') return autumnIcon;
        if (season === 'summer') return summerIcon
        if (season === 'winter') return winterIcon
        if (season === 'spring') return springIcon

    }

    return (
        <FrostedBackground>
            <Wrapper>

                <StyledHeader>

                    <StyledHeadlineWrapper>
                        <StyledSeasonIcon src={calculatedIcon(specificAdventure.season)} />
                        <StyledAdventureName>{specificAdventure.adventure}</StyledAdventureName>
                    </StyledHeadlineWrapper>
                    <p className='date'>{specificAdventure.dateStarting}</p>
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
                    <p className='totalWeight'>Total vikt: <br /> {totalWeight/1000} kg</p>

                </StyledAccordionWrapper>

                <StyledNoteInputWrapper>

                    <StyledSubHeadline htmlFor='notes'>Noteringar</StyledSubHeadline>
                    <StyledNoteInput
                        id='notes'
                        rows='5'
                        type='text'
                    />
                    <button>Spara</button>

                </StyledNoteInputWrapper>


                <StyledMapWrapper>

                    <StyledSubHeadline>Karta</StyledSubHeadline>
                    <StyledMap></StyledMap>

                </StyledMapWrapper>

                <StyledGoBackButton onClick={() => setDisplayAllAdventures(true)}>
                <StyledArrowIcon src={backArrowWhite}/>Tillbaka</StyledGoBackButton>

            </Wrapper>
        </FrostedBackground>
    )
}

export default SpecificAdventure