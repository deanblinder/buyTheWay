import React, {Component} from "react";
import './Order.css'
import {Button,Card,Row,Col} from 'react-bootstrap'
import 'whatsapp-button/whatsapp-button.js';
class Order extends Component{
        facebookClick=()=>{
            console.log("ksjdksdk")
        }
        render() {
        let number=this.props.phoneNumber.slice(1)
        let myPhoneNumber="https://wa.me/972"+number
        return(
            <div>
                <Card style={{ width: '18rem'}}>
                        <img alt='' variant="top" style={{width:'100%', height:"200px"}} src={this.props.image} />
                    <Card.Body>
                        <Card.Title><h6>name:{this.props.fullName}</h6></Card.Title>
                        <h6>address:{this.props.address} </h6>
                        <Card.Text>
                            <h6>reason:{this.props.reason}</h6>
                            <h6>groceries:</h6>
                            {
                                this.props.groceries.map((item,i)=>(
                                    <lu key={i}>
                                        <li>
                                            <strong>{item}</strong>
                                        </li>
                                    </lu>
                                ))
                            }
                            <h6>comments:</h6>{this.props.comment}
                            <br/>
                            <whatsapp-button style={{marginTop:'10%'}} phone={myPhoneNumber} text="" label="Start Chat"></whatsapp-button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default Order;