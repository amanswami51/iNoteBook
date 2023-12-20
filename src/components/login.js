import React, { useState } from 'react';
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const provider = new GoogleAuthProvider();



export default function Login(props) {
    const navigate = useNavigate();
    const [text, setText] = useState({email:"", password:""});
    const handleOnChange = (e)=>{
        setText({...text, [e.target.name]:e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const {email, password} = text;
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('uid', user.uid)
            navigate('/');
        })
        .catch((error) => {
            // eslint-disable-next-line
            const errorMessage = error.message;
            toast.success("Please login with correct crendentials")
        });
        setText({email:"", password:""});
    }
    const handleSubmitWithGoogle = ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('uid', user.uid);
            navigate('/');
        }).catch((error) => {
             // eslint-disable-next-line
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
  return (
    <>
        <h1>Login in your existing account</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" value={text.email} name='email' onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" value={text.password} name='password' onChange={handleOnChange} className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            <p className='my-2'><Link style={{textDecoration:"none", color:"#0dc5d8"}} to="/password/reset">Forget password?</Link></p>
            <p className='my-2'>Don't have an account? <Link style={{textDecoration:"none", color:"#0dc5d8"}} to="/signup">Sign up</Link></p>
        </form>
        <h1 className='text-center'>or</h1>
        <div className="d-grid gap-2">
            <button type="button" onClick={handleSubmitWithGoogle} className="btn btn-primary my-3">Login with google</button>
        </div>
    </>
  )
}
