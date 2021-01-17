import React from 'react'
// import AnimatedCampfire from '../../Assets/animatedCampire.gif'
// import AnimatedCampfireSmaller from '../../Assets/animatedCampfireSmaller.gif'
import styled from 'styled-components'
import FrostedBackground from '../Shared/FrostedBackground'
import { Adventures } from '../Shared/GlobalStates';
import { useRecoilValue } from 'recoil';


// const Campfire = styled.img`
//     height:7rem;
//     width:auto;
// `;

const Wrapper = styled.div`
    margin: 1rem 1rem 2rem 1rem;

    @media screen and (min-width:600px;){
        margin: 1rem 2rem 2rem 2rem;
    }

`;

const AdventureWrapper = styled.div`
    display:grid;
    align-items: center;
    grid-template-columns: repeat(14, 1fr);
    background-color:rgba(233,235,218,0.8);
    padding: 1rem;

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

const InfoText = styled.p`
    font-weight:bold;
    ${'' /* text-transform: uppercase; */}
    text-align: left;
    grid-column: 3/12;
 
`;

const AllAdventure=()=>{

    const adventures = useRecoilValue(Adventures)



    // const calculateEndDate = () =>{

    //     for (let i = 0; i < adventures.length; i++) {

    //         let day = parseInt(adventures[i].dateStarting.slice(0,2))
    //         let month = parseInt(adventures[i].dateStarting.slice(3,5))
    //         let year = parseInt(adventures[i].dateStarting.slice(6,10))
    //         let duration = parseInt(adventures[i].days)

    //         switch( month ){
                
    //             case 1:
    //             case 3:
    //             case 5:
    //             case 7:
    //             case 8:
    //             case 10:
    //             case 12:
    //                 if(day + duration > 31){
    //                     month = month + 1
    //                     day = (day + duration) - 31
                        
    //                 }
    //                 else {
    //                     day = day + duration
    //                 }
                  
    //             break;

    //             case 2:
    //             if(day + duration > 28){
    //                 month = month + 1
    //                 day = (day + duration) - 28
             
    //             }
    //             break;

    //             case 4:
    //             case 6:
    //             case 9:
    //             case 11:
    //                 if( day + duration > 30){
    //                     month = month + 1
    //                     day = (day + duration) - 30
    //                 }

    //         }
    //         if (month > 12){
    //             year = year + (month - 12)
    //         }

    //         if (day < 10 ){
    //             day = `0${day}`
    //         }
    //         if (month < 10) {
    //             month = `0${month}`
    //         }
    //         return  `${day}-${month}-${year}`

           
    //     }
     
    // }
    // calculateEndDate();

    return(
  
        

        <FrostedBackground headline={'Alla äventyr'}>

        <Wrapper>



            {adventures.map((adventure, index)=> {
                  
              return ( <AdventureWrapper key = {adventure.adventureName + index}>
                    <InfoText> { adventure.adventureName } </InfoText>
              

                </AdventureWrapper> )
            })}

        </Wrapper>

            {/* <Campfire src={AnimatedCampfire} alt="loading..." />
            <Campfire src={AnimatedCampfireSmaller} alt="loading..." /> */}

        </FrostedBackground>
      
      
    )
}

export default AllAdventure