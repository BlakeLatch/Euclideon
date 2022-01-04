import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Maps from './views/Maps';
import Login from './views/Login'
import Logout from './views/Logout'
import Register from './views/Register'



export default function Routing() {
    return (
        <Router>
            <Route exact path="/" component={Maps} />
            <Route exact path="/share/:location/:target">
            <Maps shared={true}/>
            </Route>
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/Logout" component={Logout} />
        </Router>
    )
}
