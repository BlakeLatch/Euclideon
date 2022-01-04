import React, { Component, useState} from "react";
import {Entity, EntityDescription, BillboardGraphics, CustomDataSource, useCesium} from "resium";
import  {Cartesian3, EntityCluster, Color} from "cesium";
import DronePath from './DronePath.js';
import API from "../helpers/api";

function DroneContents(props) {

    const {viewer} = useCesium();
    const [isFocused, setIsFocused] = useState(false);
    const [buttonText, setButtonText] = useState("Show Drone Path");

    const distDisplayCondition = [0.0, 50.0];

    function SetFocused(){
      setIsFocused(!isFocused);
      if (isFocused === true) {
        setButtonText("Show Drone Path");
      } else {
        setButtonText("Hide Drone Path");
      }
    }
    const allContents = Array.isArray(props.data) && props.data.length > 0 ? (
        props.data.map((content) => {
            return (
              <Entity key={Math.random()}
              name= {content.location}
              position={Cartesian3.fromDegrees(content.position[0].coordinates[0], content.position[0].coordinates[1], content.position[0].height)}>
              {/*check: https://resium.darwineducation.com/components/BillboardGraphics*/}
                  <BillboardGraphics image={content.icon} scale={0.15} show={content.show} disableDepthTestDistance={4000000} distanceDisplayCondition={distDisplayCondition}/>
                  <EntityDescription>
                      {/* Content section of annotations*/}
                      <section style={{display:'flex', justifyContent: 'center', flexDirection:'column', marginBottom:'3%', marginTop:'3%', marginLeft:'1%'}}>
                          {/* Main Content section */}
                          <section>
                              <button onClick={SetFocused}>{buttonText}</button>
                              <h2>{content.location}</h2>
                              <h3>Date</h3>
                              <p>{content.date}</p>
                              <h3>Presented by</h3>
                              <p>{content.author}</p>
                              <h3>Site Description</h3>
                              <p>{content.description}</p>
                              <iframe width="300px" height="300px" src={content.vidURL}/>
                          </section>
                      </section>
                  </EntityDescription>
                  {isFocused ? <DronePath  flightPath={content.flightPath}/> : ""}
              </Entity>);
        })

    ) : ""

    return (
    <>
    <CustomDataSource show={true} clustering={new EntityCluster({
        enabled: true,
        pixelRange: 30,
        minimumClusterSize: 3,
        clusterBillboards: true,
        clusterPoints: true,
        })}>
        {allContents}
    </CustomDataSource>
    </>
    );


}
export default DroneContents;
