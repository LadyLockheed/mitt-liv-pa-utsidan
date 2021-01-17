import { useState, useEffect } from 'react'
import AddNewUser from './AddNewUser'
import Login from './Login'
import axios from 'axios'
// import LoginTest from './LoginTest'
// import AddNewUserTest from './AddNewUserTest'

const StartPage = () =>{

    const [displayLogin, setDisplayLogin] = useState(true)

   //hämta alla user
   //ska de hämtas här eller i login?
   //var hämtar jag allEquipment? Borde göra det i Login? Och sen lägga upp i recoil.

    const [users, setUsers] = useState([])
    console.log(users)

    useEffect(()=>{
        
        getAllUsers();
      
    },[])

    async function getAllUsers() {
        // setIsLoading(true)
        // setDisplayErrorInfo(false)
        await axios.get('/api/allUsers')
        .then(res => {

           console.log(res.data)
           setUsers(res.data)
            // setIsLoading(false)
        })
        .catch(err => {
            console.log('Something went wrong', err)
            // setDisplayErrorInfo(true)
        })
    };

   

   
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