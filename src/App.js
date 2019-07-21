import React from 'react';
import { HashRouter } from 'react-router-dom'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'; 

import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import StaffMenu from './components/StaffMenu';
import GiftAndLabel from './components/GiftAndLabel';
import Validation from './components/Validation';
import SuccessPage from './components/SuccessPage';
import PrintQRCode from './components/PrintQRCode';
import LocationPermission from './components/LocationPermission';
import MusicPlayer from './components/MusicPlayer';





/* 
//We can use this way to pass props into the Route
<Route  path="/about" render={ () => <About/>} />  
*/
const App = () => (
  <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/locationPermission" component={LocationPermission} />
          <Route exact path="/musicPlayer" component={MusicPlayer} />
          <Route  path="/staffMenu" component={StaffMenu} />    
          <Route  path="/" component={GiftAndLabel} />    
          <Route  path="/validation" component={Validation} />      
          <Route  path="/success" component={SuccessPage} />     
          <Route  path="/printQRCode" component={PrintQRCode} />     
          <Route   component={NotFound} />        
        </Switch>
  </HashRouter>
);
export default App;