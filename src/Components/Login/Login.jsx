// import react from 'react'
import styled from 'styled-components'
import mainlogo from '../../Assets/mainlogo.svg'
import {Link, useHistory} from 'react-router-dom'
import { isAuthenticatedState } from '../Shared/GlobalStates';
import { useRecoilState } from "recoil";
import { Button } from '../Shared/ButtonsAndSuch'

const LoginSquare=styled.div` 
    height:314px;
    width:518px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:rgba(233,235,218,0.8);
    display:grid;
    grid-template-columns:1fr 1fr;
    grid-template-rows:1fr 1fr 1fr 1fr;
    padding-left:2rem;
    border-radius:5px;
   
   

`;
const H1=styled.h1` 
    color:${props => props.theme.orange};
    font-weight:300;
    font-size:2.5rem;
    margin-top:1.5rem;
    margin-bottom:1rem;
    grid-column:1/3;

`;

const InputSection=styled.section` 
    
    grid-row:2/5;

`;
const Label=styled.label` 
   display:block;
   color:#D38324;
   font-weight:normal;

`;
const Input=styled.input`  
    ${'' /* border-radius:5px; */}
    padding:.5rem;
    border:none;
    width:90%;
    margin-bottom:1rem;
    border-radius:3px;

`;
const LoginButton=styled(Button)` 
    display:block;
    margin:auto;
`;

const NewUserLink=styled.p`
    text-align:center;

`
const Logo=styled.img` 
    width:6rem;
    heigh:6rem;
    justify-self:center;
    margin-top:1rem;

`
const LinkStyled = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.black};


`;
const Login = () => {

    //lägg till variabel för userauthenticated
    const [isAuthenticated, setIsAuthenticated]=useRecoilState(isAuthenticatedState)

    const history=useHistory();
    const getLoggedIn=()=>{
        setIsAuthenticated(true);
        history.push('/allequipment')
    }
    
    return(

      
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

            <Logo src={mainlogo}></Logo>

        </LoginSquare>
  
    )
}

export default Login