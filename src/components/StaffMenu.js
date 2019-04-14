import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Popover,Tooltip,Modal,Button,OverlayTrigger } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import Cookies from 'universal-cookie';
import Header from './Header';
import {isMobile} from 'react-device-detect';
const token = '';




const API_ENDPOINT = process.env.API_END_POINT;


const cookies = new Cookies();

class StaffMenu extends Component {   
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose= (e) => {
    this.setState({ show: false });
  }
  handleShow= (e) => {
    this.setState({ show: true });
  }

  doValidation = (e) =>{
    e.preventDefault();
    let path = `../validation`;
    this.props.history.push(path);

  }
  doGiftAndLabel = (e) =>{
    e.preventDefault();
    let path = `../giftAndLabel`;
    this.props.history.push(path);
  }
  doLogout = (e) =>{
    e.preventDefault();
    let path = `/`;
    this.props.history.replace(path);





  }

  componentDidMount() {
    //if not login, go back to Login Screen
    if(!this.props.match.params){
      //for handle 
      const token =atob(this.props.match.params);
      //add to homescreen in safrai will not work cookies
      cookies.set('token', token);
      cookies.remove('token');
      let path = `/`;
      this.props.history.replace(path);
    }
  }

  renderPrintQRCode = () => {
    if (!isMobile) {
        return <button className="btn-validation" type="button" onClick={this.doValidation}>Print QR Code</button>;
    }
    return '';
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
        <h2>MENU</h2>
        <br/>

        {this.renderPrintQRCode()}
        <button className="btn-gift" type="button" onClick={this.doGiftAndLabel}>Gift And Label</button>
        <button className="btn-logout" type="button" onClick={this.doLogout}>Logout</button>
      
      
      
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            {renderLoadingWordings}
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

export default StaffMenu;