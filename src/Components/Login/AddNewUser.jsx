import { useState } from 'react'
import arrowBackwardIcon from '../../Assets/backarrow.svg'
import FrostedForm from './FrostedForm'
import { allUsersState } from '../Shared/GlobalStates'
import { useRecoilState } from 'recoil'


const AddNewUser = (props) =>{

    const { setDisplayLogin } = props;
    const [ allUsers, setAllUsers ] = useRecoilState(allUsersState)

    const [newUserName, setNewUserName] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [validateNewUser, setValidateNewUser] = useState(false)
    const [validateNewPassword, setValidateNewPassword] = useState(false)
    const [validateNewUserMessage, setValidateNewUserMessage] = useState('x')
    const [validateNewPasswordMessage, setValidateNewPasswordMessage] = useState('x')

    let newUser = {
        userName: newUserName,
        password:newPassword
    }

    const resetValidation = () => {
       
        setValidateNewUser(false); 
        setValidateNewPassword(false)
        
    }
    let userAlreadyExist = allUsers.find(oneUser => oneUser.userName === newUserName)
    let passwordAlreadyExist = allUsers.find(oneUser => oneUser.password === newPassword)
    const handleValidation = () => {
       
        if(newUserName.length < 1 || newPassword.length < 1 || userAlreadyExist || passwordAlreadyExist ){

            if( newUserName.length < 1 ) {
                setValidateNewUser(true); 
                setValidateNewUserMessage('Glöm inte att välja fancy namn')
            }
            else if ( userAlreadyExist ) {
                setValidateNewUser(true)
                setValidateNewUserMessage('Användarnamnet finns redan')
            }
            if( newPassword.length < 1 ) { 
                setValidateNewPassword(true) 
                setValidateNewPasswordMessage('Glöm inte välja klurigt lösen')
            }
            else if ( passwordAlreadyExist ) {
                setValidateNewPassword(true)
                setValidateNewPasswordMessage('Välj annat lösenord')
            }
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
            //gör en post här och ta bort setAllUsers (det görs i index.js)
            //? hur gör jag så att index.js hämtar alla users igen, login måste veta om det finns nån ny. 
            //? ev om jag tar bort startpage och låter login hämta alla users och sen
            //? använder routing för att hoppa fram och tillbaka.
            setAllUsers([...allUsers, newUser])
            setDisplayLogin(true);
    
        }
        else{

            console.log('inloggningen misslyckades')
          
            return
        }
        
       
    }
    return(

        <FrostedForm
            headline={'Skapa ny användare'}

            topLabel= {'Välj användarnamn'}
            topInputValue = { newUserName }
            topInputSetValue = { setNewUserName }
            topInputValidation = { validateNewUser }
            topInputValidationMessage = { validateNewUserMessage }

            bottomLabel = {'Väl lösenord'}
            bottomInputValue = { newPassword }
            bottomInputSetValue = { setNewPassword  }
            bottomInputValidation = {validateNewPassword}
            bottomInputValidationMessage  = { validateNewPasswordMessage }
            typeOnBottomInputfield = {'text'}

            topButtonText = {'Skapa'}
            bottomButtonText = {'Gå tillbaka'}

            arrowIcon = { arrowBackwardIcon }
            positionArrowIconOnRight= {true}
            setDisplayLogin = {() => setDisplayLogin(true)}
            handleSubmit = {handleSubmit}
    />
    )

}

export default AddNewUser