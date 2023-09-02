import React, { useContext } from 'react';
import { noteContext } from '../context/notes/NoteState';
import { Link } from 'react-router-dom';

function Noteitem(props){
  
  //use the NoteState variables and functions
  const c = useContext(noteContext);
  const {deleteNote, readMoreNote} = c;

  //call the deleteNote function which is created in NoteState
  const handleDelete = async(name, id)=>{
    deleteNote(name, id)
  }

  //call the readMoreNote fuction which is create in NoteState
  const handleReadMoreButton = (note)=>{
    readMoreNote(note);
  }

  return (
    // eslint-disable-next-line
    <div className="card col-md-4 mx-2 my-3" style={{width:"19rem"}}>
        <div className="card-body">
            <h5 className="card-title">{props.note.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{props.note.tag}</h6>
            <p className="card-text" style={{maxHeight:"9rem", overflow:"hidden"}}>{props.note.description}</p>
        </div>
        <div style={{display:"flex"}}>
          <button type="button" className="btn btn-primary" onClick={()=>{props.updateButton(props.note)}}>Update</button>
          <button type="button" className="btn btn-dark mx-2" onClick={()=>{handleDelete(props.name, props.note.id)}}>Delete</button>
          <Link to="/readmore"><button type="button" className="btn btn-primary" onClick={()=>{handleReadMoreButton(props.note)}}>Read More</button></Link>
        </div>
    </div>
  )
}

export default Noteitem;
