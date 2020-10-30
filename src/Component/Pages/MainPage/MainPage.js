import React, {Component} from "react";
// import Map from "../../Map/Map";
import Register from '../../Auth/Register/Register'
import './MainPage.css'
// import Login from "../../Auth/Login/Login";
import {Row,Col}from 'react-bootstrap'
// import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
class MainPage extends Component{
    goToLogin=()=> {
        this.props.history.push('/auth/login')
    }

    render() {
        return(
            <div>
                <Register goToLogin={this.goToLogin}></Register>
            </div>

        )
    }


}
export default MainPage