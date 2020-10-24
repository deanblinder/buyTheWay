import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
// import Toolbar from "./Component/Toolbar/Toolbar";
import Register from './Component/Auth/Register/Register'
import LoginPage from './Component/Pages/LoginPage/LoginPage'
import Map from './Component/Map/Map'
import MainPage from "./Component/Pages/MainPage/MainPage";
import ProfilePage from "./Component/Pages/ProfilePage/ProfilePage";
// import OrderForm from "./Component/OrderForm/OrderForm";
import OrderForm from "./Component/OrderForm/OrderForm";
import Layout from "./Component/hoc/Layout/Layout";
import Login from '../src/Component/Auth/Login/Login'
import MapPage from "./Component/Pages/MapPage/mapPage";
// import Order from './Component/Orders/Order/Order'
// import Card from './Component/Orders/Order/Order'
import { connect } from 'react-redux'

import { userActions } from './Store/Actions/index';

class App extends Component {
    render() {
    // const { userData } = this.props;
    // console.log(userData);
    return (
        <div className='App'>
            <Layout>
                <Switch>
                    <Route exect path='/OrderForm' component={OrderForm}/>

                    <Route exact path='/auth/register' component={Register}/>
                    <Route exect path='/auth/login' component={Login}/>
                    <Route exect path='/profilePage'component={ProfilePage}/>
                    <Route path='/map/' exect component={Map}/>
                    <Route path='/' component={MainPage}/>

                </Switch>
            </Layout>
        </div>
    )
  }
}

// const mapStateToProps = (state) => {
//     return {
//         userData: state.user.userData,
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         setUserData: (userData) => dispatch(userActions.setUserData(userData)),
//     }
// }
export default App;
