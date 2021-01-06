// import react from 'react'
import styled from 'styled-components'
import autumnleaf from './Assets/autumnleaf.svg'
import backarrow from './Assets/backarrow.svg'

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
    cursor:pointer;
    
    

`;

const NewUserLink=styled.p`
    text-align:center;


`
const Logo=styled.img` 
    width:5rem;
    heigh:5rem;
    border:1px solid pink;
    justify-self:center;
    margin-top:1rem;

`
const BackarrowIcon=styled.img` 
    height:1.3rem;
    width:auto;

`

const Login = (props) => {

    //lägg till variabel för userauthenticated

    const {headline, labelTop, labelBottom, buttonText, displayBackArrow} = props;
    console.log(displayBackArrow)

    return(

      
        <LoginSquare>

            <H1>{headline}</H1>
            
            <InputSection>
                <Label>{labelTop}</Label>
                <Input type='text'></Input>
                <Label>{labelBottom}</Label>
                <Input type='text'></Input>
                <Button>{buttonText}</Button>
               {displayBackArrow ? <BackarrowIcon src={backarrow}></BackarrowIcon> : <NewUserLink>Ny användare</NewUserLink> } 
                
            </InputSection>
            <Logo src={autumnleaf}></Logo>
            

            
            
          
            

        </LoginSquare>
  
    )
}

export default Login