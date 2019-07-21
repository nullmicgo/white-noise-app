import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QrReader from 'react-qr-reader'
import { Popover,Tooltip,Modal,Button,OverlayTrigger,Grid,Row,Col, Table } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import Cookies from 'universal-cookie';
import Header from './Header';


const API_ENDPOINT = process.env.API_END_POINT;
const cookies = new Cookies();
class Validation extends Component {   

  constructor(props){
  
  super(props);
  this.handleScan = this.handleScan.bind(this);
  this.handleShow = this.handleShow.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.printQRCOde = this.printQRCOde.bind(this);
  this.getFaceToFaceQRCode = this.getFaceToFaceQRCode.bind(this);

  
  
  this.state = {
      delay: 300,
      result: 'No result',
      show: false,
      isLoading:false,
      membershipLevel:null,
      tngNumber:null,   
      existingLabelAssignDatetime:null ,
      faceToFaceQRCode:null,
      errorCode:null
    }
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


  printQRCOde(){
      console.log("print QR Code ");

      console.log(this.state.faceToFaceQRCode);
      window.open('#/printQRCode');


      this.handleClose();
  }

  handleScan(data){
    if(data){
      this.setState({
        result: data,
      })

      // cookies.remove('topup');
      // cookies.remove('facetoface');
      // cookies.remove('tngnumber');
     

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
          this.setState({ errorCode: null });


          var details = {
            'consumer_code': this.state.result,
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
              
              if(resultJson.tngNumber !=null){

                    if(resultJson.errorEN){
                      let errorMessage = resultJson.errorEN.toLowerCase();
                      errorMessage = errorMessage.replace(/_/g, ' ')
                      errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.substr(1);
                      self.setState({ errorCode: errorMessage });
                    }
                    cookies.set('topup', self.state.result);
                    cookies.set('tngnumber', resultJson.tngNumber);

                    //self.setState({ errorCode: null });
                    //self.setState({ isLoading: false });
                    self.setState({ membershipLevel: resultJson.membershipLevel });
                    self.setState({ tngNumber: resultJson.tngNumber });

                    self.setState({ existingLabelAssignDatetime: resultJson.existingLabelAssignDatetime });
                    self.getFaceToFaceQRCode();
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




  getFaceToFaceQRCode(){

    var details = {
      'staff_token': cookies.get('token'),
      'tng_number': this.state.tngNumber,
  };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    

    let self = this;
    fetch(API_ENDPOINT+'tng/service-delievery/get-static-f2f-qr-by-tng-number', {
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

          self.setState({ isLoading: false });
          self.setState({ faceToFaceQRCode: resultJson.code });
          cookies.set('facetoface', resultJson.code);


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



    let labelAssignedDate;
  





    let popUpDialogTitle;
    let popUpDialogBody;
    let popUpDialogFooter;
    let remark;

    if (this.state.errorCode) {
      remark =  <tr>
      <td>Error Message</td>
      <td>{(this.state.errorCode)}</td>
    </tr>

    }



    let showTNGNumber;
    let showPrintButton ="";

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

      showPrintButton = <Button className="btn-print-qr-code" onClick={this.printQRCOde}>Print QR Code</Button>

    }else{
      showPrintButton ="";
    }



    if (this.state.isLoading) {
          popUpDialogTitle = "Loading...";
          popUpDialogBody = null;
          popUpDialogFooter = null;
      } else {
        popUpDialogTitle= "Print QR Code";
        popUpDialogBody =            <Modal.Body>
        <h4 className="text-center">TNG# {showTNGNumber}</h4>
        <Table striped bordered condensed hover>
          <tbody>
          <tr>
              <td>Level</td>
            </tr>
            <tr>
              <td>Label</td>
              <td>{labelAssignedDate}</td>
            </tr>
            {remark}
          </tbody>
        </Table>
    </Modal.Body>
    ;

        popUpDialogFooter =         
        <Modal.Footer>
           {showPrintButton}
           <br/><br/>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer> ;
    }
    return (
      <div className="main-container">
      <div className="counter">
        <Header />
      <Animated animationIn="bounceInLeft" animationOut="bounceInLeft" isVisible={true}>

      <div className="main-content home">
           <h2 className="label-validation">Print QR Code</h2>
      <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '400px' , margin:'auto' }}
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
export default Validation;