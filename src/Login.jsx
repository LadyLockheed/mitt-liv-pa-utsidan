// import react from 'react'
import styled from 'styled-components'
import Header from './Header'
import landingImage from './Assets/landingpageDSC00149.JPG'

const LoginSquare=styled.div` 
    height:414px;
    width:718px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:rgba(233,235,218,0.8);

   

`;
const H1=styled.h1` 
    color:#D38324;
    font-weight:300;
    font-size:2rem;
    margin:0;

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

`;
const Button=styled.button` 
    display:block;
    background-color:#D38324;
    border:none;
    border-radius:5px;
    color:#F4F4F4;
    padding:.5rem;

`;

const NewUserLink=styled.p` 


`

const Login=()=>{


    return(

      
         <LoginSquare>

            <H1>Mitt liv på utsidan</H1>
            <Label>Login</Label>
            <Input type='text'></Input>
            <Label>Lösen</Label>
            <Input type='text'></Input>
            <Button>Logga in</Button>
            <NewUserLink>Ny användare</NewUserLink>

            </LoginSquare>


        
    )
}

export default Login