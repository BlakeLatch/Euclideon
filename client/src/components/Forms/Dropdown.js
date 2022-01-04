import React from 'react';
import API from "../../helpers/api";
import MainFilters from './Mainlist.js';
import SubFilters from './Sublist.js';

const Dropdown = (props) => {
  function DropdownHandler(event) {
      props.onMenuSelected(event.target.value);
  }

  return (
    <div className='dropdown'>
      <div className='dropdown-filter' style={{display: 'flex', justifyContent:'center', fontSize:'20px',fontFamily:'sans-serif',textAlign:'center', backgroundColor:'white',fontWeight:'bold'}}>
        <label style={{margin: 'auto 0'}}>Type</label>
        {props.isMainSelected ? <MainFilters selected={props.selected} dropdownHandler={DropdownHandler}/> : <SubFilters selected={props.selected} dropdownHandler={DropdownHandler}/> }
        <img src={props.icon} width={'50px'} height={'50px'}/>
      </div>
    </div>
  );
};

export default Dropdown;
