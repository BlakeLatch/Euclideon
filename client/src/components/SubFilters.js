import React, { useState, forwardRef, useImperativeHandle } from "react";
import classes from './Filters.module.css';

const SubFilters = forwardRef((props, ref) => {

    const [filterType, setFilterType] = useState("");

    const handleFilterResetClick = () => {
        let subfilter =  props.data.map(content => ({ ...content, show: true }))
        props.setState(subfilter);
        setFilterType("");
    }
    useImperativeHandle(ref, () => ({
        handleFilterResetClick,
    }));

    function handleClick(type) {
        let subfilter = (type === filterType) ?  props.data.map(content => ({ ...content, show: true })) :  props.data.map(content => (
            content.type !== type ? { ...content, show: false } : { ...content, show: true }))

        props.setState(subfilter);

      // allows to escape the filter option instead of using the reser filter button.
        if (type === filterType) return setFilterType("");
        setFilterType(type);
    }
    return (
        // Filter selection as buttons
        <div className={classes.filters}>
            <button className={`block mb-1 rounded-lg ${filterType === 'Health' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => { handleClick('Health') }} src={'icon/Hospital.png'} alt="Filter Health content" />
            </button>

            <button className={`block mb-1 rounded-lg ${filterType === 'Education' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => { handleClick('Education') }} src={'icon/Education.png'} alt="Filter Health content" />
            </button>
            <button className={`block mb-1 rounded-lg ${filterType === 'restaurant' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => { handleClick('restaurant') }} src={'icon/Restaurant.png'} alt="Filter restaurant Video" />
            </button>
            <button className={`block mb-1 rounded-lg ${filterType === 'Shop' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => { handleClick('Shop') }} src={'icon/Supermarket.png'} alt="Filter Super Market content" />
            </button>
            <button className={`block mb-1 rounded-lg ${filterType === 'airport' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => { handleClick('airport') }} src={'icon/Airport.png'} alt="Filter airport content" />
            </button>
            <button className={`block mb-1 rounded-lg ${filterType === 'car park' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => { handleClick('car park') }} src={'icon/Carpark.png'} alt="Filter carpark Video" />
            </button>
            <button className={`block mb-1 rounded-lg ${filterType === 'hotel' ? 'ring-8' : ""} shadow-lg transform transition-transform`}>
                <img className="h-full w-full rounded-lg" onClick={() => { handleClick('hotel') }} src={'icon/Hotel.png'} alt="Filter hotel Video" />
            </button>
        </div>
    )
});

export default SubFilters;
