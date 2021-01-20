import styled from 'styled-components'
import mainLogo from '../../Assets/mainLogo.svg'
import { Button, InputField, SecondaryButton, ValidateMessage } from '../Shared/ButtonsAndSuch'

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
const TopButton = styled(Button)` 
    display: block;
    margin: auto;
    margin-bottom: 0.5rem;
    width: 100%;
    color: ${props => props.theme.white};
`;


const BottomButton = styled(SecondaryButton)` 
    display: block;
    margin: auto;
    width: 100%;
    color: ${props => props.theme.white};
`;

const ArrowIcon = styled.img`
    height: 0.5rem;
    width: auto;
    margin-bottom:0.1rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;

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

const FrostedStartSquare = (props) => {

 const { headline, topLabel, bottomLabel, topInputValue, topInputSetValue, topInputValidation, bottomInputValidation, topInputValidationMessage, bottomInputValidationMessage, handleSubmit, topButtonText, bottomButtonText, arrowIcon, positionArrowIconOnRight, bottomInputValue, bottomInputSetValue, goToPage, typeOnBottomInputfield, disableButton } = props


    return (
    <>
        <InvisibleProblemFixer></InvisibleProblemFixer>
        <Container>

            <H1> { headline } </H1>
            
            <InputSection>
                <Label htmlFor = { topLabel }>{topLabel}</Label>
                <Input 
                type='text'
                id = { topLabel }
                value = { topInputValue }
                onChange = {event=>topInputSetValue(event.target.value)}
                isValid = {topInputValidation}    
                />
                <ValidateMessage 
                displayMessage = {topInputValidation }> {topInputValidationMessage} </ValidateMessage>

                <Label htmlFor =  { bottomLabel } > { bottomLabel } </Label>
                <Input 
                type = {typeOnBottomInputfield}
                id = { bottomLabel }
                value = { bottomInputValue }
                onChange = { event=>bottomInputSetValue(event.target.value) }
                isValid = { bottomInputValidation }
                />
                <ValidateMessage 
                displayMessage = { bottomInputValidation }> { bottomInputValidationMessage } </ValidateMessage>

                <ButtonsWrapper>
                        <TopButton 
                        disabled = { disableButton }
                        onClick = { handleSubmit }>{topButtonText}</TopButton>
                
                        { positionArrowIconOnRight ? 
                            <BottomButton 
                            onClick = { goToPage }
                            disabled = { disableButton }> 
                                    <ArrowIcon src = {arrowIcon}/>
                                    {bottomButtonText}
                            </BottomButton> :
                            <BottomButton 
                            onClick = { goToPage }
                            disabled = { disableButton }> 
                                {bottomButtonText} 
                                <ArrowIcon src = {arrowIcon}/>
                            </BottomButton>
                         }
     
                </ButtonsWrapper>
            </InputSection>
            <Logo src={mainLogo}></Logo>

        </Container>
        </>

    )
}

export default FrostedStartSquare

