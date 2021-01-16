import { useState } from 'react'
import AddNewUser from './AddNewUser'
import Login from './Login'
// import LoginTest from './LoginTest'
// import AddNewUserTest from './AddNewUserTest'

const StartPage = () =>{

    const [displayLogin, setDisplayLogin] = useState(true)

   
    return (
        <>

            {displayLogin ? 
            <Login setDisplayLogin={setDisplayLogin}/> 
            :  
            <AddNewUser setDisplayLogin = {setDisplayLogin}/>}

        </>
    )
}

export default StartPage