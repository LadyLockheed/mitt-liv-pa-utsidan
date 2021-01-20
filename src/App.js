import Application from './Components/Application'
import { BrowserRouter as Router} from 'react-router-dom';
import { RecoilRoot } from "recoil";
import { ThemeProvider } from 'styled-components';
import { theme } from './Components/Shared/ButtonsAndSuch';


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
