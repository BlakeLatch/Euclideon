import React, { Component, useState} from "react";
import {Entity, EntityDescription, BillboardGraphics, CustomDataSource, useCesium} from "resium";
import  {Cartesian3, EntityCluster} from "cesium";
import API from "../helpers/api";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import EditForm from './Forms/EditForm';

function Contents(props) {

    const {viewer} = useCesium();
    let [showForm, setShowForm]= useState(false);
    if (viewer){
        viewer.infoBox.frame.removeAttribute("sandbox");
        viewer.infoBox.frame.src = "about:blank";
    }

    async function handleDeleteClick(objectID) {
        await API.deleteContent(objectID).then((res)=> {
                const obj = props.data.filter(content => content._id !== objectID)
                props.setState(obj);
            })
    }

    const distDisplayCondition = [0.0, 50.0];

    const allContents = Array.isArray(props.data) && props.data.length > 0 ? (
        props.data.map((content) => {
            return (
            <Entity key={Math.random()}
            name= {content.name}
            position={Cartesian3.fromDegrees(content.position[0].coordinates[0], content.position[0].coordinates[1], content.position[0].height)}>
            {/*check: https://resium.darwineducation.com/components/BillboardGraphics*/}
                <BillboardGraphics image={content.icon} scale={0.15} show={content.show} disableDepthTestDistance={4000000} distanceDisplayCondition={distDisplayCondition}/>
                <EntityDescription>
                    {/* Content section of annotations*/}
                    <section style={{display:'flex', flexDirection:'column', marginBottom:'3%', marginTop:'3%', marginLeft:'1%'}}>
                        <section style={{display:'flex', width:'100%', marginBottom:'3%'}}>
                            <div style={{display:'flex',flex:'0 1 70%', height:'100'}}>
                                <img src={content.imgs[0].imgSrc}  alt={ content.name +" Logo"}
                                style={{maxWidth:'100%', maxHeight:'100%', float : 'top', height:'auto', width:'auto'}}></img>
                            </div>
                            <div style={{display:'flex', flex:'0 1 30%', flexDirection:'column', alignItems:'flex-end'}}>
                                <button onClick ={() => handleDeleteClick(content._id)}
                                style={{width:30, height:30, float:'right'}}>
                                <RiDeleteBin2Line style={{width: 20, height: 20, marginLeft:-2, marginRight:'auto'}}></RiDeleteBin2Line>
                                </button>
                                <button onClick ={() => setShowForm (!showForm)}
                                style={{width:30, height:30, float:'right'}}>
                                <AiOutlineEdit style={{width: 20, height: 20, marginLeft:-2, marginRight:'auto'}}></AiOutlineEdit>
                                </button>
                            </div>
                        </section>

                        <form> {showForm ? <EditForm content={content} data={props.data} setData={props.setState}/> : ""} </form>

                        {/* Main Content section */}
                        <section>
                            <h2 style={{fontSize:'16px', marginTop:'3%'}}> <a style={{textDecoration:'none'}} href={content.link} title={"Go to " + content.name + " Website"} sandbox="allow-same-origin allow-scripts allow-popups allow-forms" target="_blank" rel="noopener noreferrer">Learn more about {content.name}</a></h2>
                            <p style={{fontSize:'16px'}}> Here you can fill a description</p>
                        </section>
                        <section>
                            <h2 style={{fontSize:'16px'}}>About</h2>
                            <p style={{fontSize:'16px'}}>{content.desc}</p>
                        </section>
                        <section>
                            <h2 style={{fontSize:'16px'}}>Content Type: {content.type}</h2>
                            <img src={content.imgs[0].picSrc} alt={ content.name +" Cover Picture"}
                            style={{maxWidth: '100%', maxHeight: '100%', float: 'down', marginTop:'13.5px'}}/>
                        </section>
                    </section>
                </EntityDescription>
            </Entity>)
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
export default Contents;
