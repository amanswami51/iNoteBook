import React, {createContext, useState} from 'react';
import {dbFirestore, auth, storage} from '../../components/firebase'; // eslint-disable-next-line
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, setDoc, getDoc } from "firebase/firestore"; 
import {sendPasswordResetEmail } from 'firebase/auth';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
const noteContext = createContext();


const NoteState = (props) =>{
    const [notes, setNotes] = useState([]);

    const [colleName, setColleName] = useState([])

    // ***********************************************************
    //About collections
    //Create collections
    const createCollectionName = async(collName)=>{
        try {// eslint-disable-next-line
          const docRef = await addDoc(collection(dbFirestore, `${localStorage.getItem('uid')}/folder/collectionName`), {
            name: collName
        });
        } 
        catch(e){
            alert("Error adding document");
        }
    }

    //Get collection names
    const fetchCollectionName = async(collName)=>{
        const querySnapshot = await getDocs(collection(dbFirestore, `${localStorage.getItem('uid')}/folder/collectionName`));
        let arrColl = [];
        let i = 0;
        querySnapshot.forEach((doc) => {
            arrColl[i] = {
              collId: doc.id,
              name:doc.data().name,
            }
            i++;
          });
          setColleName(arrColl) 
    }

    // Delete collection names
    const deleteCollectionName = async(collId)=>{
        await deleteDoc(doc(dbFirestore, `${localStorage.getItem('uid')}/folder/collectionName`, collId));
        const arr = colleName.filter((x)=>{return x.collId!==collId});
        setColleName(arr);
    }

    // delete collection all data
    const deleteCollectionInUser = async(collName)=>{
      notes.map(async(x)=>{
        await deleteDoc(doc(dbFirestore, `${localStorage.getItem('uid')}/${collName}/notes`, x.id));
      })
      setNotes([])
    } 

    // ***********************************************************
    //About notes
    //add the notes in firestore
    const addNote = async(title, description, tag, collName, UploadFile)=>{
        try {// eslint-disable-next-line

            if(UploadFile === null){ // eslint-disable-next-line
              const docRef = await addDoc(collection(dbFirestore, `${localStorage.getItem('uid')}/${collName}/notes`), {
                  title: title,
                  description: description,
                  tag: tag,
                  uploadImgUrl:null
                });
                getNote(collName);
            }
            else{
              const imageRef = ref(storage, `images/${title}`)
              const response = await uploadBytes(imageRef, UploadFile);// eslint-disable-next-line
              const resDown = await getDownloadURL(response.ref);
             
              // eslint-disable-next-line
              const docRef = await addDoc(collection(dbFirestore, `${localStorage.getItem('uid')}/${collName}/notes`), {
                title: title,
                description: description,
                tag: tag,
                uploadImgUrl:resDown
              });

              getNote(collName);
            }

        } 
        catch(e){
            alert("Error adding document");
        }
    }

    //Get notes from firestore, and save in "notes" state.
    const getNote = async(collName)=>{
        const querySnapshot = await getDocs(collection(dbFirestore, `${localStorage.getItem('uid')}/${collName}/notes`));
        let arr = [];
        let i = 0;
        querySnapshot.forEach((doc) => {
            arr[i] = {
              id:doc.id,
              title:doc.data().title,
              description:doc.data().description,
              tag:doc.data().tag,
              uploadImgUrl:doc.data().uploadImgUrl
            }
            i++;
          });
          setNotes(arr) 
    }

    //delete the note from firestore and notes state.
    const deleteNote = async(collName, id)=>{
        await deleteDoc(doc(dbFirestore, `${localStorage.getItem('uid')}/${collName}/notes`, id));

      //UI code
        const arr = notes.filter((x)=>{return x.id!==id});
        setNotes(arr);
    }

    //Update the note in the firestore and notes state.
    const updateNote = async(id, title, description, tag, collName)=>{
      const cityRef = doc(dbFirestore, `${localStorage.getItem('uid')}/${collName}/notes`, id);
       // eslint-disable-next-line
      const res = await updateDoc(cityRef, {
        title:title,
        description:description,
        tag:tag
      });


      //UI code
      let newNotes = JSON.parse(JSON.stringify(notes)) 
      for(let i=0; i<newNotes.length; i++){
        const element = notes[i];
        if(element.id === id){
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }

    //**************************************************************** */
    //Forget password (Reset user password in authentication)
    const resetForgotPasswordFun = (email)=>{
      sendPasswordResetEmail(auth, email)
      .then(() => {
          alert("Password reset email sent successfully")
        })
        .catch(() => {
          alert("Something went to be wrong");
        });
    }


    //********************************************************************* */
    //add user personal Information in firestore
    const addPersonalInfoInFirestore = async(data)=>{
      await setDoc(doc(dbFirestore, `${localStorage.getItem('uid')}/UserInfo`),{
        name:data.name,
        email:data.email,
        mobile:data.mobile,
        address:data.address
      });
    }

    //get user personal Information from firestore
    const [UserInfoObj, setUserInfoObj] = useState({name:"", email:"", mobile:"", address: ""});
    const getPersonalInfo = async()=>{
        const querySnapshot = await getDoc(doc(dbFirestore, `${localStorage.getItem('uid')}/UserInfo`));
        if (querySnapshot.exists()){
          setUserInfoObj({
            name:querySnapshot.data().name,
            email:querySnapshot.data().email,
            mobile:querySnapshot.data().mobile,
            address:querySnapshot.data().address
          })
        }
        else{
          setUserInfoObj({
            name:"", email:"", mobile:"", address: ""
          })
        }
    }

    //****************************************************************** */
    //Read-more page, button
    const [readMorePerNote, setReadMorePerNote] = useState({})
    const readMoreNote = (perNote)=>{
      setReadMorePerNote(perNote);
    }
    



  return (
    <div>
      <noteContext.Provider value={{notes, addNote, getNote, deleteNote, updateNote, colleName, createCollectionName, fetchCollectionName, deleteCollectionName, deleteCollectionInUser, addPersonalInfoInFirestore, getPersonalInfo, UserInfoObj, resetForgotPasswordFun, readMoreNote, readMorePerNote}}>
        {props.children}
      </noteContext.Provider>
    </div>
  )
}

export {NoteState, noteContext};
