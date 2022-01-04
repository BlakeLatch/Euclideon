import React, { useState, forwardRef, useImperativeHandle} from "react";
import './Navigation.css';
import { Link } from 'react-router-dom';



const Navigation = forwardRef((props, ref) => {

    const [navigationType, setNavigationType] = useState("");

    const handleFilterResetClick = () => {
        let filter = props.data.map(content => ({...content, show: true}))
        props.setState(filter);
        setNavigationType("");
    }
    useImperativeHandle(ref, () => ({
        handleFilterResetClick,
    }));

    const [isLoginClicked, setIsLoginClicked] = useState(false)
    const [isRegisterClicked, setIsRegisterClicked] = useState(false)
    const onClickLogin = () => { setIsLoginClicked(!isLoginClicked);  }
    const onClickRegister = () => { setIsRegisterClicked(!isRegisterClicked); }
   
    
    return (
        <nav>
           <button className={`h-10 px-5 bg-gray-800 hover:bg-indigo-900 mb-1 ${isLoginClicked ? "ring-4" : ""}`} onClick={onClickLogin}>
                <div className="flex items-center text-xl font-semibold  text-indigo-100">
                <Link to="/Login/" style={{color:'white'}}>
                    <p style={{fontSize:'19px'}} className="m-auto text-xl font-semibold text-center">Login</p>
                    </Link>
                </div>
            </button>
            <button className={`h-10 px-5 bg-gray-800 hover:bg-indigo-900 mb-1 ${isRegisterClicked ? "ring-4" : ""}`} onClick={onClickRegister}>
                <div className="flex items-center text-xl font-semibold  text-indigo-100">
                <Link to="/Register/" style={{color:'white'}}>
                    <p style={{fontSize:'19px'}} className="m-auto text-xl font-semibold text-center">Register</p>
                    </Link>
                </div>
            </button>
            <button className={`btn-logout h-10 px-5 bg-gray-800 hover:bg-indigo-900 mb-1 ${isLoginClicked ? "ring-4" : ""}`} onClick={onClickLogin}>
                <div className="flex items-center text-xl font-semibold  text-indigo-100">
                <Link to="/Logout/" style={{color:'white'}}>
                    <p style={{fontSize:'19px'}} className="m-auto text-xl font-semibold text-center">Logout</p>
                    </Link>
                </div>
            </button>
        </nav>
    )
});

export default Navigation;