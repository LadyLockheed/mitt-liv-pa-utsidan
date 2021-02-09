import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import FrostedBackground from '../../Shared/FrostedBackground'
import { allAdventuresState } from '../../Shared/GlobalStates';
import { useRecoilValue } from 'recoil';
import autumnIcon from '../../../Assets/autumnLeafIcon.svg'
import summerIcon from '../../../Assets/summerSunIcon.svg'
import winterIcon from '../../../Assets/winterSnowFlaceIcon.svg'
import springIcon from '../../../Assets/springBranchIcon.svg'
import { SelectInput } from '../../Shared/ButtonsAndSuch'
// import { useHistory } from 'react-router-dom'

const Wrapper = styled.div`
   
    margin: 1rem;
    max-height: 61vh;
    overflow:scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }

`;

const WrapperSelectInput = styled.div`

    display:grid;
    grid-template-columns: 1fr;
    
    
    @media screen and (min-width: 600px){
        grid-template-columns: 1fr 1fr;

    }
`;

const StyledSelectInput = styled(SelectInput)`
    margin-left:1rem;
    margin-right: 1rem;

`
const ItemWrapper = styled.div`
    display:grid;
    grid-template-columns: repeat(14, 1fr);

`;

const AdventureWrapper = styled.div`
    display:grid;
    align-items: center;
    padding: 1rem;
    background-color:rgba(233,235,218,0.8);

    &:nth-child(odd) {
        background-color:rgb(219,221,205);
    }
    &:nth-child(even) {
        background-color:rgb(233,235,218);
    }
    &:first-child {
        border-radius: 3px 3px 0px 0px;
    }
    &:last-child {
        border-radius: 0px 0px 3px 3px;
    }

    &:hover {
        cursor:pointer;
    }

`;

const StyledDateWrapper = styled.div`

    font-size: 0.8rem;
    margin:0;
   
    span{
      
        display:block;
    }
    
    .streck{
       font-weight: bold;
    }

    @media screen and (min-width: 600px){
        span{
            
            display:inline-block;
            margin-right: 0.2rem;
        }
        
    }

`
const NameAndDateWrapper = styled.div`
    grid-column: 2/11;
  
    @media screen and (min-width: 600px){
        grid-column: 2/11;
    }
`;
const SeasonIcon = styled.img`
    height: 1.5rem;
    width: auto;
    margin-right: 1rem;
    align-self: center;

    @media screen and (min-width: 600px){
        grid-column: 1/2;
    }
    
`;
const AdventureName = styled.p`
    font-weight:bold;
    text-align: left;
    font-size: 0.8rem;
    margin:0;

    
    @media screen and (min-width: 600px){
        font-size: 1rem;
  
    }

`;

const StyledDays = styled.p`
    margin: 0;
    grid-column: 11/15;
    text-align: center;
    justify-self: end;
    font-size: 0.8rem;
    align-self: center;

    span{
        font-weight: bold;
        display:block;
    }

    @media screen and (min-width: 600px){
        grid-column: 12/15;
        font-size: 1rem;
       
       
    }
 
`;


const AllAdventure = (props) => {

    const { setDisplayAllAdventures, setSpecificAdventure } = props
    const allAdventures = useRecoilValue(allAdventuresState)

    const [filter, setFilter] = useState('')
    const [sorting, setSorting] = useState('')
    let filteredAdventures = allAdventures

    const updateFilter = ({ target: { value } }) => {

        setFilter(value);
    };

    const updateSorting = ({ target: { value } }) => {

        setSorting(value);
    };

    if (filter || sorting) {

        if (filter) {

            filteredAdventures = filteredAdventures.filter((adventure) => adventure.season === filter)
        }
        if (sorting) {

            if (sorting === 'highest') {
                filteredAdventures = [...filteredAdventures].sort((a, b) => {
                    return b.days - a.days
                })
            }
            if (sorting === 'lowest') {
                filteredAdventures = [...filteredAdventures].sort((a, b) => {
                    return a.days - b.days
                })
            }

        }

    }

    useEffect(()=>{

    },[filteredAdventures])

    const calculatedIcon = (season) => {

        if (season === 'autumn') return autumnIcon;
        if (season === 'summer') return summerIcon
        if (season === 'winter') return winterIcon
        if (season === 'spring') return springIcon

    }

    return (

        <FrostedBackground headline={'Alla äventyr'}>

            <WrapperSelectInput>
                <StyledSelectInput
                    className='seasonSelect'
                    name="season"
                    id="season"
                    type='text'
                    value={filter}
                    onChange={updateFilter}
                >
                    <option value=''>Välj årstid</option>
                    <option value=''>Alla</option>
                    <option value="autumn">Höst</option>
                    <option value="winter">Vinter</option>
                    <option value="spring">Vår</option>
                    <option value="summer">Sommar</option>

                </StyledSelectInput>

                <StyledSelectInput
                    className='sortingSelect'
                    name="days"
                    id="days"
                    type='text'
                    value={sorting}
                    onChange={updateSorting}
                >
                    <option value=''>Sortera</option>
                    <option value=''>Senast inlagda</option>
                    <option value="lowest">Minst antal dagar</option>
                    <option value="highest">Mest antal dagar</option>


                </StyledSelectInput>

            </WrapperSelectInput>
            <Wrapper>

                {filteredAdventures.map((adventure) => {

                    return (


                        <AdventureWrapper key={adventure._id} onClick={() => { setDisplayAllAdventures(false); setSpecificAdventure(adventure) }}>

                            <ItemWrapper>

                                <SeasonIcon src={calculatedIcon(adventure.season)} />
                                <NameAndDateWrapper>
                                    <AdventureName> {adventure.adventure} </AdventureName>

                                    <StyledDateWrapper>
                                        <span>{adventure.dateStarting}</span>
                                        <span className='streck'>-</span>
                                        <span>{adventure.dateEnding}</span>

                                    </StyledDateWrapper>

                                </NameAndDateWrapper>


                                <StyledDays>
                                    <span>{adventure.days} </span>dygn

                                </StyledDays>
                            </ItemWrapper>

                        </AdventureWrapper>

                    )
                })}

            </Wrapper>

        </FrostedBackground>


    )
}

export default AllAdventure