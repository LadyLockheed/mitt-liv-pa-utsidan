import React from 'react'
import styled from 'styled-components'
import spinnerDayNight from '../../Assets/animatedDayNight.gif'
import {elementHeightState} from './GlobalStates'
import {useRecoilValue} from 'recoil'


const OuterWrapper = styled.div `
    height: ${props => `${props.height}px`};

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

`;

const Spinner = ({ spinnerMessage }) => {

    const height = useRecoilValue(elementHeightState)
    
    return (
        <OuterWrapper height= {height}>
            <InnerWrapper >
                <SpinnerGif src={spinnerDayNight} />
                <SpinnerMessage>{spinnerMessage}</SpinnerMessage>
            </InnerWrapper>
        </OuterWrapper>
    )


}

export default Spinner