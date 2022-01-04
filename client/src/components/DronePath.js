import React, { Component, useState} from "react";
import {Entity, EntityDescription, BillboardGraphics, CustomDataSource, useCesium, BoxGraphics, PointGraphics, EllipsoidGraphics} from "resium";
import  {ClockRange, TimeIntervalCollection, TimeInterval, SampledPositionProperty, JulianDate, Cartesian3, EntityCluster, Color} from "cesium";

function DronePath(props) {
  const {viewer} = useCesium();

  const stringifyFlightPath = props.flightPath.slice(1).slice(0,-1);
  const flightData = JSON.parse(stringifyFlightPath);

  const timeStepInSeconds = 30;
  const totalSeconds = timeStepInSeconds * (flightData.length - 1);
  const start = JulianDate.fromIso8601("2020-03-09T23:10:00Z");
  const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate());

  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.clock.clockRange = ClockRange.LOOP_STOP;
  viewer.timeline.zoomTo(start,stop);
  viewer.clock.multiplier = 20;
  // Start playing the scene.
  viewer.clock.shouldAnimate = true;

  const availability = new TimeIntervalCollection([ new TimeInterval({ start: start, stop: stop }) ]);
  const positionProperty = new SampledPositionProperty();

  var count = 0;
  let flightPath = flightData.map((item, i) => {
    const time = JulianDate.addSeconds(start, count * timeStepInSeconds, new JulianDate());
    const position = Cartesian3.fromDegrees(item.longitude, item.latitude, item.height);
    positionProperty.addSample(time, position);
    count = count + 1;

    return (
      <Entity key={Math.random()} name="dronePath" position={position}><PointGraphics width={3} pixelSize={5} color={Color.RED}></PointGraphics></Entity>);
  });
  return (
    <>
    <Entity key={Math.random()} name="Drone" availability={availability} position={positionProperty}>
      <EllipsoidGraphics material={Color.BLUEVIOLET} fill radii={new Cartesian3(20, 20, 20)}/>
    </Entity>
    <CustomDataSource show={true} clustering={new EntityCluster({
        enabled: true,
        pixelRange: 10,
        minimumClusterSize: 3,
        clusterPoints: true,
        })}>
        {flightPath}
    </CustomDataSource>
    </>
  );

}

export default DronePath;
