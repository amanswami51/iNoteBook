import React from 'react';
import Note from './Note';

function Home(props) {
  return (
    <div className='my-3'>
       <Note showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
