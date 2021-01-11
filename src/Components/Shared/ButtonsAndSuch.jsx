
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

export const theme = {
    black:'#303030',
    orange:'#D38324',
    green:'#606338',
    beige:'#E9EBDA',
    white:'#F9F9F9',
    grey:'#EFEFEF',
    darkgrey:'#BABCAB'
  }