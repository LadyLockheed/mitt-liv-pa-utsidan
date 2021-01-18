import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { isAuthenticatedState, currentUserState, allUsersState } from '../Shared/GlobalStates';
import { useSetRecoilState , useRecoilValue} from "recoil";
import arrowForwardIcon from '../../Assets/arrowForward.svg'
import FrostedForm from './FrostedForm'




const Login = (props) => {
    //ska ta in props allUSers som index har hämtat
    const { setDisplayLogin } = props

    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
    const setCurrentUser = useSetRecoilState(currentUserState)
    const allUsers = useRecoilValue(allUsersState)
   
    const history = useHistory();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')

    const [validateUser, setValidateUser] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)
    const [validateUserMessage, setValidateUserMessage] = useState('x')
    const [validatePasswordMessage, setValidatePassWordMessage] = useState('x')

    const resetValidation = () => {

        setValidateUser(false);
        setValidatePassword(false)

    }

    let currentUser = allUsers.find(oneUser => oneUser.userName === user)
    const handleValidation = () => {

        if (user.length < 1 || password.length < 1 || !currentUser) {

            if (user.length < 1) {

                setValidateUser(true)
                setValidateUserMessage('Glöm inte att skriva in nåt')
            }
            else if (!currentUser) {

                setValidateUser(true)
                setValidatePassword(true)
                setValidateUserMessage('Användare eller lösenord är fel')
                setValidatePassWordMessage('Användare eller lösenord är fel')
            }
            if (password.length < 1) {

                setValidatePassword(true)
                setValidatePassWordMessage('Glöm inte att skriva in nåt')
            }
            
            return false
        }
        
        let isPassWordCorrect = currentUser.password == password
        
        if (!isPassWordCorrect) {
            setValidateUser(true)
            setValidatePassword(true)
            setValidatePassWordMessage('Användare eller lösenord är fel')
            setValidateUserMessage('Användare eller lösenord är fel')
            return false
        }

        return true
    }

    const handleSubmit = () => {
        //resetar så att validering kan börja om ifall man enbart fyllt i vissa fält rätt
        resetValidation();
        //kollar om allt ifyllt är valid
        let allIsValid = handleValidation();

        if (allIsValid) {
            //validering ok
            //sparar currentUser i globalstates och går in på allEquipmentsidan
            setCurrentUser(currentUser)
            setIsAuthenticatedState(true);
            history.push('/allequipment')

        }
        //validering ej ok
        else { return }

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

            arrowIcon={arrowForwardIcon}
            positionArrowIconOnRight={false}
            setDisplayLogin={() => setDisplayLogin(false)}
            handleSubmit={handleSubmit}

        />

    )


}

export default Login