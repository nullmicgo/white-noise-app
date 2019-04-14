import React from 'react';
import { NavLink } from 'react-router-dom';



const Header = () => (
  <header>
    <span className="icn-logo">   <img src="headerLOGO.png" width="100" alt="white-noise-logo" width="46"/> 正能量 White Noise </span>
    {/* <ul className="main-nav">
      <li><NavLink exact to="/" activeStyle={{background:'#0988c3'}} >Home</NavLink></li>
      <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
      <li><NavLink to="/teachers">Teachers</NavLink></li>
      <li><NavLink to="/courses">Courses</NavLink></li>
    </ul>     */}
  </header>
);

export default Header;