// import react from 'react'
import styled from 'styled-components'
import autumnleaf from './Assets/autumnleaf.svg'

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
   
   

`;
const H1=styled.h1` 
    color:#D38324;
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

`;
const Button=styled.button` 
    display:block;
    margin:auto;
    background-color:#D38324;
    border:none;
    border-radius:5px;
    color:#F4F4F4;
    padding:.5rem;
    
    

`;

const NewUserLink=styled.p`
    text-align:center;


`
const Image=styled.img` 
    width:5rem;
    heigh:5rem;
    border:1px solid pink;
    justify-self:center;
    ${'' /* align-self:center; */}
    margin-top:1rem;

`



const Login=()=>{


    return(

      
        <LoginSquare>

            <H1>Mitt liv på utsidan</H1>
            
            <InputSection>
                <Label>Login</Label>
                <Input type='text'></Input>
                <Label>Lösen</Label>
                <Input type='text'></Input>
                <Button>Logga in</Button>
                <NewUserLink>Ny användare</NewUserLink>
            </InputSection>
            <Image src={autumnleaf}></Image>
            
            
          
            

        </LoginSquare>
  
    )
}

export default Login