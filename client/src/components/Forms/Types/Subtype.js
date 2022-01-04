import React from 'react';

const Subtype = (props) => {
  return (
    <div className='subFilter' style={{display: 'flex', flexDirection: 'column'}}>
    <input type="name" placeholder="Business Name" onChange={props.nameChange}
    style={{fontFamily:'sans-serif',textAlign:'center', padding:'0% 100px'}}/>
    <input type="imgSrc" placeholder="Main Image" onChange={props.imgChange}
    style={{fontSize:'16px',fontFamily:'sans-serif',textAlign:'center', padding:'0% 100px'}}/>
    <input type="picSrc" placeholder="Second Image" onChange={props.scndImgChange}
    style={{fontFamily:'sans-serif',textAlign:'center', padding:'0% 100px'}}/>
    <input type="link" placeholder="Business Page Link" onChange={props.linkChange}
    style={{fontFamily:'sans-serif',textAlign:'center', padding:'0% 100px'}}/>
    <textarea type="desc"placeholder="Business Description" onChange={props.descChange} style={{textAlign:'center', fontFamily:'sans-serif', height:'100px'}} />
    <button type="submit" onClick={props.handleSubmitForm} style={{fontWeight:'bold' , fontSize:'16px' ,backgroundColor:'#e7e7e7', marginTop:'3px', borderRadius:'2px', height:'30px'}}>Submit</button>
    </div>
  );
};

export default Subtype;
