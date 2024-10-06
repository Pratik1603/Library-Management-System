import React, { useEffect, useState } from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./loginSignup.scss"
import LockIcon from '@mui/icons-material/Lock';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice.jsx';
import EmailIcon from '@mui/icons-material/Email';
import OAuth from '../../components/OAuth.jsx';
import PersonIcon from '@mui/icons-material/Person';
import img from "../../Images/girlImg.png";
import img1 from "../../Images/reg.png";
function LoginSignup() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  // const [errorMessage1, setErrorMessage1] = useState(null);
 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const {loading1,error:errorMessage1}=useSelector(state=>state.user);
  const handleSignIn = async (e) => {
    e.preventDefault();
    
    console.log(formData);
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
     
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/profile');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        onClickSignIn();
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };


  let container;
  useEffect(() => {
    container = document.getElementsByClassName("login-container")[0];
  })
  const onClickSignUp = () => {
    container.classList.add("sign-up-mode");
  }
  const onClickSignIn = () => {
    container.classList.remove("sign-up-mode");
  }
  return (
    <div className="login-container">
      
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} action="" className="sign-in-form">
            <h2 className="login-title font-semibold">Sign in</h2>
            <div className="login-input-field">
              <PersonIcon />
              <input type='text'
                placeholder='Username'
                id='username'
                style={{ width: "80%"}}
                onChange={handleChange} />
            </div>
            <div className="login-input-field">
              <LockIcon/>
              <input type="password" id='password'
                onChange={handleChange}  placeholder='Password' />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
             
              className='my-2 w-[30%]'
              disabled={loading1 && !errorMessage1}
            >
              {loading1 && !errorMessage1? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>

           
            {errorMessage1 && (
            <Alert className='mt-5' color='failure'>
              {errorMessage1}
            </Alert>
          )}

        
          </form>
          <form onSubmit={handleSignUp} action="" className="sign-up-form">
            <h2 className="login-title font-semibold">Sign up</h2>
            <div className="login-input-field">
              <PersonIcon/>
              <input type="text"   style={{ width: "80%" }} id="username" onChange={handleChange} placeholder='Username' />
            </div>
            <div className="login-input-field">
              <EmailIcon/>
              <input type='email'
                placeholder='name@company.com'
                id='email'
                style={{ width: "80%"}}
                onChange={handleChange} />
            </div>
            <div className="login-input-field">
              <LockIcon/>
              <input type='password'
                placeholder='**********'
                id='password'
                style={{ width: "80%"}}
                
                onChange={handleChange} />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              className='my-2 w-[30%]'
              disabled={loading && !errorMessage}
            >
              {loading && !errorMessage? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>

            
            {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
            {/* <OAuth /> */}
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="login-content">
            <h3>New here ?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, distinctio.</p>
            <button className="login-btn transparent" id='sign-up-btn' onClick={onClickSignUp}>Sign up</button>
          </div>

          <img src={img} alt="" className="h-[60%] login-image" />
        </div>

        <div className="panel right-panel">
          <div className="login-content">
            <h3>One of us ?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, distinctio.</p>
            <button className="login-btn transparent" id='sign-in-btn' onClick={onClickSignIn}>Sign in</button>
          </div>
          <img src={img1} alt="" className="h-[80%] login-image" />
        </div>
      </div>
    </div>
  )
}

export default LoginSignup