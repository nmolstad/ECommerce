import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('user')
        localStorage.removeItem('credentials');
    }

    render() {
        return <Redirect to="/" />
    }
}

export default Logout;