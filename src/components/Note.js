import React, { useContext, useEffect, useRef, useState } from 'react'
import Addnote from './addnote';
import Noteitem from './Noteitem';
import { noteContext } from '../context/notes/NoteState';
import { useNavigate } from 'react-router-dom';

function Note(props){

    //use the NoteState variables and functions
    const c = useContext(noteContext);// eslint-disable-next-line 
    const {notes, getNote, updateNote, colleName, fetchCollectionName, createCollectionName, deleteCollectionName, deleteCollectionInUser} = c;

    //your collections*****************************************
    // eslint-disable-next-line 
    const [name, setName] = useState(null);
    function CollectionCompo(props){
        return (
            <>  
                <div className="card col-md-4 mx-2 my-3" style={{width:"15rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{props.y}</h5>
                    </div>
                    <div style={{display:"flex"}}>
                        <button type="button" className="btn btn-primary mx-1" onClick={()=>{handleCollectionButtons(props.y)}}>Select</button>
                        <button type="button" className="btn btn-dark mx-1" onClick={()=>{deleteCollectionName(props.collId); deleteCollectionInUser(props.y)}}>Delete</button>
                    </div>
                </div>
            </>
        )
    }
    const handleCollectionButtons = (n)=>{
        setName(n);
        getNote(n);
    }
    const handleAddcollectionIcon = ()=>{
        const response = prompt("Enter collection name");
        if(response){
            setName(response);
            createCollectionName(response);
            fetchCollectionName();
        }
    }

    //call the getNote function which is created in NoteState*************************************************
    const navigate = useNavigate();
    useEffect(()=>{
        fetchCollectionName();
        if(!localStorage.getItem('token')){
            navigate('/')
        }
        // eslint-disable-next-line
    },[])


    //for update the notes************************************************
    const [etext, seteText] = useState({id: "", etitle:"", edescription:"", etag:""})
    const refOpen = useRef(null);
    const refClose = useRef(null);

    //call updateNote function which is created in NoteState.
    const updateButton = async(currentNote)=>{
        refOpen.current.click();
        seteText({id: currentNote.id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    //use to perform submit button in form to add new note
    const handleSaveChanges = (e)=>{
        refClose.current.click();
        updateNote(etext.id, etext.etitle, etext.edescription, etext.etag, name)
        props.showAlert("Updated successfully", "success");
    }

    //use to get value from input fields
    const onChangeUpdate = (e)=>{
        seteText({...etext, [e.target.name]: e.target.value})
    }

  return (
    <>
        {/* Give title, description, tag, id to editNote function which is inside "NoteState.js" */}
        <button type="button" ref={refOpen} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" style={{color:"black"}} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" value={etext.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChangeUpdate} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" value={etext.edescription} className="form-control" id="edescription" name="edescription" onChange={onChangeUpdate} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input type="text" value={etext.etag} className="form-control" id="etag" name="etag" aria-describedby="emailHelp" onChange={onChangeUpdate} />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" disabled={etext.etitle.length<5 || etext.edescription.length<5} onClick={handleSaveChanges} className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

        {/* your collections */}
        <h1>Your Collections</h1>
        <div className='row' style={{display:"flex", alignItems:"center"}}>
            {
                colleName.map((x)=>{
                    return  <CollectionCompo key={x.collId} y={x.name} collId={x.collId}/>
                })
            }
            <h1 className='mx-2' onClick={handleAddcollectionIcon} style={{border:"4px solid black", borderRadius:"17px", marginBottom:"0px", width:"50px", cursor:"pointer"}}>+</h1>
        </div>

        <Addnote showAlert={props.showAlert} name={name}/>

        {/* Your Notes */}
        <h1 className='mt-5'>Select Collection For Your Notes</h1>
        <div className="row">
            {notes.map((x)=>{
                return  <Noteitem key={x.id} note={x} updateButton={updateButton} name={name}/>
            })}
        </div>
        

    </>
  )
}

export default Note;
