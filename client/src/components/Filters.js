import React, { useState, forwardRef, useImperativeHandle} from "react";
import classes from './Filters.module.css';


const Filters = forwardRef((props, ref) => {

    const [filterType, setFilterType] = useState("");

    const handleFilterResetClick = () => {
        let filter = props.data.map(content => ({...content, show: true}))
        props.setState(filter);
        setFilterType("");
    }
    useImperativeHandle(ref, () => ({
        handleFilterResetClick,
    }));

    function handleFilterClick(type){
        let filter = (type === filterType) ? props.data.map(content => ({...content, show: true})) : props.data.map(content => (
            content.type !== type ? {...content, show: false} : {...content, show: true} ))

        props.setState(filter);

        // allows to escape the filter option instead of using the reser filter button.
        if (type === filterType) return setFilterType("");
        setFilterType(type);
    }
    return (
        <div className={classes.filters}>
            <button className={`block mb-1 rounded-lg ${filterType === 'Drone' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => {handleFilterClick('Drone')}} src={'icon/Drone-filter.png'} alt="Filter Drone Video"/>
            </button>

            <button className={`block mb-1 rounded-lg ${filterType === '360Video' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => {handleFilterClick('360Video')}} src={'icon/360 filter.png'} alt="Filter 360 Vidoes"/>
            </button>

            <button className={`block mb-1 rounded-lg ${filterType === '360Spot' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => {handleFilterClick('360Spot')}} src={'icon/para-filter.png'} alt="Filter 360 Panoramas"/>
            </button>

            <button className={`block mb-1 rounded-lg ${filterType === 'Matterport' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => {handleFilterClick('Matterport')}} src={'icon/matterport-filter.png'} alt="Filter Motterport 3D"/>
            </button>

            <button className={`block mb-1 rounded-lg ${filterType === 'Laser' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg"onClick={() => {handleFilterClick('Laser')}} src={'icon/laser-filter.png'} alt="Filter Laster Scans"/>
            </button>

            <button className={`block mb-1 rounded-lg ${filterType === 'Lidar' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => {handleFilterClick('Lidar')}} src={'icon/lidar-filter1.png'} alt="Filter Lidar Data"/>
            </button>
        </div>
    )
});

export default Filters;
