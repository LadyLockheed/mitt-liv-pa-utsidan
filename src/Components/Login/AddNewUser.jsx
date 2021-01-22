import React, { useState } from 'react'
import arrowBackwardIcon from '../../Assets/backarrow.svg'
import FrostedForm from './FrostedForm'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { isAuthenticatedState, currentUserState } from '../Shared/GlobalStates';
import { useSetRecoilState } from "recoil";

const AddNewUser = () => {


    const history = useHistory();

    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
    const setCurrentUser = useSetRecoilState(currentUserState)
    const [isAddingNewUser, setIsAddingNewUser] = useState(false)

    const [newUserName, setNewUserName] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [validateNewUser, setValidateNewUser] = useState(false)
    const [validateNewPassword, setValidateNewPassword] = useState(false)
    const [validateNewUserMessage, setValidateNewUserMessage] = useState('x')
    const [validateNewPasswordMessage, setValidateNewPasswordMessage] = useState('x')

    async function addNewUser() {

        try {

            const responseNewUser = await axios.post("/api/addNewUser", { newUserName: newUserName, newPassword: newPassword })
      
            if (!responseNewUser.data) {
                setIsAddingNewUser(false)
                setValidateNewUser(true)
                setValidateNewUserMessage('Jusernäjm ålrädy täjken')
            }
            else {
                //loggar in om usern blev tillagd
                const responseLogin = await axios.post("/api/authenticateUser", { userName: newUserName, password: newPassword })

                if (!responseLogin.data) {

                    console.log('nånting gick fel vid inloggning')
                    setIsAddingNewUser(false)

                }
                else {
                    setCurrentUser(responseLogin.data)
                    setIsAuthenticatedState(true)
                    localStorage.setItem('userName', responseLogin.data.userName)
                    history.push('/allequipment')
                }

            }

           

        }
        catch (err) {
            console.log('Something went wrong', err)

        }

    }

    const resetValidation = () => {

        setValidateNewUser(false);
        setValidateNewPassword(false)
    }

    const handleAddNewuser = () => {

        if (newUserName.length < 1 || newPassword.length < 1) {

            if (newUserName.length < 1) {
                setValidateNewUser(true);
                setValidateNewUserMessage('Glöm inte att välja fancy namn')
            }

            if (newPassword.length < 1) {
                setValidateNewPassword(true)

                setValidateNewPasswordMessage('Glöm inte välja klurigt lösen')
            }

            return
        }

        setIsAddingNewUser(true)
        addNewUser();


    }

    const handleSubmit = () => {
        //resetar så att validering kan börja om ifall man enbart fyllt i vissa fält rätt

        resetValidation();

        handleAddNewuser();

    }


    return (

        <FrostedForm
            headline={'Skapa ny användare'}

            topLabel={'Välj användarnamn'}
            topInputValue={newUserName}
            topInputSetValue={setNewUserName}
            topInputValidation={validateNewUser}
            topInputValidationMessage={validateNewUserMessage}

            bottomLabel={'Välj lösenord'}
            bottomInputValue={newPassword}
            bottomInputSetValue={setNewPassword}
            bottomInputValidation={validateNewPassword}
            bottomInputValidationMessage={validateNewPasswordMessage}
            typeOnBottomInputfield={'text'}

            topButtonText={'Lägg till'}
            bottomButtonText={'Gå tillbaka'}
            isLoading={isAddingNewUser}

            arrowIcon={arrowBackwardIcon}
            positionArrowIconOnRight={true}
            goToPage={() => history.push('./')}
            handleSubmit={handleSubmit}

        />
    )

}

export default AddNewUser