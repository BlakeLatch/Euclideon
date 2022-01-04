import React, { useState, useEffect } from "react";
import API from "../../helpers/api";
import Dropdown from './Dropdown.js';
import Drone from './Types/Drone.js';
import Subtype from './Types/Subtype.js';

// import { Select } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css';

export default function PostForm(props) {

    const [isMainSelected, setIsMainSelected] = useState(true);
    const [type, setType] = useState('Drone');
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');
    const [icon, setIcon] = useState('icon/Drone.png')
    const [position, setPosition] = useState({})
    const [imgs, setImgs] = useState({})
    const [link, setLink] = useState('');
    const [desc, setDesc] = useState('');

    function FilteredMenu(menu){
      setType(menu);
      contentIcon(menu);
    }

    function IsMainSelected(){
      setIsMainSelected(!isMainSelected);
      if (isMainSelected === false) {
        FilteredMenu('Drone');
      } else {
        FilteredMenu('Health');
      }
    }

    const contentIcon = (type) => {
        setPosition({coordinates: [props.location.long, props.location.lat], height:props.location.hi})
        console.log(position)
        switch (type.toLowerCase()) {
            case("education"):
                console.log("Found it")
                setIcon("icon/uni.png")
                break;
            case ("health"):
                console.log("health it")
                setIcon("icon/health.png")
                break;
            case ("matterport"):
                setIcon("icon/Matterport.png")
                break;
            case ("360spot"):
                setIcon("icon/360Sport.png")
                break;
            case ("360video"):
                setIcon("icon/360Videos.png")
                break;
            case ("drone"):
                setIcon("icon/Drone.png")
                break;
            case ("laser"):
                setIcon("icon/Laser.png")
                break;
            case ("lidar"):
                setIcon("icon/Lidar.png")
                break;
            case ("restaurant"):
                setIcon("icon/Future use/restaurant.png")
                break;
            case ("airport"):
                setIcon("icon/Future use/airport.png")
                break;
            default:
                console.log("Content Type is not supported")
                break;
        }
    }


    async function handleSubmitForm(){
        console.log(type);
        const contentToAdd =
        {
            "type": type,
            "name": name,
            "icon": icon,
            "position":[
                {
                    "coordinates": position.coordinates,
                    "height": 0,
                }
            ],
            "imgs":[
                {
                    "imgSrc": imgs.imgSrc,
                    "picSrc": imgs.picSrc,
                }
            ],
            "link": link,
            "desc": desc,
        }
        console.log("contenttoAdd: "+contentToAdd);
        await API.addContent(contentToAdd).then((res)=> {
            //props.setState({... contentToAdd});
            console.log(res)
            }).then(() => {
                //clear vals
                setType('');
                setName('')
                setIcon('')
                setPosition([{coordinates: [], height:0}])
                setImgs([{imgSrc:'' , picSrc:''}])
                setLink('');
                setDesc('')
        })
    }

    async function handleSubmitFormDrone(){
        setPosition({coordinates: [props.location.long, props.location.lat], height:props.location.hi});
        const contentToAdd =
        {

            "type": type,
            "location": title,
            "position":[
                {
                    "coordinates": position.coordinates,
                    "height": 0,
                }
            ],
            "icon": icon,
            "date": date,
            "author": author,
            "vidURL": link,
            "description": desc,
        }

        await API.addDroneContent(contentToAdd).then((res)=> {
            //props.setState({... contentToAdd});
            console.log(res)
            }).then(() => {
                //clear vals
                setType('Drone')
                setTitle('')
                setDate('')
                setIcon('')
                setPosition([{coordinates: [], height:0}])
                setAuthor('')
                setLink('')
                setDesc('')
        })
    }

    return(
        <section className='absolute inset-0 flex w-screen h-screen justify-center items-center backdrop-filter backdrop-blur-sm'>
            <form style={{display:'flex', flexDirection:'column', fontFamily:'sans-serif', padding:'', backgroundColor: 'white'}}>
                <h1 style={{fontSize:'20px',fontFamily:'sans-serif',textAlign:'center', backgroundColor:'#e7e7e7',fontWeight:'bold', padding:'5% 100px'}}>New Business Form</h1>
                <div style={{display: 'flex', justifyContent:'space-around', flexDirection:'row', fontSize:'20px',fontFamily:'sans-serif',textAlign:'center', backgroundColor:'white',fontWeight:'bold', padding:'10px 0'}}>
                  <div>
                    <input type="radio" id="mainRadio" name="filter" value="user" onChange={IsMainSelected} defaultChecked/>
                    <label htmlFor="mainRadio"> Main</label>
                  </div>
                  <div>
                    <input type="radio" id="subRadio" name="filter" value="service" onChange={IsMainSelected} />
                    <label htmlFor="subRadio"> Sub</label>
                  </div>
                </div>
                <Dropdown selected={type} onMenuSelected={FilteredMenu} isMainSelected={isMainSelected} icon={icon}/>
                  {type === 'Drone' ? <Drone
                  titleChange={(e) => setTitle(e.target.value)}
                  dateChange= {(e) => setDate(e.target.value)}
                  authorChange= {(e) => setAuthor(e.target.value)}
                  linkChange= {(e) => setLink(e.target.value)}
                  descChange= {(e) => setDesc(e.target.value)}
                  handleSubmitForm={handleSubmitFormDrone}/> :
                  <Subtype
                  nameChange={(e) => setName(e.target.value)}
                  imgChange= {(e) => setImgs({imgSrc: e.target.value})}
                  scndImgChange= {(e) => setImgs({picSrc: e.target.value})}
                  linkChange= {(e) => setLink(e.target.value)}
                  descChange= {(e) => setDesc(e.target.value)}
                  handleSubmitForm={handleSubmitForm}/>

                }

            </form>
        </section>
    )
}
