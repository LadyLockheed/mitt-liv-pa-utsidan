// import react from 'react'
import styled from 'styled-components'
import mainLogo from '../../Assets/mainLogo.svg'
import {Link, useHistory} from 'react-router-dom'
import { isAuthenticatedState } from '../Shared/GlobalStates';
import { useRecoilState } from "recoil";
import { Button } from '../Shared/ButtonsAndSuch'
import FrostedBackground from '../Shared/FrostedBackground'

const LoginSquare = styled.div` 
    display:grid;
    grid-template-columns: 1fr;
    justify-content: center;
    height: 414px;
    width: 80%;
    padding: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(233,235,218,0.8);
    border-radius: 3px;

    @media screen and (min-width: 600px) {
        height: 314px;
        width: 518px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        padding-left: 2rem;
    }

`;
const H1 = styled.h1` 
    color: ${props => props.theme.orange};
    font-weight: 300;
    font-size: 1.7rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    
    @media screen and (min-width: 600px){
        grid-column: 1/3;
        font-size: 2.5rem;
        text-align: left;
    }
`;
const InputSection = styled.section` 

    @media screen and (min-width: 600px){
        grid-row: 2/5;
    }
   
`;
const Label = styled.label` 
   display: block;
   color: ${props => props.theme.orange};
   font-weight: normal;

`;
const Input = styled.input`  
    padding: 0.4rem;
    border: none;
    width: 90%;
    margin-bottom: 1rem;
    border-radius: 3px;
    border: 1px solid rgba(197,197,197,0.30);

    &:focus {
        outline: none;
    }
`;
const LoginButton = styled(Button)` 
    display: block;
    margin: auto;
`;
const NewUserLink = styled.p`
    text-align: center;

`;
const Logo = styled.img` 
    width: 4rem;
    height: auto;
    justify-self: center;

    @media screen and (min-width: 600px){
        width: 6rem;
        heigh: 6rem;
        margin-top: 1rem;
    }

`;
const LinkStyled = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.black};
    cursor: pointer;
    transition: color 0.3s linear;

    &:hover {
        color: ${props => props.theme.red};
    }

`;
const Login = () => {

    const [isAuthenticated, setIsAuthenticated]=useRecoilState(isAuthenticatedState)

    const history=useHistory();
    const getLoggedIn=()=>{
        setIsAuthenticated(true);
        history.push('/allequipment')
    }
    
    return(

        <FrostedBackground>
        <LoginSquare>
          
            <H1>Mitt liv på utsidan</H1>
          
            <InputSection>
                <Label>Login</Label>
                <Input type='text'></Input>
                <Label>Lösen</Label>
                <Input type='text'></Input>
                <LoginButton onClick={getLoggedIn}>Logga in</LoginButton>
              
                <LinkStyled to='/addnewuser'><NewUserLink>Ny användare</NewUserLink></LinkStyled>
                
            </InputSection>

            <Logo src={mainLogo}></Logo>

           

        </LoginSquare>
        </FrostedBackground>
  
    )
}

export default Login