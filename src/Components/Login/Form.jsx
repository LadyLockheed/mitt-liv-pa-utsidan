import styled from 'styled-components'
import mainLogo from '../../Assets/mainlogo.svg'
import { Button, InputField, SecondaryButton, ValidateMessage } from '../Shared/ButtonsAndSuch'
import Spinner from '../Shared/Spinner'

const Container = styled.div`
    
    display:grid;
    grid-template-columns: 1fr;
    justify-content: center;
    padding: 1rem;

    @media screen and (min-width: 600px) {
        ${'' /* width: 60%; */}
        grid-template-columns: 1fr 1fr;
        padding-left: 2rem;
 
     
    }

`;
const LoadingWrapper = styled.div`
    display: grid;
    justify-content: center;

    @media screen and (min-width: 600px) {
        grid-column: 1/3;
  
    }
 
`

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

`;
const Label = styled.label` 
   display: block;
   color: ${props => props.theme.black};
   margin-bottom: 0.3rem;
   

`;

const ButtonsWrapper = styled.div`
    width: 60%;
    margin:auto;
    margin-top: 1rem;
    margin-bottom: 2rem;
    

    @media screen and (min-width: 600px) {
        width: 100%;
      
    }
    @media screen and (min-width: 700px) {
       width: 80%;
       margin-top: 2rem;
       
    }
    @media screen and (min-width: 1024px) {
       width: 80%;
       margin-top: 3rem;
     
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


const FrostedStartSquare = (props) => {


    const { headline, topLabel, bottomLabel, topInputValue, topInputSetValue, topInputValidation, bottomInputValidation, topInputValidationMessage, bottomInputValidationMessage, handleSubmit, topButtonText, bottomButtonText, arrowIcon, positionArrowIconOnRight, bottomInputValue, bottomInputSetValue, goToPage, typeOnBottomInputfield, isLoading} = props

    return (
        <>
          
            <Container>
                {isLoading ? <LoadingWrapper><Spinner spinnerMessage={'...jobbar och sliter'} /></LoadingWrapper>
                    :

                    <>
                        <H1> {headline} </H1>
                   
                        <InputSection id='container'>
                             {/* username  */}
                            <Label htmlFor={topLabel}>{topLabel}</Label>
                            <InputField
                                type='text'
                                id={topLabel}
                                value={topInputValue}
                                onChange={event => topInputSetValue(event.target.value)}
                                isValid={topInputValidation}
                            />
                            <ValidateMessage
                                displayMessage={topInputValidation}> {topInputValidationMessage} </ValidateMessage>
                            {/* password */}
                            <Label htmlFor={bottomLabel} > {bottomLabel} </Label>
                            <InputField
                                type={typeOnBottomInputfield}
                                id={bottomLabel}
                                value={bottomInputValue}
                                onChange={event => bottomInputSetValue(event.target.value)}
                                isValid={bottomInputValidation}
                            />
                            <ValidateMessage
                                displayMessage={bottomInputValidation}> {bottomInputValidationMessage} </ValidateMessage>

                            <ButtonsWrapper>
                                <TopButton
                                    disabled={isLoading}
                                    onClick={handleSubmit}>{topButtonText}</TopButton>

                                {positionArrowIconOnRight ?
                                    <BottomButton
                                        onClick={goToPage}
                                        disabled={isLoading}>
                                        <ArrowIcon src={arrowIcon} />
                                        {bottomButtonText}
                                    </BottomButton> :
                                    <BottomButton
                                        onClick={goToPage}
                                        disabled={isLoading}>
                                        {bottomButtonText}
                                        <ArrowIcon src={arrowIcon} />
                                    </BottomButton>
                                   
                                }
                            </ButtonsWrapper>
                        </InputSection>
                        <Logo src={mainLogo}></Logo>
                    </>
                }
            </Container>
        </>

    )
}

export default FrostedStartSquare

