import React, {Component} from "react";
import Register from '../../Auth/Register/Register'
import './MainPage.css'
class MainPage extends Component{
    goToLogin=()=> {
        this.props.history.push('/auth/login')
    }
    render() {
        return(
            <div >
                <Register goToLogin={this.goToLogin}></Register>
            </div>

        )
    }
}
export default MainPage