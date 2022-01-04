import React, { useState } from "react";
import API from "../../helpers/api";

export default function EditForm(props) {
    const [type, setType] = useState(props.content.typetype);
    const [name, setName] = useState(props.content.name);
    const [link, setLink] = useState(props.content.link);
    const [desc, setDesc] = useState(props.content.desc);
    
    async function handleSubmit(){
        console.log(props.content._id)
        const contentToEdit = 
        {
            "_id" : props.content._id,
            "type": type,
            "name": name,
            "icon": props.content.icon,
            "position":[
                {
                    "coordinates": [props.content.position[0].coordinates[0], props.content.position[0].coordinates[1]],
                    "height": props.content.position[0].height,
                }
            ],
            "imgs":[
                {
                    "imgSrc": props.content.imgs[0].imgSrc,
                    "picSrc": props.content.imgs[0].picSrc,
                }
            ],
            "link": link,
            "desc": desc,
        }
        await API.editContent(contentToEdit).then((res)=> {
            console.log(res)
            }).then(() => {
                //update the current data Array
                let updatedContents = props.data.map((content) => {
                    if (content._id === props.content._id ){
                        content.type = type; content.name = name; 
                        content.link = link; content.desc = desc;
                    } 
                    return content
                })
                // updatedContents.push(contentToEdit)
                console.log(updatedContents)
                props.setData(updatedContents)
                 //clear vals
                setType('');
                setDesc('');
                setLink('');
                setName('');
        })
    }   

    return(
        <form style={{display:'flex', flexDirection:'column', paddingTop:'30px', width:'100%'}}>
            <h2 style={{fontSize:'medium' ,textAlign:'center', backgroundColor:'white', color:'black', marginBottom:'1px', width:'100%', padding:'1% 0px'}}>Edit Content</h2>
            <input type="type" placeholder="Type" onChange={(e) => setType(e.target.value)}
            style={{textAlign:'center',width:'100%'}}/>
            <input type="name" placeholder="Business Name" onChange={(e) => setName(e.target.value)}
            style={{textAlign:'center',width:'100%'}} />
            <input type="link" placeholder="Business Page Link" onChange={(e) => setLink(e.target.value)}
            style={{textAlign:'center',width:'100%'}}/>
            <textarea type="desc"placeholder="Business Description" onChange={(e) => setDesc(e.target.value)}
            style={{textAlign:'center', fontFamily:'sans-serif', height:'100px'}}></textarea>
            <button type="submit" onClick={handleSubmit}
            style={{fontWeight:'bold', fontSize:'13px', marginTop:'3px', width:'100%'}}>Submit</button>
        </form>
    )
}