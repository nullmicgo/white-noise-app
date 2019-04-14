import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Popover,Tooltip,Modal,Button,OverlayTrigger } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import Cookies from 'universal-cookie';
import Header from './Header';





const API_ENDPOINT = process.env.API_END_POINT;



const cookies = new Cookies();


class LocationPermission extends Component {   
  
  
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      show: false,
      errorMessage: null
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loginSuccessAction = this.loginSuccessAction.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    

  }
  loginSuccessAction= (e) => {
    let path = `staffMenu/`+btoa(cookies.get('token'));
    this.props.history.push(path);
  }

  handleClose= (e) => {
    this.setState({ show: false });
  }
  handleShow= (e) => {
    this.setState({ show: true });
  }
  componentDidMount() {
    //if already login, go to staff Menu
    if(cookies.get('token')){
      let path = `staffMenu/`+btoa(cookies.get('token'));
      this.props.history.push(path);
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    let path = `locationPermission/`;
    self.props.history.push(path);

  }
  goBack(e){
    e.preventDefault();
    let path = `/`;
    this.props.history.replace(path);
  }
 


  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    let renderLoadingWordings;
    if (this.state.errorMessage) {
       renderLoadingWordings = "";
      } else {
        renderLoadingWordings =  <h4>Loading ... </h4>;

    }
    
    return (
      <div className="main-container">
      <div className="counter">
        <Header />
      <Animated animationIn="bounceInLeft" animationOut="bounceInLeft" isVisible={true}>

      <div className="main-content home">
        <p>我們需要存取以下資料</p>
        <div>
          <ul>
          <li>授予 app 使用你位置的權限</li>

          <br/>
          <br/>
          <br/>
            
          </ul>
        </div>
        <form  onSubmit={this.handleSubmit}>
            <button type="submit">同意</button>
            <button type="button" onClick={this.goBack} className="diagree">不同意</button>

        </form>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            {renderLoadingWordings}
            <p>{(this.state.errorMessage)}</p>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      </div>
      </Animated>
      </div>
  </div>

    );
  }
}

export default LocationPermission;