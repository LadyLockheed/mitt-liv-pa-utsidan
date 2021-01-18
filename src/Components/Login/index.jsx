import { useState, useEffect } from 'react'
import AddNewUser from './AddNewUser'
import Login from './Login'
import axios from 'axios'
import { allUsersState } from '../Shared/GlobalStates'
import { useRecoilState } from 'recoil'
// import {currentUserState } from '../Shared/GlobalStates'
// import {useRecoilValue} from 'recoil'
// import LoginTest from './LoginTest'
// import AddNewUserTest from './AddNewUserTest'

const StartPage = () =>{

    const [displayLogin, setDisplayLogin] = useState(true)
    const [allUsers, setAllUsers] = useRecoilState(allUsersState)


    console.log('allUsers: ',allUsers)

    useEffect(()=>{
        console.log('hämtar all users')
        getAllUsers();
      
    },[])

    async function getAllUsers() {

        await axios.get('/api/allUsers')
        .then(res => {
           
           setAllUsers(res.data)
           
        })
        .catch(err => {
            console.log('Something went wrong', err)
          
        })
    };

   
    return (
        <>

            {displayLogin ? 
            <Login setDisplayLogin = {setDisplayLogin} allUsers = {allUsersState}/> 
            :  
            <AddNewUser setDisplayLogin = {setDisplayLogin} />}

        </>
    )
}

export default StartPage