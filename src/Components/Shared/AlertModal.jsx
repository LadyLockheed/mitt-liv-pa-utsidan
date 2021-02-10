import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button, SecondaryButton } from './ButtonsAndSuch'


const ModalWrapper = styled.div`
    min-width: 15rem;
    background: ${props=> props.theme.white};
    color: ${props=> props.theme.white};
    text-align:center;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    padding:0.5rem;
    border-radius:3px;
    display:grid;
    grid-template-columns:repeat(5, 1fr);

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    @media screen and (min-width: 600px){

        width: 50%;
    }

   
`; 


const Headline = styled.h1 `
    text-align:center;
    grid-column:2/5;
    font-size: 1rem;
    color:black;
`;
const CloseButton = styled.button `
    height: 1.4rem;
    width: 1.5rem;
    border-radius: 3px;
    border: 1px solid ${props=> props.theme.darkgrey};
    color: ${props => props.theme.black};
    grid-column: 5/6;
    justify-self: end;
    cursor: pointer;
    padding-bottom:3px;
 
`;
const ConfirmButton = styled(Button) `
    grid-column: 2/5;
    margin-bottom: 1rem;
    margin-top: 2rem;
    width: 100%;
    
`;

const RegretButton = styled(SecondaryButton)`
    grid-column: 2/5;
    margin-bottom: 1rem;
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.white};
    width: 100%;
`;

//den här ska ta props för headline, vad som ska stå på knappen och en funktion för vad som ska göra om man klickar på confirm
const AlertModal = (props) => {

   
    const {setDisplayModal, confirmFunction} = props
    const ref = useRef();

    const handleConfirm = () => {
        setDisplayModal(false);
        confirmFunction()
    }



    useEffect(()=>{
        const scrollIntoViewOptions = {block: 'center', behavior: 'smooth'}
        let element = document.getElementById('modal')
        element.scrollIntoView(scrollIntoViewOptions)
    },[])
   useEffect(()=>{
    const useOutsideClick = (ref) => {

        console.log(ref)
        // const handleClick = e => {
        //   if (ref.current && !ref.current.contains(e.target)) {
            
        //   }
        };

   },[ref])

    return (

        <ModalWrapper id='modal' ref={ref}>

           
                <Headline>Är du riktigt riktigt riktigt säker?</Headline>
                <CloseButton onClick={()=> setDisplayModal(false)}>x</CloseButton>
                <ConfirmButton onClick={ handleConfirm }>Hell yeah</ConfirmButton>
                <RegretButton onClick={()=> setDisplayModal(false)}>Mjaeh</RegretButton>
          
            
        </ModalWrapper>

       
    )

}


export default AlertModal