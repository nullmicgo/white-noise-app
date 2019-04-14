import React from 'react';
import { HashRouter } from 'react-router-dom'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'; 

import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import StaffMenu from './StaffMenu';
import GiftAndLabel from './GiftAndLabel';
import Validation from './Validation';
import SuccessPage from './SuccessPage';
import PrintQRCode from './PrintQRCode';
import LocationPermission from './LocationPermission';





/* 
//We can use this way to pass props into the Route
<Route  path="/about" render={ () => <About/>} />  
*/
const App = () => (
  <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/locationPermission" component={LocationPermission} />
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