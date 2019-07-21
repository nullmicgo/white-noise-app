import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Popover,Tooltip,Modal,Button,OverlayTrigger } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import Cookies from 'universal-cookie';
import Header from './Header';
import {isMobile} from 'react-device-detect';
import "./MusicPlayer.scss";



class MusicPlayer extends Component {   
  
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

  
  componentDidMount() {

    // let self = this;

    // setTimeout(() => {
    //   if (window.confirm("請選擇以下其中一種度身訂造的Alpha波鬆弛音樂一經選擇就不能更改")){

    //   }
    //   else
    //   {
    //       let path = `/`;
    //       this.props.history.replace(path);
    //   }

    // }, 1000);


 
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


    const containerStyle ={
      position:'fixed',
      width: '100%',
      height: '120%',
      backgroundColor: 'red',
      top:'-5px',
      backgroundImage: `url(/images/player.png)`,
      backgroundSize: 'cover'

    };

    return (




      <main style={containerStyle}>



          <div className="loadingIconInPlayer">

          <div class="request-loader">
          <span>👋</span>
        </div>


          </div>


      </main>

            
   

    );
  }
}

export default MusicPlayer;