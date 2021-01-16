// import react from 'react'
import  { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import mainLogo from '../../Assets/mainLogo.svg'
import {Link, useHistory} from 'react-router-dom'
import { isAuthenticatedState } from '../Shared/GlobalStates';
import { useSetRecoilState } from "recoil";
import { Button, SecondaryButton, InputField, ValidateMessage } from '../Shared/ButtonsAndSuch'
import arrowForwardIcon from '../../Assets/arrowForward.svg'


const Container = styled.div`
    
    height: 80vh;
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
        width: 60%;
        height: 47vh;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        padding-left: 2rem;
       
    }
  
    @media screen and (min-width: 1024px) {
       width: 50%;
       border: 1px solid blue;
       height: 50vh;
       
    }

`;

const H1 = styled.h1` 
    color: ${props => props.theme.green};
    font-weight: 300;
    font-size: 1.7rem;
    margin-top: 1.5rem;
    margin-bottom: 0;
    text-align: center;
    
    @media screen and (min-width: 600px){
        grid-column: 1/3;
        font-size: 2.3rem;
        text-align: left;
        margin-bottom: 1rem;
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
   margin-bottom: 0.3rem;
   

`;

const Input = styled(InputField)`

    ${'' /* margin-bottom: 0.5rem; */}

`;

const ButtonsWrapper = styled.div`
    width: 60%;
    margin:auto;
    margin-top: 1rem;

    @media screen and (min-width: 600px) {
        width: 100%;
        margin-top: 0.5rem;

    }
    @media screen and (min-width: 700px) {
       width: 80%;
       
    }
    @media screen and (min-width: 1024px) {
       width: 80%;
       
    }

`
const LoginButton = styled(Button)` 
    display: block;
    margin: auto;
    margin-bottom: 0.5rem;
    width: 100%;
    color: ${props => props.theme.white};
`;
const LinkStyled = styled(Link)`
    text-decoration: none;
    
`;

const AddNewUserButton = styled(SecondaryButton)` 
    display: block;
    margin: auto;
    width: 100%;
    color: ${props => props.theme.white};
`;

const ArrowForwardIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
    margin-left: 0.3rem;

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

//Den gär fixar problemet med att hela bakgrunden åker ner ju mer margin-top
//jag har på den frostade rutan.
const InvisibleProblemFixer = styled.div`
    width:100%;
    height:3rem;

    @media screen and (min-width:600px){

        height:10rem;
    }

`;
const Login = () => {

        useEffect( () => {
        
            getAllUsers();
          
        },[])
    
        async function getAllUsers() {
            // setIsLoading(true)
            // setDisplayErrorInfo(false)
            await axios.get('/api/allUsers')
            .then(res => {
    
                setAllUsers(res.data)
                // setIsLoading(false)
            })
            .catch(err => {
                console.log('Something went wrong', err)
                // setDisplayErrorInfo(true)
            })
        };


   
    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
  
   
    const history=useHistory();
    const [allUsers, setAllUsers] = useState([])
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')

    const [validateUser, setValidateUser] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)

    const resetValidation = () => {
       
        setValidateUser(false); 
        setValidatePassword(false)
        
    }

    const handleValidation = () => {
        //jämför user med listan med users
        if(user.length < 1 || password.length < 1 ){

            console.log('nånting blev ej godkänt')
            if( user.length < 1 ) {setValidateUser(true)}
            if( password.length < 1 ) {setValidatePassword(true)}
            return false
        }
        else {
            console.log('allt godkänt')
            return true
        }
       

    }

    const handleSubmit = () => {
        //resetar så att validering kan börja om ifall man enbart fyllt i vissa fält rätt
        resetValidation();

       let allIsValid =  handleValidation();

        if (allIsValid){

            console.log(' hämtar data för allequipment (och kanske ävan alla adventures)');
           
    
            setIsAuthenticatedState(true);
            history.push('/allequipment')
        }
        else{
            console.log('inloggningen misslyckades')
          
            return
        }
        
       
    }
    
    return(
<>
       <InvisibleProblemFixer></InvisibleProblemFixer>
        <Container>
          
            <H1>Mitt liv på utsidan</H1>
          
            <InputSection>
                <Label htmlFor = 'user'> Login </Label>
                <Input 
                type='text'
                id = 'user'
                value = {user}
                onChange = {event=>setUser(event.target.value)}
                isValid = {validateUser}
                />
                <ValidateMessage displayMessage = {validateUser}>Användare finns/glömde user</ValidateMessage>

                <Label htmlFor = 'password'> Lösen </Label>
                <Input 
                type='text'
                id = 'password'
                value = {password}
                onChange = {event=>setPassword(event.target.value)}
                isValid = {validatePassword}
                />
                <ValidateMessage displayMessage = {validatePassword}>Glöm ej lösen</ValidateMessage>

                <ButtonsWrapper>
                    <LoginButton onClick={handleSubmit}>Logga in</LoginButton>
        
                    <LinkStyled to='/addnewuser'>
                        <AddNewUserButton>Jag är ny
                            <ArrowForwardIcon src = {arrowForwardIcon}/>
                        </AddNewUserButton>
                    </LinkStyled>
                </ButtonsWrapper>

            </InputSection>

            <Logo src={mainLogo}></Logo>

           

        </Container>
  </>
    )
}

export default Login