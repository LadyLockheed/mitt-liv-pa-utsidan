import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { isAuthenticatedState, currentUserState, allEquipmentState} from '../Shared/GlobalStates';
import { useSetRecoilState, useRecoilState } from "recoil";
import arrowForwardIcon from '../../Assets/arrowForward.svg'
import Form from './Form'
import axios from 'axios'
import FrostedBackground from '../Shared/FrostedBackground'


const Login = () => {

    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
    const setCurrentUser = useSetRecoilState(currentUserState)

    const history = useHistory();

    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [validateUser, setValidateUser] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)
    const [validateUserMessage, setValidateUserMessage] = useState('x')
    const [validatePasswordMessage, setValidatePassWordMessage] = useState('x')

    // const [allEquipment, setAllEquipment] = useRecoilState(allEquipmentState)
    // console.log('login, allEquipment: ',allEquipment)
    // async function getAllEquipment() {
   
    //     try {
    //         const response = await axios.get('/api/allEquipment')
    //         setAllEquipment(response.data)
    //         console.log('allequipment', response.data)

    //     }
    //     catch (err) {
    //         console.log('Meddelande från frontend: nånting gick fel', err)
         
    //     }
    // };

    async function authenticateUser() {

        try {
                
            const response = await axios.post("/api/authenticateUser", {userName: user, password: password})
              
            if (!response.data) {
               
                setValidateUser(true)
                setValidatePassword(true)
                setValidateUserMessage('Användare eller lösenord är fel')
                setValidatePassWordMessage('Användare eller lösenord är fel')
                setIsLoggingIn(false)
            }
            else {
                // getAllEquipment()
                setCurrentUser(response.data)
                setIsAuthenticatedState(true)
                // getAllEquipment()
                localStorage.setItem('userName',response.data.userName)
                history.push('/allequipment')
            }

        }
        catch (err) {
            console.log('Something went wrong', err)
        }

    }

    const resetValidation = () => {

        setValidateUser(false);
        setValidatePassword(false)

    }

    const handleLogin = () => {

        if (user.length < 1 || password.length < 1) {

            if (user.length < 1) {
                setValidateUser(true)
                setValidateUserMessage('Glöm inte att skriva in nåt')
            }

            if (password.length < 1) {
                setValidatePassword(true)
                setValidatePassWordMessage('Glöm inte att skriva in nåt')
            }

            return
        }

        setIsLoggingIn(true)
        authenticateUser();
    }

    const handleSubmit = () => {
        //resetar så att validering kan börja om ifall man enbart fyllt i vissa fält rätt
        resetValidation();
        //kollar om allt ifyllt är valid
        handleLogin();
    }

    return (
    
        <FrostedBackground useInvisibleProblemFixer={true}>
        <Form
            headline={'Mitt liv på utsidan'}

            topLabel={'Login'}
            topInputValue = { user }
            topInputSetValue = { setUser }
            topInputValidation = {validateUser}
            topInputValidationMessage = {validateUserMessage}

            bottomLabel={'Lösenord'}
            bottomInputValue={password}
            bottomInputSetValue={setPassword}
            bottomInputValidation={validatePassword}
            bottomInputValidationMessage={validatePasswordMessage}
            typeOnBottomInputfield={'text'}

            topButtonText={'Logga in'}
            bottomButtonText={'Jag är ny'}
            isLoading = { isLoggingIn }

            arrowIcon={arrowForwardIcon}
            positionArrowIconOnRight={false}
            goToPage={() => history.push('/addnewuser')}
            handleSubmit={handleSubmit}
            
        />
        </FrostedBackground>
    
    )

    


}

export default Login