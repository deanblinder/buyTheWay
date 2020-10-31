import React, {Component} from "react";
import {Button, Container, Col,Row, Card} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import avatar from '../../../assets/avatar.jpg'
import axios from 'axios'
import order from "../../Orders/Order/Order";
import cover from '../../../assets/cover.jpg'
import firebase from "firebase";
import ReactRoundedImage from "react-rounded-image";
import ImageUploader from "../../ImageUploader/ImageUploader";
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
                        window.location.reload(false);
                        break;
                    }
                }
            })
    }
    render() {

        // window.location.reload(true);
        console.log(localStorage)
        let button=null
        let button2=null
        let fullName='FirstName LastName'
        if(this.state.hasRequest){
            fullName=<h1>{this.state.order.firstName.value}</h1>
            button2= <div style={{textAlign:'right' }} className='-webkit-input-placeholder'>
                <Card style={{ width: '18rem' }}>
                    <img alt='' variant="top" style={{width:'100%', height:"200px"}} src={this.state.order.imageURL} />
                    <Card.Body>
                        <Card.Title>שם:{this.state.order.firstName.value+" "+this.state.order.lastName.value}</Card.Title>
                        <h6> כתובת:{this.state.order.address}</h6>
                        {/*<h6>phone:{this.props.phoneNumber}</h6>*/}
                        <Card.Text>
                            <h6>סיבה:{this.state.order.reason}</h6>
                            {/*<br/>*/}
                            <h6>:מצרכים</h6>
                            {
                                this.state.order.items.map((item,i)=>(
                                    <lu key={i} dir="rtl">
                                        <li>
                                            <strong>{item}</strong>
                                        </li>
                                    </lu>
                                ))
                            }
                            <h6>:הערות</h6>{this.state.order.comment}
                            <br/>
                            {/*<whatsapp-button phone={myPhoneNumber} text="" label="Start Chat"></whatsapp-button>*/}
                            <div style={{paddingLeft:'10%' ,float:'left'}}>
                                <Button variant="primary" onClick={this.updateUserOrder}>עריכה</Button>
                            </div>
                            <div style={{paddingLeft:'10%' ,float:'left'}}>
                                <Button variant="primary" onClick={this.removeOrder}>הסרה</Button>
                            </div>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        }
        else{
            button=
                <div style={{paddingTop:'10%'}}>
                    <Button variant="primary" onClick={this.goToOrderForm}>Enter request</Button>
                </div>

        }
        return(
            <div>
            <div style={{position:'relative'}}>
                <div className='coverImage'>
                    <img src={cover} style={{position:"absolute"}}></img>
                </div>
            </div>
                {/*<div>*/}
                    <div className='content' >
                        <div style={{display:'flex', justifyContent:'center'}}>
                        <ReactRoundedImage
                            image={this.state.image}
                            roundedColor="white"
                            imageWidth="200"
                            imageHeight="200"
                            hoverColor="grey"
                            roundedSize="10"
                        />
                        </div>
                        <div className='fullName'>
                            {fullName}
                        </div>
                        <div>
                            {button}
                            {button2}
                        </div>

                    </div>

                {/*</div>*/}


            </div>


        )
    }

}
export default ProfilePage