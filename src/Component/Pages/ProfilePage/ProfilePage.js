import React, {Component} from "react";
import {Container, Col,Row,Image,Card,Button} from 'react-bootstrap'
import 'semantic-ui-css/semantic.min.css'
import OrderCard from '../../Card/Card'
import axios from 'axios'
import cover from '../../../assets/cover.jpg'
import firebase from "firebase";
import ReactRoundedImage from "react-rounded-image";
import './ProfilePage.css'
class ProfilePage extends Component{
    state={
        hasRequest:false,
        image:"https://p1.hiclipart.com/preview/823/765/288/login-icon-system-administrator-user-user-profile-icon-design-avatar-face-head-png-clipart.jpg",
        order:null
    }


    componentDidMount() {
        axios.get('http://buy-the-way-a829f.firebaseio.com/orders.json')
            .then(response=>{
                 let orders=response.data
                console.log(orders)
                for(let key in orders){
                    if(orders[key].username===localStorage.getItem('username')){
                        this.setState({hasRequest:true,image:orders[key].imageURL,order:orders[key]})
                    }
                }

            })
    }

    goToOrderForm=()=>{
        this.props.history.push('/OrderForm')
    }
    updateUserOrder=()=>{
        // firebase.database().ref('users/' + userId).set({
        //     name:
        //     profile_picture : imageUrl
        // });
    }
    removeOrder=()=>{
        let firebaseConfig = {
            apiKey: "AIzaSyBhjnNRBDpLdxhRwXRbiPUohAQTudP33KA",
            authDomain: "buy-the-way-a829f.firebaseapp.com",
            databaseURL: "https://buy-the-way-a829f.firebaseio.com",
            projectId: "buy-the-way-a829f",
            storageBucket: "buy-the-way-a829f.appspot.com",
            messagingSenderId: "801518734561",
            appId: "1:801518734561:web:bfb1a37104c212e31d3ba0",
            measurementId: "G-F8R84WHH2H"
        };
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
        this.database = firebase.database();
        axios.get('http://buy-the-way-a829f.firebaseio.com/orders.json')
            .then(response=>{
                let orders=response.data
                console.log(orders)
                for(let key in orders){
                    if(orders[key].username===localStorage.getItem('username')){
                        console.log(key, "key")
                        let userRef = this.database.ref('orders/'+key);
                        console.log(userRef)

                        userRef.remove()
                        break;
                    }

                }
                window.location.reload(false);
            })
    }
    clicked=()=>{
        console.log("lksdsdl")
    }
    render() {

        let button=null
        let button2=null
        let fullName='FirstName LastName'
        if(this.state.hasRequest){
            console.log(this.state.order)
            fullName=<h1>{this.state.order.firstName.value+" "+this.state.order.lastName.value}</h1>
             button2= <div style={{marginLeft:"10%"}}>
                 <OrderCard
                     address={this.state.order.address}
                     groceries={this.state.order.items}
                 comment={this.state.order.comment}/>
                 </div>

        }
        else{
            button2=
                // <div>
                    <Button variant="primary" onClick={this.goToOrderForm}>Enter request</Button>
                // </div>

        }
        return(
            <div >
                <div className='coverImage'>
                    <img src={cover}></img>
                </div>
                {/*<div>*/}
                    <div className='content' >
                        <div style={{display:'flex', justifyContent:'center',}}>
                            <ReactRoundedImage
                                image={this.state.image}
                                roundedColor="white"
                                imageWidth="200"
                                imageHeight="200"
                                hoverColor="grey"
                                roundedSize="15"

                            />
                        </div>
                        <div className='fullName'>
                            {fullName}

                        </div>

                        {/*<div>*/}
                        {/*    {button}*/}

                        {/*</div>*/}
                        {button2}

                    </div>
                <div style={{marginLeft:"10%",marginTop:'10%'}}>

                </div>


                {/*</div>*/}
            </div>


        )
    }

}
export default ProfilePage