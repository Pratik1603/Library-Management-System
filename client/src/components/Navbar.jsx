import React, { useState } from 'react';
import './Navbar.css';
import { Button } from 'flowbite-react/lib/cjs/components/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate=useNavigate();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#about">Benefits</a>
        <a href="#services">Features</a>
        <a href="#contact">Testimonoals</a> 
        {!currentUser? <Button  gradientDuoTone="pinkToOrange" className="inline" onClick={()=>navigate('/login')}>
            LogIn / SignUp
        </Button>:<img
              className='h-10 w-10 object-cover rounded-full inline' onClick={()=>navigate(`/profile?tab=profile`)}
              src={currentUser.profilePicture}
              alt=''
            />}
       
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar1 ${showMenu ? 'change' : ''}`}></div>
        <div className={`bar2 ${showMenu ? 'change' : ''}`}></div>
        <div className={`bar3 ${showMenu ? 'change' : ''}`}></div>
      </div>
      <div className={`${showMenu ? 'show' : 'not-show'}`}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
        {!currentUser? <Button  gradientDuoTone="pinkToOrange" className="inline" onClick={()=>navigate('/login')}>
            LogIn / SignUp
        </Button>:<img
              className='h-10 w-10 object-cover rounded-full inline' onClick={()=>navigate(`/profile?tab=profile`)}
              src={currentUser.profilePicture}
              alt=''
            />}
      </div>
    </nav>
  );
}

export default Navbar;
