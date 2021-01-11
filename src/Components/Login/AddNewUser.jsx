// import react from 'react'
import styled from 'styled-components'
import mainlogo from '../../Assets/mainlogo.svg'
import backarrow from '../../Assets/backarrow.svg'
import {Link} from 'react-router-dom'
import { isAuthenticatedState } from '../Shared/GlobalStates.jsx';
import { useRecoilState } from "recoil";

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
    border-radius:5px;

`;
const Button=styled.button` 
    display:block;
    margin:auto;
    background-color:${props => props.theme.orange};
    border:none;
    border-radius:5px;
    color:${props => props.theme.white};
    padding:.5rem;
    cursor:pointer;

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
const BackarrowIcon=styled.img` 
    height:1.3rem;
    width:auto;

`
const LinkStyled = styled(Link)`
    text-decoration:none;
    color:${props => props.theme.black};


`;
const AddNewUser = () => {


    return(

      
        <LoginSquare>

            <H1>Skapa ny användare</H1>
            
            <InputSection>
                <Label>Välj användarnamn</Label>
                <Input type='text'></Input>
                <Label>Välj lösenord</Label>
                <Input type='text'></Input>
                <Button>Lägg till ny användare</Button>
              
               <LinkStyled to='/'><BackarrowIcon src={backarrow}></BackarrowIcon></LinkStyled>  
                
            </InputSection>
            <Logo src={mainlogo}></Logo>
            

            
            
          
            

        </LoginSquare>
  
    )
}

export default AddNewUser