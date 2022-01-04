import React from 'react';

const Drone = (props) => {
  return (
    <div className='droneFilter' style={{display: 'flex', flexDirection: 'column'}}>
      <input type="text" placeholder="Location Title" onChange={props.titleChange} style={{fontFamily:'sans-serif',textAlign:'center', padding:'0% 100px'}} />
      <input type="date" placeholder="Date Recorded" onChange={props.dateChange} style={{fontFamily:'sans-serif',textAlign:'center', padding:'0% 100px'}} />
      <input type="text" placeholder="Author" onChange={props.authorChange} style={{fontFamily:'sans-serif',textAlign:'center', padding:'0% 100px'}} />
      <input type="url" placeholder="Video URL" onChange={props.linkChange} style={{fontFamily:'sans-serif',textAlign:'center', padding:'0% 100px'}}/>
      <textarea type="desc"placeholder="Location Description" onChange={props.descChange} style={{fontFamily:'sans-serif',textAlign:'center', padding:'0% 100px'}}/>
      <button type="submit" onClick={props.handleSubmitForm} style={{fontWeight:'bold' , fontSize:'16px' ,backgroundColor:'#e7e7e7', marginTop:'3px', borderRadius:'2px', height:'30px'}}>Submit</button>
    </div>
  );
};

export default Drone;
