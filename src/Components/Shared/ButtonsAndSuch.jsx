
import styled from 'styled-components'


export const Button = styled.button` 
    background-color: ${props => props.theme.orange};
    color: ${props => props.theme.white};
    border-radius: 3px;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1.6rem;
    font-size: 1rem;
   
    
`

export const SecondaryButton = styled.button` 
    background-color: rgba(0,0,0,0.1);
    color: ${props => props.theme.white};
    border-radius: 3px;
    border: 3px solid ${props => props.theme.orange};
    cursor: pointer;
    padding: 0.5rem 1.6rem;
    font-size: 1rem;
   
    
`

export const theme = {
    black:'#303030',
    orange:'#D38324',
    green:'#606338',
    beige:'#E9EBDA',
    white:'#F9F9F9',
    grey:'#EFEFEF',
    darkgrey:'#BABCAB',
    mediumbeige: '#DBDDCD',
    red:'#D15933',
    yellow: '#D3AC24'
}