import React from 'react'
import styled from 'styled-components'
import { Button, SecondaryButton } from './ButtonsAndSuch'


const ModalWrapper = styled.div`
    background: ${props=> props.theme.black};
    color: ${props=> props.theme.white};
    display: ${props => props.displayModal ? 'block' : 'none'};
    text-align:center;
    width:90%;
    height:40vh;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    padding:0.5rem;
    border-radius:3px;

    @media screen and (min-width: 600px){

        width: 50%;
    }
`; 
const InnerWrapper = styled.div `
    display:grid;
    grid-template-columns:repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    ${'' /* width:90%; */}
    height:40vh;
`;

const Headline = styled.h1 `
    text-align:center;
    grid-column:2/5;
    font-size: 1rem;
`;
const CloseButton = styled.button `
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 3px;
    grid-column: 5/6;
    justify-self: end;
    border: none;
    cursor: pointer;
 

`
const ConfirmButton = styled(Button) `
    grid-column: 2/5;
    grid-row:3/4;
    height:3rem;
    align-self:end;
    
`;

const RegretButton = styled(SecondaryButton)`
    grid-column: 2/5;
    grid-row:4/5;
    height:3rem;
    align-self:end;
`;

//den här ska ta props för headline, vad som ska stå på knappen och en funktion för vad som ska göra om man klickar på confirm
const AlertModal = (props) => {


    const {displayModal, setDisplayModal, headline, confirmFunction} = props
    
   

    return (

        <ModalWrapper displayModal={displayModal}>

            <InnerWrapper>
                <Headline>{headline}</Headline>
                <CloseButton onClick={()=> setDisplayModal(false)}>X</CloseButton>
                <ConfirmButton onClick={()=> confirmFunction()}>Hell yeah</ConfirmButton>
                <RegretButton onClick={()=> setDisplayModal(false)}>Mjaeh</RegretButton>
            </InnerWrapper>
            
        </ModalWrapper>

       
    )

}


export default AlertModal