import React, { useContext, useState } from 'react';
import { noteContext } from '../context/NoteState';
import toast from 'react-hot-toast';


export default function Addnote(props) {

    //get text value from input tags
    const [text, setText] = useState({title:"", description:"", tag:""});
    const handleOnChange = (e)=>{
        setText({...text, [e.target.name]:e.target.value});
    }
    const [uploadFile, setUploadFile] = useState(null);

    //use the NoteState variables and functions
    const c = useContext(noteContext);
    const {addNote} = c;


    //call the addNote function which is created in NoteState
    const handleAddnote = async (e)=>{
        e.preventDefault();
        if(props.name === null){
            alert("Please select Desire Collection Name")
        }
        else{
            const {title, description, tag} = text;
            addNote(title, description, tag, props.name, uploadFile);
    
            setText({title:"", description:"", tag:""})
            toast.success('A new note add successfully')
        }
    }
  
  return (
    <>
        <h1 className='my-3'>Before Adding New Note, Please Select Desire Collection.</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" value={text.title} name='title' onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <textarea value={text.description} name='description' onChange={handleOnChange} className="form-control" id="exampleInputPassword1" rows={8}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                <input type="text" value={text.tag} name='tag' onChange={handleOnChange} className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Upload Image</label>
                <input type="file" name='file' onChange={(e)=>{setUploadFile(e.target.files[0])}} className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" onClick={handleAddnote} className="btn btn-primary mx-3">Addnote</button>
        </form> 
    </>
  )
}
