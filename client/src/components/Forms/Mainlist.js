import React from 'react';

function Mainlist(props) {
  return (
    <select value={props.selected} onChange={props.dropdownHandler}>
      <option value='Drone' >Drone Video</option>
      <option value='360Video'>360 Video</option>
      <option value='360Spot'>360 Panorama</option>
      <option value='Matterport'>Matterport</option>
      <option value='Laser'>Laser Scan</option>
      <option value='Lidar'>Lidar Data</option>
    </select>
  );
}

export default Mainlist;
