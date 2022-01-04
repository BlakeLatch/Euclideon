import React from 'react';

function Sublist(props) {
  return (
    <select value={props.selected} onChange={props.dropdownHandler}>
      <option value='Health'>Hospital</option>
      <option value='Education'>Education</option>
      <option value='restaurant'>Restaurant</option>
      <option value='Shop'>Supermarket</option>
      <option value='airport'>Airport</option>
      <option value='car park'>Carpark</option>
      <option value='hotel'>Hotel</option>
    </select>
  );
}

export default Sublist;
