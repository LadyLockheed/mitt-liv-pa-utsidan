import Application from './Components/Application'
import {BrowserRouter as Router} from 'react-router-dom';
import { RecoilRoot } from "recoil";
import { ThemeProvider } from 'styled-components';


// const isAuthenticated = atom({
//   key:'isAuthenticated',
//   default:false
// })

// const usernameState = atom({
//   key:'username',
//   default:'Red'
// })
const theme={
  black:'#303030',
  orange:'#D38324',
  green:'#606338',
  beige:'#E9EBDA',
  white:'#F9F9F9',
  grey:'#EFEFEF'
}


function App() {

  return (

  <RecoilRoot>
    <Router>

        <ThemeProvider theme={theme}>
          <Application/>
        </ThemeProvider>
      

      </Router>
  </RecoilRoot>


    
    
  );
}

export default App;
