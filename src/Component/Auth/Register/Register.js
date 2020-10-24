import React, {Component} from "react";
import {Form,Button,Col} from 'react-bootstrap'
import "./Register.css"
import axios from 'axios'
import Login from '../../../Component/Auth/Login/Login'
import {Link} from "react-router-dom";
class Register extends Component{

    state={
        username:{
            value:''
        },
        email:{
            value:''
        },
        password:{
            value:''
        }

    }
    orderHandler=(event)=>{
        event.preventDefault();//prevent send a request
        let isUserExist=false;
        let userData={
            userName: this.state.username.value,
            email: this.state.email.value,
            password: this.state.password.value,
           // returnSecureToken:true
        }
        // axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBhjnNRBDpLdxhRwXRbiPUohAQTudP33KA",userData)
        //     .then(response=>{
        //         console.log(response)
        //     })
        //     .catch(err=>{
        //         console.
        //         console.log(err)
        //     })
        axios.get('https://buy-the-way-a829f.firebaseio.com/users.json')
            .then(response=>{
                let users=[]
                for(let key in response.data){
                    users.push(response.data[key].userName)
                }
                for(let userName in users){
                    if(users[userName]===userData.userName){
                        isUserExist=true;
                    }
                }
                if(isUserExist){
                    alert('User already exist')
                }
                else {
                    //console.log(userData)
                    axios.post('https://buy-the-way-a829f.firebaseio.com/users.json',userData)
                        .then(response=>{
                            console.log(response)
                            this.props.goToLogin()
                            //this.props.history.push()
                            console.log('moved')
                        }).catch(error=>{
                        console.log(error)
                    })


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
    emailChangedHandler=(event)=>{
        let updatedElement={
            ...this.state.id
        }
        updatedElement.value=event.target.value;
        this.setState({email:updatedElement});
    }
    passwordChangedHandler=(event)=>{
        let updatedElement={
            ...this.state.id
        }
        updatedElement.value=event.target.value;
        this.setState({password:updatedElement});
        // console.log(this.state.password)
    }


    render() {
        return(
            <div className='RegisterForm1' style={{textAlign:"right"}}>
                <h1  style={{textAlign:'center'}}>Register</h1>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>:שם משתמש</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Enter username"
                                      value={this.state.username.value}
                                      onChange={(event)=>this.usernameChangedHandler(event)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>:מייל</Form.Label>
                        <Form.Control type="email"
                                      placeholder="Enter email"
                                      value={this.state.email.value}
                                      onChange={(event)=>this.emailChangedHandler(event)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>:סיסמה</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Password"
                                      value={this.state.password.value}
                                      onChange={(event)=>this.passwordChangedHandler(event)}/>
                    </Form.Group>
                        <Form.Row>
                            <div className='Buttonss'>
                            <Button variant="primary" type="submit" onClick={this.orderHandler}>
                                Register
                            </Button>
                            </div>
                            <Col>
                                <p style={{textAlign:"right"}}>already a member?</p>
                            </Col>

                            <Col>
                                <div style={{textAlign:"right"}}>
                                <Button variant="primary" type="submit" onClick={this.props.goToLogin}>
                                    Login
                                </Button>
                                </div>
                            </Col>
                        </Form.Row>
                </Form>
            </div>
        )
    }

}
export default Register