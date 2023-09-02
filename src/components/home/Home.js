import React from 'react';
import Superhero from '../services/Superhero';

function Home(props) {
  return (
    <div className='my-3'>
      <Superhero showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
