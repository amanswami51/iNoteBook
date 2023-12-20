import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { noteContext } from '../context/NoteState'

function ForgetPassword() {
    const [text, setText] = useState("")

    const c = useContext(noteContext);
    const {resetForgotPasswordFun} = c;
    
    const handleSendLinkButton = ()=>{
        resetForgotPasswordFun(text);
    }

  return (
    <div className='p-10' style={{border:"2px solid black", borderRadius:"10px", textAlign:"center", padding:"10px"}}>
        <div>
           <h4>Trouble with logging in?</h4> 
        </div>
        <div>
            <h6>Enter your email address</h6>
        </div>
        <div>
            <form>
                <input style={{maxWidth:"75%",margin:"auto", display:"block"}} type="text" value={text} onChange={(e)=>{setText(e.target.value)}} placeholder='Email address' className="form-control" />
                <button style={{width:"60vw", maxWidth:"960px"}} type='button' className='btn btn-primary my-3' onClick={handleSendLinkButton}>Send Link</button>
            </form>
        </div>
        <div>
        <Link to="/login"><button style={{width:"60vw", maxWidth:"960px"}} type="button" className='btn btn-primary my-3'>back to login</button></Link>
        </div>
    </div>
  )
}

export default ForgetPassword
