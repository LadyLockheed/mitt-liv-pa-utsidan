// import react from 'react'
import styled from 'styled-components';
import Header from './Header';
import landingImage from './Assets/landingpageDSC00149.JPG';
import Login from './Login';
const App=styled.div`
  box-sizing:border-box;
  padding: 0;
  margin: 0;
  height:100vh;
  background-image:url(${landingImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
 
` ;









const Application=()=>{


    return(
        <App>Application

        
         <Header/>
         <Login/>
        
         
            {/* <LoginSquare>

                <H1>Mitt liv på utsidan</H1>
                <Label>Login</Label>
                <Input type='text'></Input>
                <Label>Lösen</Label>
                <Input type='text'></Input>
                <Button>Logga in</Button>
                <NewUserLink>Ny användare</NewUserLink>
                
            </LoginSquare> */}

     
         


        {/* <H1>

            lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum  lorem ipsum lorem ipsum

          
        </H1> */}
        
           
        
        </App>
        
    )
}

export default Application
