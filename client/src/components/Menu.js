import { useState, useRef } from 'react'
import Filters from '../components/Filters'
import SubFilters from '../components/SubFilters'
import { AiOutlineMenu } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { RiFilterLine, RiFilterOffLine } from "react-icons/ri";
import { useCesium, ScreenSpaceEvent, ScreenSpaceEventHandler} from "resium";
import { Cartesian3, ScreenSpaceEventType } from "cesium";
import PostForm from './Forms/PostForm'
import Navigation from './Navigation';
// import classes from './Navigation.css';

export default function Menu(props) {
    const { viewer } = useCesium();

    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const [isFilterClicked, setIsFilterClicked] = useState(false)
    const [isSubFilterClicked, setIsSubFilterClicked] = useState(false)
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const [isPostClicked, setIsPostClicked] = useState(false)
    const [isReadyToPost, setIsReadyToPost] = useState(false)
    const [location, setLocation] = useState({})
    const [target, setTarget] = useState({})
    const reset = useRef();


    const radiasToDegrees = (radians) => {
        let pi = Math.PI;
        return radians * (180 / pi);
    }

    function getPositionFromMap() {
        const scene = viewer.scene;
        // console.log(scene)
        if (!scene) return;
        const cord = scene.defaultView.camera.positionCartographic;
        setLocation({lat: radiasToDegrees(cord.latitude), long: radiasToDegrees(cord.longitude), hi: cord.height });
    }

    function copyToClipboard(text) {
        window.prompt("Copy shared link to clipboard: Ctrl+C, Enter", text);
    }

    function generateShareLink() {
        const scene = viewer.scene;
        if (!scene) return;
        const camera = scene.defaultView.camera
        setTarget(camera._position)
        getPositionFromMap()
        //Generate the link
        let link = `http://localhost:8031/share/`
        link += `${location.long},${location.lat},${location.hi}/${target.x},${target.y},${target.z}`
        //encodeURIComponent(link)
        console.log(link)
        //Copy to clipboard
        copyToClipboard(link);

        return link
    }

    const onClickMenu = () => { setIsMenuClicked(!isMenuClicked); setIsFilterClicked(false); setIsSubFilterClicked(false);}
    const onClickFilter = () => { setIsFilterClicked(!isFilterClicked); setIsPostClicked(false); setIsSubFilterClicked(false); }
    const onClickSubFilter = () => { setIsSubFilterClicked(!isSubFilterClicked); setIsPostClicked(false); setIsFilterClicked(false); }
    const onClickSubmit = () => { setIsSubmitClicked(!isSubmitClicked); setIsSubmitClicked(false); }
    const onClickPost = () => {
        setIsPostClicked(!isPostClicked); setIsFilterClicked(false);
        !isPostClicked ? props.setCursor("cursor/pin1.png") : props.setCursor("")
        setIsReadyToPost(false);
    }
    //<CameraFlyTo destination={new Cartesian3(-37.82025615950385, 144.98367148248354, 100.99450465932048)} duration={4} maximumHeight={200} endTransform={transform} />

    return (
        <aside className='menuBar'>
            {isReadyToPost ? <PostForm location={location}/> : ""}
            <nav className="relative select-none">
                {/* Main Menu with login/reg/logout buttons*/}
                <div className="navigations">
                    <div className="items-center h-10 px-5 btn-menu text-indigo-100 transition-colors duration-150 bg-gray-800 hover:bg-indigo-900 " onClick={onClickMenu}>
                        <AiOutlineMenu className={`h-6 w-8 ${isMenuClicked ? "transform rotate-90" : ""}`} />
                    </div>
                    <Navigation/>

                </div>

                <nav className={` flex flex-col py-3 px-2 transform ${isMenuClicked ? "translate-x-0" : "-translate-x-full"} translate duration-300 ease-in-out`}>
                    <button className={`mb-1 px-4 bg-gray-800 rounded-lg ${isFilterClicked ? "ring-4" : ""} shadow-lg transform active:scale-75 transition-transform hover:bg-indigo-900`}  style={{height:'35px',width:'250px'}} onClick={onClickFilter}>
                        <div className="flex items-center text-xl font-semibold  text-indigo-100">
                            <RiFilterLine className="h-6 w-6" />
                            <p style={{fontSize:'18px'}} className="m-auto text-xl font-semibold text-center">Main Filters</p>
                        </div>
                    </button>

                    <button className={`mb-1 px-4 bg-gray-800 rounded-lg ${isSubFilterClicked ? "ring-4" : ""} shadow-lg transform active:scale-75 transition-transform hover:bg-indigo-900`} style={{height:'35px',width:'250px'}} onClick={onClickSubFilter}>
                        <div className="flex items-center text-xl font-semibold  text-indigo-100">
                            <RiFilterLine className="h-6 w-6" />
                            <p style={{fontSize:'18px'}} className="m-auto text-xl font-semibold text-center">Sub Filters</p>
                        </div>
                    </button>

                    <button className={`mb-1 px-4 bg-gray-800 rounded-lg ${isPostClicked ? "ring-4" : ""} shadow-lg transform active:scale-75 transition-transform hover:bg-indigo-900`} style={{height:'35px',width:'250px'}} onClick={(e) => onClickPost(e)}>
                        <div className="flex items-center text-xl font-semibold  text-indigo-100">
                            <FiEdit className="h-6 w-6" />
                            <ScreenSpaceEventHandler>
                                {isPostClicked ?
                                    (
                                        <ScreenSpaceEvent action={() => {
                                            //window.confirm("Are you sure?")
                                            getPositionFromMap()
                                            setIsReadyToPost(!isReadyToPost)}} type={ScreenSpaceEventType.RIGHT_CLICK} />
                                    ) : (
                                        <ScreenSpaceEvent action={() => {
                                            generateShareLink()
                                        }} type={ScreenSpaceEventType.RIGHT_CLICK} />
                                        )
                                    }
                            </ScreenSpaceEventHandler>
                            <p style={{fontSize:'18px'}} className="m-auto text-xl font-semibold text-center">Post New Content</p>
                        </div>
                    </button>
                    {/* <button className={`mb-1 px-4 bg-gray-800 rounded-lg ${isSubmitClicked ? "ring-4" : ""} shadow-lg transform active:scale-75 transition-transform hover:bg-indigo-900`} style={{height:'35px',width:'250px'}} onClick={onClickSubmit}>
                        <div className="flex items-center text-xl font-semibold  text-indigo-100">
                            <FiEdit className="h-6 w-6" />
                            <p style={{fontSize:'18px'}} className="m-auto text-xl font-semibold text-center">Submit Job Offer</p>
                        </div>
                    </button> */}
                    <button className={`mb-1 px-4 bg-gray-800 rounded-lg shadow-lg transform active:scale-75 transition-transform hover:bg-indigo-900`} style={{height:'35px',width:'250px'}} onClick={() => { if (reset.current) reset.current.handleFilterResetClick() }}>
                        <div className="flex items-center text-xl font-semibold  text-indigo-100">
                            <RiFilterOffLine className="h-6 w-6" />
                            <p style={{fontSize:'18px'}} className="m-auto text-xl font-semibold text-center">Reset Filters</p>
                        </div>
                    </button>
                </nav>

                {/* Filter and sub filter activation when clicked */}
                <div className={`${isFilterClicked ? "show" : "hidden"} absolute flex flex-col py-1 mt-2 bg-transparent rounded-lg select-none`}>
                    <Filters ref={reset} data={props.data} setState={props.setState} />
                </div>

                <div className={`${isSubFilterClicked ? "show" : "hidden"} absolute flex flex-col py-1 mt-2 bg-transparent rounded-lg select-none`}>
                    <SubFilters ref={reset} data={props.data} setState={props.setState} />
                </div>


            </nav>
        </aside>
    )
}
