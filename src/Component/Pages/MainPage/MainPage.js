import React, {Component} from "react";
// import Map from "../../Map/Map";
import Register from '../../Auth/Register/Register'
import './MainPage.css'
// import Login from "../../Auth/Login/Login";
import {Row,Col}from 'react-bootstrap'
// import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
class MainPage extends Component{
    state={
        isLoggedIn:false
    }

    goToLogin=()=> {
        this.props.history.push('/auth/login')
    }

    render() {
        return(
            <div>
                <Row className="justify-content-md-center">
                    <Col xs lg="2">
                    </Col>
                    {/*<Col md="auto"><h1>buy the way</h1></Col>*/}
                    <Col xs lg="2">
                    </Col>

                </Row>
                <Row>
                    {/*<Col>this web site is for people that cant get out of there house...</Col>*/}
                </Row>
                <Register goToLogin={this.goToLogin}></Register>
            </div>

        )
    }


}
export default MainPage