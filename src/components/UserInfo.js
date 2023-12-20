import React, { useContext, useEffect, useRef, useState } from 'react'
import { noteContext } from '../context/NoteState';
import { useNavigate } from 'react-router-dom';

function UserInfo(){
    const c = useContext(noteContext);
    const {addPersonalInfoInFirestore, getPersonalInfo, UserInfoObj} = c;
    const [text, setText] = useState({name:"", email:"", mobile:"", address:""})
    const handleOnChange = (e)=>{
        setText({...text, [e.target.name]:e.target.value});
    }

    //edit personal information****************************************
    const refOpen = useRef();
    const refClose = useRef();
    const handleEditPersonalInfo = ()=>{
        refOpen.current.click();
        setText({
            name:UserInfoObj.name,
            email:UserInfoObj.email,
            mobile:UserInfoObj.mobile,
            address:UserInfoObj.address
        })
    }
    const handleSaveChangesPersonalInfo = ()=>{
        refClose.current.click();
        addPersonalInfoInFirestore(text);
        getPersonalInfo();
    }

    const navigate = useNavigate();
    useEffect(()=>{
        getPersonalInfo();
        if(!localStorage.getItem('token')){
            navigate('/');
        }
        // eslint-disable-next-line
    },[])


  return (
    <>  
        <h1>Personal Information</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" disabled value={UserInfoObj.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="email" disabled value={UserInfoObj.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Mobile Number</label>
                <input type="text" disabled value={UserInfoObj.mobile} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                <textarea type="text" disabled value={UserInfoObj.address} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
        </form>
        <button type="button" onClick={handleEditPersonalInfo} className="btn btn-primary">Edit Personal Information</button>





        {/* Give title, description, tag, id to editNote function which is inside "NoteState.js" */}
        <button type="button" ref={refOpen} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div style={{color:'black'}} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Your Personal Information</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" value={text.name} name='name' onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email (Not realy update i.e., Only update in Database)</label>
                            <input type="email" value={text.email} name='email' onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Mobile Number</label>
                            <input type="text" value={text.mobile} name='mobile' onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                            <input type="text" value={text.address} name='address' onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={handleSaveChangesPersonalInfo} className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserInfo;
