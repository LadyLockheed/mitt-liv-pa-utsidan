import  { useState } from 'react'
import {  useHistory } from 'react-router-dom'
import { isAuthenticatedState } from '../Shared/GlobalStates';
import { useSetRecoilState } from "recoil";
import arrowForwardIcon from '../../Assets/arrowForward.svg'
import FrostedForm from './FrostedForm'




const Login = ({setDisplayLogin}) => {

    const setIsAuthenticatedState = useSetRecoilState(isAuthenticatedState)
  
   
    const history=useHistory();
    // const [allUsers, setAllUsers] = useState([])
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
        console.log('click')
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
    
        <FrostedForm
            headline={'Mitt liv på utsidan'}

            topLabel= {'Login'}
            topInputValue = { user }
            topInputSetValue = { setUser }
            topInputValidation = {validateUser}
            topInputValidationMessage = {'Denna ska bytas ut till variabel'}

            bottomLabel = {'Lösenord'}
            bottomInputValue = { password }
            bottomInputSetValue = {setPassword}
            bottomInputValidation = {validatePassword}
            bottomInputValidationMessage  = {'Denna ska bytas ut mot variabel'}

            topButtonText = {'Logga in'}
            bottomButtonText = {'Jag är ny'}

            arrowIcon = {arrowForwardIcon}
            positionArrowIconOnRight= {false}
            setDisplayLogin = {()=> setDisplayLogin(false)}
            handleSubmit = {handleSubmit}
      />
   
    )


}

export default Login