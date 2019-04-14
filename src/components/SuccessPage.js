import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon,Popover,Tooltip,Modal,Button,OverlayTrigger } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import Cookies from 'universal-cookie';
import Header from './Header';


const successContainer = {
  color: 'green',
};
const cookies = new Cookies();


class SuccessPage extends Component {   
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
    this.backAction = this.backAction.bind(this);
  }


  componentDidMount() {
    //if not login, go back to Login Screen
    if(!cookies.get('token')){
      cookies.remove('token');
      let path = `/`;
      this.props.history.replace(path);

     
    }
  }

  backAction(){
    this.props.history.goBack();
  }



  render() {
    return (
      <div className="main-container">
      <div className="counter">
        <Header />
      <div className="main-content home">
      <Animated  animationIn="rubberBand" animationOut="fadeOut" isVisible={true}>

    <h2 className="text-center " style={successContainer} >Success <Glyphicon glyph="glyphicon glyphicon-ok" /> </h2>
    </Animated>


        <br/>
        <button className="btn-logout" type="button" onClick={this.backAction}>Close</button>
      </div>
      </div>
  </div>
    );
  }
}

export default SuccessPage;