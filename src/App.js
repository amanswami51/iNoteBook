import Navbar from './components/Navbar.js';
import About from './components/About.js';
import React, {useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';
import UserInfo from './components/UserInfo';
import ForgetPassword from './components/ForgetPassword';
import ReadMore from './components/ReadMore';
function App() {
  //For dark mode
  const [mode, setMode] = useState('light');
  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#0a355c';
      document.body.style.color = 'white';
      toast.success("Dark Mode is Enabled")
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = '#d9e6e5';
      document.body.style.color = 'black';
      toast.success("Light Mode is Enabled");
    }
  }
 
  return (
    <>
      <Router>
        <Navbar title="iNoteBook" mode={mode} toggleMode={toggleMode} />
        <Toaster/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Userinfo" element={<UserInfo />} />
            <Route path="/password/reset" element={<ForgetPassword />} />
            <Route path="/readmore" element={<ReadMore />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;




































