// import react from 'react'
import styled from 'styled-components'
import mainLogo from '../../Assets/mainLogo.svg'
import backarrow from '../../Assets/backarrow.svg'
import { Link } from 'react-router-dom'
import { Button, InputField, SecondaryButton } from '../Shared/ButtonsAndSuch'

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
    display:grid;
    grid-template-columns: 1fr;
    justify-content: center;
    padding: 1rem;
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
        height: 45vh;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        padding-left: 2rem;
       
    }
    @media screen and (min-width: 1024px) {
       width: 40%;

    }

`;

const H1 = styled.h1` 
    color: ${props => props.theme.green};
    font-weight: 300;
    font-size: 1.9rem;
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
    ${'' /* margin:auto; */}
    @media screen and (min-width: 600px){
        grid-row: 2/5;
        ${'' /* margin: unset; */}
    }

`;
const Label = styled.label` 
   display: block;
   ${'' /* font-weight: bold; */}
   color: ${props => props.theme.black};
   margin-bottom: 0.3rem;

`;
// const Input = styled.input`  
//     padding: 0.4rem;
//     border: none;
//     width: 90%;
//     margin-bottom: 1rem;
//     border-radius: 3px;
//     border: 1px solid rgba(197,197,197,0.30);

//     &:focus {
//         outline: none;
//     }
// `;

const Input = styled(InputField)`
    margin-bottom: 0.5rem;

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
const AddNewUserButton = styled(Button)` 
    display: block;
    margin: auto;
    margin-bottom: 0.5rem;
    width: 100%;
    color: ${props => props.theme.white};

`;
const LinkStyled = styled(Link)`
    text-decoration:none;
    
`;
const BackButton = styled(SecondaryButton)`
    display: block;
    margin: auto;
    width: 100%;

`;
const ArrowBackIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;

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

`


//Den gär fixar problemet med att hela bakgrunden åker ner ju mer margin-top
//jag har på den frostade rutan.
const InvisibleProblemFixer = styled.div`
    width:100%;
    height:3rem;

    @media screen and (min-width:600px){

        height:10rem;
    }

`;

const AddNewUser = () => {


    return(

        <>
        <InvisibleProblemFixer></InvisibleProblemFixer>
        <Container>

            <H1>Skapa ny användare</H1>
            
            <InputSection>
                <Label>Välj användarnamn</Label>
                <Input type='text'></Input>
                <Label>Välj lösenord</Label>
                <Input type='text'></Input>

                <ButtonsWrapper>
                    <AddNewUserButton>Skapa</AddNewUserButton>
                
                    <LinkStyled to='/'>
                        <BackButton> 
                            <ArrowBackIcon src={backarrow}/> Gå tillbaka</BackButton>
                    </LinkStyled>  
                </ButtonsWrapper>
            </InputSection>
            <Logo src={mainLogo}></Logo>

        </Container>
        {/* <FrostedStartSquare 
        headline = {'Skapa ny användare'}
        labelTop = {'Välj användarnamn'}
        labelBottom = {'Välj lösenord'}
        validateTopInput = { 'Användare finns redan' }    
        /> */}
        </>
  
    )
}

export default AddNewUser