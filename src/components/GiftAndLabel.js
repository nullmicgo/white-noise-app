import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QrReader from 'react-qr-reader'
import { Popover,Tooltip,Modal,Button,OverlayTrigger,Grid,Row,Col, Table } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import Cookies from 'universal-cookie';
import Header from './Header';


const API_ENDPOINT = process.env.API_END_POINT;



const cookies = new Cookies();



class GiftAndLabel extends Component {   

  constructor(props){
  
  super(props);
  this.handleScan = this.handleScan.bind(this);
  this.handleShow = this.handleShow.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.giftAndLabelAction = this.giftAndLabelAction.bind(this);

  this.state = {
      delay: 300,
      consumer_code: 'No result',
      show: false,
      isLoading:false,
      membershipLevel:null,
      tngNumber:null,   
      existingLabelAssignDatetime:null ,
      errorCode:null
    }
  }
  giftAndLabelAction() {
    this.setState({ isLoading: true });
    this.handleShow();


    var details = {
      'consumer_code': this.state.consumer_code,
      'staff_token': cookies.get('token'),
      'label_type': 'TNG_EXPERT',
  };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    

    let self = this;
  //  fetch('https://tngrlbpub-pp.tng.asia/tng/service-delievery/login', {
    fetch(API_ENDPOINT+'tng/service-delievery/achievement-labels/assign-achievement-label', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then(function(response) {
      return response.json(); // .text();
    })
    .then(function(resultJson) {
        console.log(resultJson);
        
        if(resultJson.status == "success"){


           self.setState({ errorCode: null });
           self.setState({ isLoading: false });
           self.setState({ consumer_code: null });
           self.setState({ show: false });
           self.setState({ isLoading: false });
           self.setState({ isLoading: false });
           self.setState({ membershipLevel: false });
           self.setState({ tngNumber: null });
           self.setState({ existingLabelAssignDatetime: null });
           self.setState({ errorCode: null });

           self.handleClose();


           let path = `/success`;
           self.props.history.push(path);
        }
        else{


          if(resultJson.errorEN){
            let errorMessage = resultJson.errorEN.toLowerCase();
            errorMessage = errorMessage.replace(/_/g, ' ')
            errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.substr(1);
            self.setState({ errorCode: errorMessage });
          }



          if(resultJson.errorCode == "0001")
          {
            //TODO: back to Login Screen since Session Expired
            cookies.remove('token');
            let path = `/`;
            self.props.history.replace(path);


          }else{
            self.setState({ isLoading: false });
            self.setState({ existingLabelAssignDatetime: resultJson.existingLabelAssignDatetime });
          }
    
        

        }
        
    });


  }



  handleClose() {
    this.setState({ show: false });
  }


  componentDidMount() {
    //if not login, go back to Login Screen
    if(!cookies.get('token')){
      cookies.remove('token');
      let path = `/`;
      this.props.history.replace(path);

    }
  }

  handleShow() {
    this.setState({ show: true });
  }


  handleScan(data){
    if(data){
      this.setState({
        consumer_code: data,
      })

      if(!this.state.show){
          this.setState({ isLoading: true });
          this.handleShow();
          this.validationAction();
          //TODO: Call API
      }
    }
  }
  validationAction(){
          // var details = {
          //     'consumer_code': this.state.result,
          //     'key': cookies.get('token'),
          //     'label_type': 'TNG_EXPERT',
          // };


          var details = {
            'consumer_code': this.state.consumer_code,
            'staff_token': cookies.get('token'),
            'label_type': 'TNG_EXPERT',
        };
          
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          

          let self = this;
        //  fetch('https://tngrlbpub-pp.tng.asia/tng/service-delievery/login', {

          fetch(API_ENDPOINT+'tng/service-delievery/achievement-labels/validate-consumer-code-by-app', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          })
          .then(function(response) {
            return response.json(); // .text();
          })
          .then(function(resultJson) {
              console.log(resultJson);
              
              if(resultJson.status == "success"){
                self.setState({ errorCode: null });


                self.setState({ isLoading: false });
                self.setState({ membershipLevel: resultJson.membershipLevel });
                self.setState({ tngNumber: resultJson.tngNumber });
                self.setState({ existingLabelAssignDatetime: resultJson.existingLabelAssignDatetime });
              }
              else{

                if(resultJson.errorEN){
                  let errorMessage = resultJson.errorEN.toLowerCase();
                  errorMessage = errorMessage.replace(/_/g, ' ')
                  errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.substr(1);
                  self.setState({ errorCode: errorMessage });
                }

                if(resultJson.errorCode == "0001")
                {
                  //TODO: back to Login Screen since Session Expired
                  cookies.remove('token');
                  let path = `/`;
                  self.props.history.replace(path);


                }else{
                  self.setState({ isLoading: false });
                  self.setState({ membershipLevel: resultJson.membershipLevel });
                  self.setState({ tngNumber: resultJson.tngNumber });
                  self.setState({ existingLabelAssignDatetime: resultJson.existingLabelAssignDatetime });
                }
          
              

              }
              
          });
  }
  handleError(err){
    console.error(err)
  }

  doBack = (e) =>{
    e.preventDefault();
     this.props.history.goBack();

  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;






    let popUpDialogTitle;
    let popUpDialogBody;
    let popUpDialogFooter;
    let remark;
    let giftButton;
    if (!this.state.errorCode) {
      giftButton =    <Button bsStyle="success" onClick={this.giftAndLabelAction}>Gift And Label Now</Button>
    }



    if (this.state.errorCode) {
          remark =  <tr>
          <td>Error Message</td>
          <td>{(this.state.errorCode)}</td>
        </tr>
    }


    let showTNGNumber;

    if (this.state.tngNumber) {
      showTNGNumber ="";
      var input = this.state.tngNumber
      var result = [];
      while (input.length) {
          result.push(input.substr(0, 4));
          input = input.substr(4);
      }
      showTNGNumber = result.toString();
      while (showTNGNumber.indexOf(',') !== -1)
      {
        showTNGNumber = showTNGNumber.replace(',', '-');
      }

    }


    if (this.state.isLoading) {
          popUpDialogTitle = "Loading...";
          popUpDialogBody = null;
          popUpDialogFooter = null;
      } else {
        popUpDialogTitle= "Gift And Label";
        popUpDialogBody =            <Modal.Body>
        <h4 className="text-center">TNG# {showTNGNumber}</h4>
        <Table striped bordered condensed hover>
          <tbody>
     
            {remark}
          </tbody>
        </Table>
    </Modal.Body>
    ;

        popUpDialogFooter =         <Modal.Footer>
        
     

       {giftButton}
       &nbsp;
          <Button onClick={this.handleClose}>Close</Button>

        </Modal.Footer> ;
    }
    return (
      <div className="main-container">
      <div className="counter">
        <Header />
      <Animated animationIn="bounceInLeft" animationOut="bounceInLeft" isVisible={true}>

      <div className="main-content home">
          <h2 className="label-gift">Gift And Label</h2>
      <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
          />
        <br/>


        <button className="btn-logout" type="button" onClick={this.doBack}>Go Back</button>
         <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header >
            <Modal.Title id="contained-modal-title-lg" className="text-center">
              {popUpDialogTitle}
            </Modal.Title>
        </Modal.Header>
          {popUpDialogBody}
          {popUpDialogFooter}
        </Modal>
      </div>
      </Animated>
      </div>
  </div>
    );
  }
}
export default GiftAndLabel;