import React, { useContext, useEffect } from 'react';
import { noteContext } from '../context/NoteState';
import { Link, useNavigate } from 'react-router-dom';


function ReadMore(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          navigate('/login')
      }// eslint-disable-next-line
    }, [])
    const c = useContext(noteContext);
    const {readMorePerNote} = c;
      return (
        <div className='container' style={{width:"60vw"}}>
            <div className="card col-md-4 mx-2 my-3" style={{width:"56vw"}}>
              {
                readMorePerNote.uploadImgUrl===null?"":<img src={readMorePerNote.uploadImgUrl} className="card-img-top" alt="Click close, then Click again ReadMore button" />
              }
                <div className="card-body">
                    <h5 className="card-title"><strong>Title</strong> :- {readMorePerNote.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary"><strong>Tag</strong> :- {readMorePerNote.tag}</h6>
                    <p className="card-text">
                      <strong>Description :- </strong><br />{readMorePerNote.description}
                    </p>
                </div>
                <div style={{position:"absolute", right:"0px", bottom:"0px"}}>
                  <Link to="/"><button type="button" className="btn btn-primary">Close</button></Link>
                </div>
            </div>
        </div>
      )
}

export default ReadMore;
