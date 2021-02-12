import React from 'react'
import styled from 'styled-components'
import spinnerDayNight from '../../Assets/animatedDayNight.gif'



const OuterWrapper = styled.div `


`
const InnerWrapper = styled.div`
    display: grid;
    justify-content: center;

`
const SpinnerGif = styled.img`
    height:12rem;
    margin:auto;
`;
const SpinnerMessage = styled.h3`
    text-align:center;
`;

const Spinner = ({ spinnerMessage }) => {

    
    return (
        <OuterWrapper>
            <InnerWrapper >
                <SpinnerGif src={spinnerDayNight} />
                <SpinnerMessage>{spinnerMessage}</SpinnerMessage>
            </InnerWrapper>
        </OuterWrapper>
    )


}

export default Spinner