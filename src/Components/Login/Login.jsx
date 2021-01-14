// import react from 'react'
import styled from 'styled-components'
import mainLogo from '../../Assets/mainLogo.svg'
import {Link, useHistory} from 'react-router-dom'
import { isAuthenticatedState } from '../Shared/GlobalStates';
import { useSetRecoilState } from "recoil";
import { Button } from '../Shared/ButtonsAndSuch'


const Container = styled.div`
    
    height: 414px;
    width: 80%;
    background: inherit;
    box-shadow:0 0 1rem 0 rgba(0,0,0, .2);
    position: relative;
    margin-left:auto;
    margin-right:auto;
    z-index:1;
    overflow:hidden;
    border-radius:5px;
    padding: 1rem;
    display:grid;
    grid-template-columns: 1fr;
    justify-content: center;
    background-color: rgba(233,235,218,0.8);
    border-radius: 3px;
  
    ${'' /* @media screen and (min-width: 600px) {
        height: 314px;
        width: 518px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        padding-left: 2rem;
    } */}
    
    &:before{
        content: '';
        background: inherit; 
        position: absolute;
        left: 0;
        right: 0;
        top: 0; 
        bottom: 0;
        box-shadow: inset 0 0 0 2000px rgba(255,255,255,0.3);
        margin:-20px;
        filter: blur(15px);
        z-index:-1;
    }
    @media screen and (min-width: 600px) {
        width: 30%;
        height: 45vh;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        padding-left: 2rem;
       
    }

`;

// const LoginSquare = styled.div` 
//     display:grid;
//     grid-template-columns: 1fr;
//     justify-content: center;
//     height: 414px;
//     width: 80%;
//     padding: 1rem;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: rgba(233,235,218,0.8);
//     border-radius: 3px;

//     @media screen and (min-width: 600px) {
//         height: 314px;
//         width: 518px;
//         grid-template-columns: 1fr 1fr;
//         grid-template-rows: 1fr 1fr 1fr 1fr;
//         padding-left: 2rem;
//     }

// `;
const H1 = styled.h1` 
    color: ${props => props.theme.green};
    font-weight: 300;
    font-size: 1.7rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    
    @media screen and (min-width: 600px){
        grid-column: 1/3;
        font-size: 2.3rem;
        text-align: left;
    }

    @media screen and (max-width:722px){
        font-size:2rem;
        
    }
`;
const InputSection = styled.section` 

    @media screen and (min-width: 600px){
        grid-row: 2/5;
    }
   
`;
const Label = styled.label` 
   display: block;
   color: ${props => props.theme.black};
  ${'' /* font-weight:bold; */}

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
const NewUserLink = styled.p`
    text-align: center;

`;
const LinkStyled = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.black};
    cursor: pointer;
    transition: color 0.3s linear;

    &:hover {
        color: ${props => props.theme.white};
    }

`;

//Den gär fixar problemet med att hela bakgrunden åker ner ju mer margin-top
//jag har på den frostade rutan.
const InvisibleProblemFixer = styled.div`
    width:100%;
    height:4rem;

    @media screen and (min-width:600px){

        height:10rem;
    }

`;
const Login = () => {

    
    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
  
    const history=useHistory();
    const getLoggedIn=()=>{
        setIsAuthenticatedState(true);
        history.push('/allequipment')
    }
    
    return(
<>
       <InvisibleProblemFixer></InvisibleProblemFixer>
        <Container>
          
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

           

        </Container>
  
  </>
    )
}

export default Login