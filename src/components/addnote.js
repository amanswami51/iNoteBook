import React, { useContext, useState } from 'react';
import { noteContext } from '../context/notes/NoteState';


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
            props.showAlert('A new note add successfully', 'success')
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
                {/* <input type="text" value={text.description} name='description' onChange={handleOnChange} className="form-control" id="exampleInputPassword1" /> */}
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


/*

    //Real time database
    import {ref, set, child, get } from 'firebase/database';
    import {dbReal} from './firebase';
    const dbRef = ref(dbReal);

    //Add note
    const handleAddnote = (e)=>{
        e.preventDefault();
        const {title, description, tag} = text;
        const userid = title;
        set(ref(dbReal, "users/" + userid), {
            title:title,
            description:description,
            tag:tag,
        })
        setText({title:"", description:"", tag:""})
    }

    //Get note
    const handleGetnote = (e)=>{
        e.preventDefault();
        const userId = "Govind";
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    }
    
*/