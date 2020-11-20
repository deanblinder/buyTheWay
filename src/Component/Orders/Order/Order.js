import React, {Component} from "react";
import './Order.css'
import {Button,Card,Row,Col} from 'react-bootstrap'
// import avatar from '../../../assets/avatar.jpg'
import 'whatsapp-button/whatsapp-button.js';
import faceBook from '../../../assets/facebook.jpg'
import { render } from 'react-dom';
import {Link} from "react-router-dom";


class Order extends Component{
        facebookClick=()=>{
            console.log("ksjdksdk")
        }
        render() {

        let number=this.props.phoneNumber.slice(1)
        // console.log(number)
        let myPhoneNumber="https://wa.me/972"+number
        return(
            <div>
                <Card style={{ width: '18rem'}}>
                        <img alt='' variant="top" style={{width:'100%', height:"200px"}} src={this.props.image} />
                    <Card.Body>
                        <Card.Title><h6>name:{this.props.fullName}</h6></Card.Title>
                        <h6>address:{this.props.address} </h6>
                        {/*<h6>phone:{this.props.phoneNumber}</h6>*/}
                        <Card.Text>
                            <h6>reason:{this.props.reason}</h6>
                            {/*<br/>*/}
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
                            {/*ldsfl*/}
                            {/*<div>*/}
                                {/*<Row>*/}
                                    {/*<Col>*/}
                                        <whatsapp-button style={{marginTop:'10%'}} phone={myPhoneNumber} text="" label="Start Chat"></whatsapp-button>
                                    {/*</Col>*/}
                                    {/*<Col>*/}
                                        {/*<a href="https://www.facebook.com/">*/}
                                        {/*<img onClick={this.facebookClick} src={faceBook} style={{height:'100%',width:'120%'}} />*/}
                                        {/*</a>*/}
                                        {/*</Col>*/}
                                {/*</Row>*/}
                            {/*</div>*/}

                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )

    }

}
// render(<Order />, document.getElementById('root'));
export default Order;