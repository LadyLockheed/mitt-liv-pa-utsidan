import { useState } from 'react'
import arrowBackwardIcon from '../../Assets/backarrow.svg'
import FrostedForm from './FrostedForm'


const AddNewUser = ({setDisplayLogin}) =>{


    const [newUser, setNewUser] = useState('');
    const [newPassword, setNewPassword] = useState('')

    const [validateNewUser, setValidateNewUser] = useState(false)
    const [validateNewPassword, setValidateNewPassword] = useState(false)

    const resetValidation = () => {
       
        setValidateNewUser(false); 
        setValidateNewPassword(false)
        
    }

    const handleValidation = () => {
        //jämför user med listan med users
        if(newUser.length < 1 || newPassword.length < 1 ){

            console.log('nånting blev ej godkänt')
            if( newUser.length < 1 ) { setValidateNewUser(true); }
            if( newPassword.length < 1 ) { setValidateNewPassword(true) }
            return false
        }
        else {
            console.log('allt godkänt')
            return true
        }
       

    }

    const handleSubmit = () => {
        //resetar så att validering kan börja om ifall man enbart fyllt i vissa fält rätt
        console.log('click')
        resetValidation();

       let allIsValid =  handleValidation();

        if (allIsValid){

            console.log('gå tillbaka till login');
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
            topInputValue = { newUser }
            topInputSetValue = { setNewUser }
            topInputValidation = { validateNewUser }
            topInputValidationMessage = {'Denna ska bytas ut till variabel'}

            bottomLabel = {'Väl lösenord'}
            bottomInputValue = { newPassword }
            bottomInputSetValue = { setNewPassword  }
            bottomInputValidation = {validateNewPassword}
            bottomInputValidationMessage  = {'Denna ska bytas ut mot variabel'}

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