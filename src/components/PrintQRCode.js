import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QrReader from 'react-qr-reader'
import { Label,Popover,Tooltip,Modal,Button,OverlayTrigger,Grid,Row,Col, Table } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import Cookies from 'universal-cookie';
import Header from './Header';
import QRCode from "qrcode.react";




const cookies = new Cookies();


class PrintQRCode extends Component {   

  constructor(props){
  
  super(props);
  this.state = {
      error:null
    }
  }
  handleClose() {
    this.setState({ show: false });
  }
  componentWillMount(){
      document.body.style.backgroundColor = "white";
      document.body.style.textAlign = "center";
      document.body.style.fontSize = '8px';
      document.body.style.lineHeight = '0px';
      document.body.style.height = '45mm';
      document.body.style.marginTop = '-25px';
      document.body.style.marginLeft='-10px';
      document.body.style.marginBottom = '-20px';
  }

  componentWillUnmount(){
      document.body.style.backgroundColor = null;
  }

  componentDidMount(){
    //setTimeout(function(){ 

      window.print();

      window.onafterprint = function(){
        console.log("Printing completed...");
       
        setTimeout(function(){  window.close(); }, 3000);


     }
   // }, 3000);


  }



  render() {

    let topup = cookies.get('topup');
    let facetoface = cookies.get('facetoface');
    let tngnumber = cookies.get('tngnumber');
    
    return (
          <div>
              <div className="qr-print-container">
                <QRCode value={topup} size="140" level="L" />
                <p><h1>TOP-UP {tngnumber}</h1></p>
              </div>

              <div className="qr-print-container">
              <QRCode value={facetoface} size="140" level="L" />
                <p><h1>PAY ME {tngnumber}</h1></p>
              </div>
         </div>
    );
  }
}
export default PrintQRCode;