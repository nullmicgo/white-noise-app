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
    this.askPermission = this.askPermission.bind(this);
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
    // if(cookies.get('token')){
    //   let path = `staffMenu/`+btoa(cookies.get('token'));
    //   this.props.history.push(path);
    // }
  }


  askPermission() {
    let self = this;

    if (window.confirm("「正能量」想要取用您的位置")){



      if (window.confirm("「正能量」想要訪問你的照片")){
       

          if (window.confirm("「正能量」想要訪問你的聯絡人資料")){
            let path = `staffMenu`;
            self.props.history.push(path);
          }
          else
          {
              self.goBack();
          }


      }
      else
      {
          self.goBack();
      }


    }
    else
    {
        self.goBack();
    }



  }
  goBack(){
    // let path = `/`;
    // this.props.history.replace(path);
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
            <button type="submit"  onClick={this.askPermission} >同意</button>
            <button type="button" onClick={this.goBack} className="diagree">不同意</button>

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