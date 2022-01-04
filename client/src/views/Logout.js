import React,{useState} from 'react';
import './Login.css';
import Button from '../components/Button';



function Logout() {
    const handleSubmit = () => { fetch('http://localhost:8080/logout', 
    {method: 'get',})
    alert('Logged out')         
  }
  return (
    <div className="App">
   <div className='form-div'>
   <div className='content-div' > 
   <div className='header-div' >
        <br></br>
        <h1>Are you sure to logout?</h1> 
        <br></br>
        <button
            type='submit'
            text='Log out'
            onClick={handleSubmit}
            className='login-button'> logout</button>
    </div>
    
    
        
  <div><br /><br /></div>

        
          </div>
      </div>
    </div>
  );
}

export default Logout;
