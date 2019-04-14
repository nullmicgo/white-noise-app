import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Popover,Tooltip,Modal,Button,OverlayTrigger } from 'react-bootstrap';
import {Animated} from "react-animated-css";
import Cookies from 'universal-cookie';
import Header from './Header';
import {isMobile} from 'react-device-detect';
import TeacherList from '../data/teachers';




class StaffMenu extends Component {   
  
  constructor(props, context) {
    super(props, context);
  


    let teachers = TeacherList.map((teacher) => {
      return (
        <li className="teacher" key={teacher.id} >
          <img className="teacher-img" src={teacher.img_src} alt="teacher" />
          <h3>{teacher.name}</h3>
          <p>{teacher.bio}</p>
        </li>
      );
    }); 

    this.state = {
      show: false,
      teachers: teachers
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



    return (
      <div className="main-container">
      <div className="counter">
        <Header />
      <Animated animationIn="bounceInLeft" animationOut="bounceInLeft" isVisible={true}>


      <div className="main-content">
      <p>請選擇以下其中一種度身訂造的Alpha波鬆弛音樂一經選擇就不能更改</p>
      <br/>
      <br/>
      
      <ul className="group">
        {this.state.teachers}    
      </ul>
    </div>


    <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            {renderLoadingWordings}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer> */}
        </Modal>


      </Animated>
      </div>
  </div>

    );
  }
}

export default StaffMenu;