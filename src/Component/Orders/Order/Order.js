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
            // <div className='Order'>
            //     <h1>Address: {this.props.address}</h1>
            //     <h3>Phone number : {this.props.phoneNumber}</h3>
            //     <div style={{float:'right'}}>
            //         <p >Distance: 100m</p>
            //         <p >Comments:{this.props.comments}</p>
            //     </div>
            //     <p>Name: {this.props.fullName}</p>
            //     <p>Reason: {this.props.reason}</p>
            //     <p >groceries:</p>
            //     {
            //         this.props.groceries.map((grocery,i)=>{
            //             return(
            //                 <lu>
            //                     <li>
            //                         {/*{grocery.value}*/}
            //                         {grocery}
            //                     </li>
            //                 </lu>
            //
            //             )
            //         })
            //     }
            //
            // </div>
            <div>
                <Card style={{ width: '18rem', textAlign:'right' }}>
                        <img alt='' variant="top" style={{width:'100%', height:"200px"}} src={this.props.image} />
                    <Card.Body>
                        <Card.Title><h6>שם:{this.props.fullName}</h6></Card.Title>
                        <h6>כתובת:{this.props.address} </h6>
                        {/*<h6>phone:{this.props.phoneNumber}</h6>*/}
                        <Card.Text>
                            <h6>סיבה:{this.props.reason}</h6>
                            {/*<br/>*/}
                            <h6>:מצרכים</h6>
                            {
                                this.props.groceries.map((item,i)=>(
                                    <lu key={i} dir="rtl">
                                        <li>
                                            <strong>{item}</strong>
                                        </li>
                                    </lu>
                                ))
                            }
                            <h6>:הערות</h6>{this.props.comment}
                            <br/>
                            <div>
                                <Row>
                                    <Col>
                                        <whatsapp-button style={{marginTop:'10%'}} phone={myPhoneNumber} text="" label="Start Chat"></whatsapp-button>
                                    </Col>
                                    <Col>
                                        <img onClick={this.facebookClick} src={faceBook} style={{height:'100%',width:'120%'}} />
                                    </Col>
                                </Row>
                            </div>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )

    }

}
// render(<Order />, document.getElementById('root'));
export default Order;