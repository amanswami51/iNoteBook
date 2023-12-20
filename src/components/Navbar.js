import React from 'react'   //imr
import PropTypes from 'prop-types'
import { Link, useLocation, useNavigate} from "react-router-dom";
import {signOut } from "firebase/auth";
import {auth} from './firebase';

export default function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = (e)=>{
    let flag = window.confirm("Do you want to logout")
    if(!flag){
      return 
    }
    else{
      e.preventDefault();
      signOut(auth).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        navigate('/login')
      }).catch(() => {
        alert("Something went to be wrong");
      });
    }
  }
  return (
    <nav className={`navbar navbar-expand-lg bg-${props.mode} navbar-${props.mode} sticky-top position-sticky`}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">{props.title}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
          </li>
        </ul>
        <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
          <input className="form-check-input" type="checkbox" onClick={props.toggleMode} role="switch" id="flexSwitchCheckDefault" />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.mode==='light'?"Enable DarkMode":"Disable DarkMode"}</label>
        </div>
        {!localStorage.getItem('token')?<div className="navbar-nav">
          <Link to="/login"><button type="button" className="btn btn-primary mx-1 my-1">Login</button></Link>
          <Link to="/signup"><button type="button" className="btn btn-primary mx-1 my-1">Signup</button></Link>
        </div>:
        <div className="navbar-nav">
          <Link to="/Userinfo"><button type="button" className="btn btn-primary mx-1 my-1">User</button></Link>
          <div><button type="button" className="btn btn-primary mx-1 my-1" onClick={handleLogout}>Logout</button></div>
        </div>}
      </div>
    </div>
  </nav>
  );
}



Navbar.protoType = {title: PropTypes.string, indexPage: PropTypes.string}

Navbar.defaultProps = {
    title: "CodeWithAman",
    indexPage: "Main Page"
}