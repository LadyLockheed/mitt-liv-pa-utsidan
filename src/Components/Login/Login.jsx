import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { isAuthenticatedState, currentUserState, allUsersState } from '../Shared/GlobalStates';
import { useSetRecoilState } from "recoil";
import arrowForwardIcon from '../../Assets/arrowForward.svg'
import FrostedForm from './FrostedForm'
import axios from 'axios'


const Login = () => {

    async function authenticateUser(user) {

        try {
                
            const response = await axios.post("/api/authenticateUser", {userName: user, password: password})
              
                // console.log('response.data: ',response.data)
            if (!response.data) {
               
                setValidateUser(true)
                setValidatePassword(true)
                setValidateUserMessage('Användare eller lösenord är fel')
                setValidatePassWordMessage('Användare eller lösenord är fel')
                setIsLoggingIn(false)
            }
            else {
                setCurrentUser(response.data)
                setIsAuthenticatedState(true)
                history.push('/allequipment')
            }

        }
        catch (err) {
            console.log('Something went wrong', err)

        }

    }


    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
    const setCurrentUser = useSetRecoilState(currentUserState)
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const history = useHistory();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    
    const [validateUser, setValidateUser] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)
    const [validateUserMessage, setValidateUserMessage] = useState('x')
    const [validatePasswordMessage, setValidatePassWordMessage] = useState('x')

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
        authenticateUser(user);
    
    }



    const handleSubmit = () => {
        //resetar så att validering kan börja om ifall man enbart fyllt i vissa fält rätt
        resetValidation();
        //kollar om allt ifyllt är valid
        handleLogin();

    }



    return (

        <FrostedForm
            headline={'Mitt liv på utsidan'}

            topLabel={'Login'}
            topInputValue={user}
            topInputSetValue={setUser}
            topInputValidation={validateUser}
            topInputValidationMessage={validateUserMessage}

            bottomLabel={'Lösenord'}
            bottomInputValue={password}
            bottomInputSetValue={setPassword}
            bottomInputValidation={validatePassword}
            bottomInputValidationMessage={validatePasswordMessage}
            typeOnBottomInputfield={'text'}

            topButtonText={'Logga in'}
            bottomButtonText={'Jag är ny'}
            disableButton = { isLoggingIn }

            arrowIcon={arrowForwardIcon}
            positionArrowIconOnRight={false}
            goToPage={() => history.push('/addnewuser')}
            handleSubmit={handleSubmit}
           

        />

    )


}

export default Login