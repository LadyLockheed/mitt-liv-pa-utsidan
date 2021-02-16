import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button, SecondaryButton } from './ButtonsAndSuch'
import { HandleOutsideClick } from '../Shared/Helpers'
// import { Transition } from 'react-transition-group';

const ModalWrapper = styled.div`
    min-width: 15rem;
    background: ${props => props.theme.white};
    color: ${props => props.theme.white};
    text-align:center;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${'' /* pga leaflet måste jag ha högst z-index */}
    z-index: 1001;
    padding:0.5rem;
    border-radius:3px;
    display:grid;
    grid-template-columns:repeat(5, 1fr);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: opacity 0.5s;
    opacity: ${props => props.displayModal ? 1 : 0};
    visibility: ${props => props.displayModal ? 'visible' : 'hidden'};
    

    @media screen and (min-width: 600px){

        width: 50%;
    }

`;

const Headline = styled.h1`
    text-align:center;
    grid-column:2/5;
    font-size: 1rem;
    color:black;
`;
const CloseButton = styled.button`
    height: 1.4rem;
    width: 1.5rem;
    border-radius: 3px;
    border: 1px solid ${props => props.theme.darkgreygreen};
    color: ${props => props.theme.black};
    grid-column: 5/6;
    justify-self: end;
    cursor: pointer;
    padding-bottom:3px;
 
`;
const ConfirmButton = styled(Button)`
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

const AlertModal = (props) => {

    const { setDisplayModal, confirmFunction, displayModal } = props
  
    //TODO se nedan
    // <div style ={{visibility: !isloggedData ? "hidden: "visible"}}>

    // const duration = 300;

    // const defaultStyle = {
    //     transition: `opacity ${duration}ms ease-in-out`,
    //     opacity: 0,
    // }

    // const transitionStyles = {
    //     entering: { opacity: 1 },
    //     entered: { opacity: 1 },
    //     exiting: { opacity: 0 },
    //     exited: { opacity: 0 },
    // };


    // when modal opens it scrolls into view
    useEffect(() => {

        if(displayModal){

            const scrollIntoViewOptions = { block: 'center', behavior: 'smooth' }
            let element = document.getElementById('modal')
            element.scrollIntoView(scrollIntoViewOptions)
        }
       
    }, [displayModal])

    //closing modal on click outside
    const ref = useRef();
    // const nodeRef = useRef(null)

    HandleOutsideClick(ref, ()=>displayModal && setDisplayModal(false))

    const handleConfirm = () => {
        setDisplayModal(false);
        confirmFunction()
    }

    return (

        // <ModalWrapper id='modal' ref={ref} displayModal={displayModal}>
        <ModalWrapper id='modal' ref={ref} displayModal={displayModal}>

            <Headline>Är du riktigt riktigt riktigt säker?</Headline>
            <CloseButton onClick={() => setDisplayModal(false)}>x</CloseButton>
            <ConfirmButton onClick={handleConfirm}>Hell yeah</ConfirmButton>
            <RegretButton onClick={() => setDisplayModal(false)}>Mjaeh</RegretButton>


        </ModalWrapper>



    )

}


export default AlertModal