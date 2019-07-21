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
      page:0,
      paid:false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goToSlide = this.goToSlide.bind(this);


  }

  handleClose= (e) => {
    this.setState({ show: false });
  }
  handleShow= (e) => {
    this.setState({ show: true });
  }


  goToSlide= (e, targetValue) => {
   
      console.log("goToSlide  >>"+targetValue);
      if(targetValue===4){
        this.setState({ page: 0,paid:true });

      }else{
        this.setState({ page: targetValue });
      }     


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


    const loadingContainerStyle ={
      position:'fixed',
      width: '100%',
      height: '120%',
      backgroundColor: 'black',
      top:'-5px',
      backgroundImage: `url(/images/player.png)`,
      backgroundSize: 'cover'

    };

    const overTenHoursContainerStyle ={
      position:'fixed',
      width: '100%',
      height: '120%',
      backgroundColor: 'black',
      top:'-5px',
      backgroundSize: 'cover',
      color: 'white',
      fontSize:'20px',
      padding:'50px'
      

    };

    let content = "";
    if(this.state.paid===true){
      content = "鳥叫聲";

    }else{
      content = <img src="loading.png" onClick={(e) => this.goToSlide(e,1)} />;


    }



    const loadingWithAnimation =   
    <div style={loadingContainerStyle} hidden={this.state.page !== 0}>
    <div className="loadingIconInPlayer">
    <div className="request-loader">
    <span>{content}</span>
  </div>
</div>
</div>;

    const overTenHours =   <div style={overTenHoursContainerStyle} hidden={this.state.page !==  1}>
        閣下十小時免費使用的療癒時間已經結束, 請問是否需要付費繼續享用療癒時間?
        <br/> <br/> <br/> <br/> <br/>
        <button type="submit" className="payment-no-button ">否</button>
        <button type="submit" className="payment-yes-button " onClick={(e) => this.goToSlide(e,2)}>是</button>

    </div>;


    const paymentScreen =   <div style={overTenHoursContainerStyle} hidden={this.state.page !== 2}>
    <div className="payment-text">繼續享用療癒時間每分鐘只需US$1.00</div>
    <br/> <br/> <br/> <br/> <br/>
    <img src="visa.png" className="payment-image"></img>
    <button type="submit" className="payment-confirm-button" onClick={(e) => this.goToSlide(e,3)}>繼續</button>

    </div>;


const inputGreatSaying =   <div style={overTenHoursContainerStyle} hidden={this.state.page !== 3}>
<div className="payment-text">請輸入勵志金句後繼續播放</div>
<br/> <br/> 
<input type="text" className="payment-input" ></input>
<br/> <br/> <br/>
<button type="submit" className="payment-confirm-button" onClick={(e) => this.goToSlide(e,4)}>繼續</button>

</div>;



const birdSinging =   
<div style={loadingContainerStyle} show={this.state.page !== 4}>
<div className="loadingIconInPlayer">
<div className="">
<span>鳥叫聲</span>
</div>
</div>
</div>;

    // let finalShowingContent= "";
    // if(this.state.page === 0 ){
    //   finalShowingContent = loadingWithAnimation;
    // }else if(this.state.page === 1 ){
    //   finalShowingContent = overTenHours;
    // }else if(this.state.page === 2 ){
    //   finalShowingContent = paymentScreen;
    // }else if(this.state.page === 3 ){
    //   finalShowingContent = inputGreatSaying;
    // }else if(this.state.page === 4 ){
    //   finalShowingContent = birdSinging;
    // }

    return (




      <main >


          {loadingWithAnimation}
          {overTenHours}
          {paymentScreen}
          {inputGreatSaying}
        


      </main>

            
   

    );
  }
}

export default MusicPlayer;