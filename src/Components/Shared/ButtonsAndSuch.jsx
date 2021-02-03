import styled from 'styled-components'



export const Button = styled.button` 
    background-color: ${props => props.theme.orange};
    color: ${props => props.theme.white};
    font-family: 'Quicksand', sans-serif;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1.6rem;
    font-size: 1rem;
   
    
`;

export const SecondaryButton = styled.button` 
    background-color: rgba(255,255,255,0.1);
    font-family: 'Quicksand', sans-serif;
    color: ${props => props.theme.white};
    border-radius: 3px;
    border: 3px solid ${props => props.theme.orange};
    cursor: pointer;
    padding: 0.5rem 1.4rem;
    font-size: 1rem;

`;


export const Label = styled.label`
    font-weight: bold;
    font-size: 0.8rem;
    display: block;
    text-align: left;
    margin-bottom: 0.3rem;
    margin-top: 0.5rem;
    text-transform: uppercase; 

    @media screen and (min-width: 600px){
        font-size: 1rem;
    }

`;

export const InputField = styled.input`
    width: 96%;
    border-radius: 3px;
    border: none;
    padding: 0.3rem;
    border: 1px solid rgba(197,197,197,0.30);
    background-color: ${props => props.theme.white};
    border:2px solid ${props => props.isValid ? `${props.theme.orange}` : `${props.theme.white}`};

    &:focus {
        outline: none;
    }

`;

export const SelectInput = styled.select`
    border-radius: 3px;
    border: none;
    font-family: 'Quicksand', sans-serif;
    font-size:1rem;
    padding: 0.3rem;
    background-color: ${props => props.theme.white};
    border:2px solid ${props => props.isValid ? `${props.theme.orange}` : `${props.theme.grey}`};
    cursor: pointer;

    &:focus {
        outline: none;
    }

    option{
        padding:0.3rem;

        &:first-child {

            color: ${props => props.theme.orange};
        }
        &:nth-child(odd){
            background-color: ${props => props.theme.grey};  
        }
        
        
    }
   
`;

export const ValidateMessage = styled.span`
    color:${props => props.theme.orange};
    visibility: ${props => props.displayMessage ? 'visible' : 'hidden'};
    margin-left: 0.5rem;
    font-weight: bold;
    font-size: 0.8rem;
    display:block;

    @media screen and (min-width: 600px){
        font-size: 1rem;
    }


`;

export const theme = {
    black: '#303030',
    orange: '#D38324',
    green: '#606338',
    beige: '#E9EBDA',
    white: '#F9F9F9',
    grey: '#EFEFEF',
    darkgrey: '#BABCAB',
    mediumbeige: '#DBDDCD',
    red: '#D15933',
    yellow: '#D3AC24',
    mintGreen: '#D4DBD4'
}