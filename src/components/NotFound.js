import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon,Popover,Tooltip,Modal,Button,OverlayTrigger } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import Cookies from 'universal-cookie';
import Header from './Header';


const NotFound = () => (



<div className="main-container">
<div className="counter">
  <Header />
<div className="main-content home">
<Animated  animationIn="rubberBand" animationOut="fadeOut" isVisible={true}>

  <div className="main-content not-found">
    <i className="material-icons icn-error">error_outline</i>
    <h2>Page Not Found</h2>
  </div>
</Animated>


  <br/><br/><br/>
</div>
</div>
</div>



);

export default NotFound;