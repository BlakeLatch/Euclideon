import React, { useState, useEffect } from "react";
import { Viewer, CameraFlyTo, Cesium3DTileset, CameraLookAt, Entity} from "resium";
import { Cartesian3, Ion , IonResource} from "cesium";
import Contents from "../components/Contents";
import DroneContents from '../components/DroneContents';
import API from "../helpers/api";
import Menu from '../components/Menu';
// import Navigation from "../components/Navigation";
import { useParams ,BrowserRouter as Router,Route,Link} from "react-router-dom";


Ion.defaultAccessToken = process.env.REACT_APP_ION_TOKEN

function Maps(props) {
    const [data, setData] = useState([])
    const [droneData, setDroneData] = useState([])
    const [zoom, setZoom] = useState(true)
    const [cursor, setCursor] = useState("arrow")
    const startPosition = Cartesian3.fromDegrees(145.03832438776246, -37.820906853174606, 25000);
    let {location, target} = useParams();

    const getURLData = (link) => {
        // link = decodeURIComponent(link)
        let para = link.split(',');
        para = para.map((item) =>  parseFloat(item))
        return para
    }
    if (props.shared){
        location = getURLData(location);
        target = getURLData(target);
        target = new Cartesian3(target[0], target[1], target[2])
    }else console.log("Not Shared")

    useEffect(() => {
        async function getData(){
            let content = await API.getContent()
            setData(content)
        }
        getData()

    }, [])

    useEffect(() => {
        async function getDroneData(){
            let droneContent = await API.getDroneContent()
            setDroneData(droneContent)
        }
        getDroneData()

    }, [])

    // Dissabling zooming after 3 seconds
    setTimeout(() => {
        setZoom(false)
    }, 3000)


    return (
        <>

            <Viewer full timeline={true}  fullscreenButton={false} style={{cursor:`url(${cursor}), auto`}}>

                {/* <Navigation data={data} setState={setData} setCursor={setCursor}/> */}
                <Menu data={data} setState={setData} setCursor={setCursor}/>
                {zoom ? (
                    props.shared ?
                    <CameraFlyTo destination={Cartesian3.fromDegrees(location[0], location[1], location[2])} duration={4} />
                    : <CameraFlyTo destination={startPosition} duration={5} maximumHeight={200} /> ) : null
                }
                <DroneContents data={droneData} setState={setDroneData}/>
                <Contents data={data} setState={setData}/>
                <Cesium3DTileset url={IonResource.fromAssetId(69380)}/>
            </Viewer>
        </>
    );
};

export default Maps;

// <Filters data={data} setState={setData}//>    <CameraLookAt target={target} offset={new Cartesian3(0, 10, 0)}/> //<Cesium3DTileset url={IonResource.fromAssetId(69380)}/>
