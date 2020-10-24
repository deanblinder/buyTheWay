import React, {Component} from "react";
import {Button, Container, Col,Row, Image, Card} from 'react-bootstrap'
import avatar from '../../../assets/avatar.jpg'
import axios from 'axios'
import order from "../../Orders/Order/Order";
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
        axios.get('https://buy-the-way-a829f.firebaseio.com/orders.json')
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
    removeOrder=()=>{
        // let firebaseConfig = {
        //     apiKey: "AIzaSyBhjnNRBDpLdxhRwXRbiPUohAQTudP33KA",
        //     authDomain: "buy-the-way-a829f.firebaseapp.com",
        //     databaseURL: "https://buy-the-way-a829f.firebaseio.com",
        //     projectId: "buy-the-way-a829f",
        //     storageBucket: "buy-the-way-a829f.appspot.com",
        //     messagingSenderId: "801518734561",
        //     appId: "1:801518734561:web:bfb1a37104c212e31d3ba0",
        //     measurementId: "G-F8R84WHH2H"
        // };
        // // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);
        // axios.delete("https://buy-the-way-a829f.firebaseio.com/orders").
        // then()
        // let userRef = this.database.ref('orders/' + this.props.match.params.username);
        // console.log(u)
        // userRef.remove()
    }
    render() {
        console.log(localStorage)
        let button=null
        let button2=null
        if(this.state.hasRequest){
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
                                <Button variant="primary">עריכה</Button>
                            </div>
                            <div style={{paddingLeft:'10%' ,float:'left'}}>
                                <Button variant="primary">הסרה</Button>
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

                    <Row>
                        <div style={{paddingRight:'30%',paddingLeft:'0%',width:'10%'}}>
                    <Col>

                        <ReactRoundedImage
                            image={this.state.image}
                            // roundedColor="#321124"
                            imageWidth="150"
                            imageHeight="150"
                            roundedSize="0"
                        />

                    </Col>
                        </div>
                    <Col>
                        {button}
                        {button2}
                    </Col>
                    </Row>


            </div>
        )
    }

}
export default ProfilePage