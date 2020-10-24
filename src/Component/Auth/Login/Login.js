import React, {Component} from "react";
import {Form,Button} from 'react-bootstrap'
import  { Redirect } from 'react-router-dom'
import "./Login.css"
import axios from 'axios'
class Login extends Component{
    state={
        username:{
            value:''
        },
        password:{
            value:''
        },
        // isLoggedIn:false
    }
    orderHandler=(event)=>{
        event.preventDefault();//prevent send a request
        let isUserExist=false;
        let userData={
            userName: this.state.username.value,
            password: this.state.password.value,
        }
        axios.get('https://buy-the-way-a829f.firebaseio.com/users.json')
            .then(response=>{
                let users=[]
                for(let key in response.data){
                    users.push([response.data[key].userName,response.data[key].password])
                }
                let i=0;
                while(i<users.length){
                    if(users[i][0]===userData.userName && users[i][1]===userData.password ){
                        isUserExist=true;
                    }
                    i++
                }
                if(!isUserExist){
                    alert('invalid details')
                }
                else {
                    console.log("confirmed")
                    localStorage.setItem('username',userData.userName)
                    localStorage.setItem('isLoggedIn','true')
                    // this.setState({isLoggedIn:true})
                     this.props.history.push('/profilePage')
                    window.location.reload(false);

                }
            })

    }
    usernameChangedHandler=(event)=>{
        let updatedElement={
            ...this.state.username
        }
        updatedElement.value=event.target.value;
        this.setState({username:updatedElement});
    }
    passwordChangedHandler=(event)=>{
        let updatedElement={
            ...this.state.id
        }
        updatedElement.value=event.target.value;
        this.setState({password:updatedElement});
    }
    render() {
        return(
                    // <div className='Container'>
                    <div className='LoginForm' >
                        <h1 style={{textAlign:"center"}}>Login</h1>
                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>username</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Enter username"
                                              value={this.state.username.value}
                                              onChange={(event)=>this.usernameChangedHandler(event)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              placeholder="Password"
                                              value={this.state.password.value}
                                              onChange={(event)=>this.passwordChangedHandler(event)}/>
                            </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.orderHandler}>
                                    Submit
                                </Button>
                        </Form>
                    {/*</div>*/}
                    </div>



        )
    }

}
export default Login