import React, {Component} from "react";
import {Button, Form,InputGroup,FormControl} from "react-bootstrap";
import './OrderForm.css'
import GoogleAutoComplete from '../GoogleAutoComplete/GoogleAutoComplete'
import axios from 'axios'
import firebase from 'firebase'
import {storage} from "../firebaseConfig";
// import image from "react-firebase-file-uploader/lib/utils/image";
import avatar from '../../assets/avatar.jpg'
import image from "react-firebase-file-uploader/lib/utils/image";
import { GoogleComponent } from 'react-google-location'

// import FileUploader from 'react-firebase-file-uploader'


class OrderForm extends Component{
    state={
        firstName:'',
        lastName:'',
        phoneNumber:'',
        reason:'isolate',
        items:[""],
        comment:'',
        // myLat:'',
        // myLng:'',
        place:'',
        address:'',
        image:null,
        url:'',
        progress:''


    }
    componentDidMount() {
        axios.get("https://buy-the-way-a829f.firebaseio.com/users.json")
            .then(response=>{
                let myPic=null;
                let users=response.data
                console.log(users)
                for(let key in users){
                    if(users[key].userName===localStorage.getItem('username')){
                        myPic=users[key].profilePic
                        this.setState({image:myPic})
                        // console.log(myPic,'mypic')
                    }
                }
            }
        )
    }

    addItem=()=>{
         let copiedItems=this.state.items
         copiedItems.push('')
         this.setState({items:copiedItems})
        // this.setState(prevState => ({ items: [...prevState.items, '']}))
        console.log(this.state.items)
    }
    removeItems=(groceryId)=>{
        let updatedGroceries=[
            ...this.state.orderForm.groceries
        ]
        if(updatedGroceries.length!==1){
            let finalGroceries=[];
            for(let grocery in updatedGroceries){
                if(updatedGroceries[groceryId]!==updatedGroceries[grocery]){
                    finalGroceries.push(updatedGroceries[grocery])
                }
            }
            let updatedForm={
                ...this.state.orderForm
            }
            updatedForm.groceries=finalGroceries
            this.setState({orderForm:updatedForm})
        }

    }
    nameChangedHandler=(event)=>{
        let copiedName= {
            ...this.state.firstName
        }
        copiedName.value=event.target.value;
        this.setState({firstName:copiedName})
        console.log(this.state.firstName)
    }
    lastNameChangedHandler=(event)=>{
        let copiedName= {
            ...this.state.lastName
        }
        copiedName.value=event.target.value;
        this.setState({lastName:copiedName})
        console.log(this.state.lastName)
    }
    phoneNumberChangedHandler=(event)=>{
        let copiedName= {
            ...this.state.phoneNumber
        }
        copiedName.value=event.target.value;
        this.setState({phoneNumber:copiedName})
        console.log(this.state.phoneNumber)
    }
    reasonChangedHandler=(event)=>{
        let copiedName= {
            ...this.state.reason.value
        }
        copiedName.value=event.target.value;
        console.log(copiedName.value,"copied")
        // console.log(this.state.reason)
        this.setState({reason:copiedName.value})

    }
    itemChangeHandler=(event,i)=>{
        let copiedItems =[
            ...this.state.items
        ]
        copiedItems[i]=event.target.value;
        this.setState({items:copiedItems})
    }
    commentChangedHandler=(event)=>{
        let copiedComment={
            ...this.state.comment.value
        }
        copiedComment.value=event.target.value
        this.setState({comment:copiedComment.value})
    }
    handleOrder=(event)=>{
        event.preventDefault();
        console.log("jdjdj")
        let order={
            username:localStorage.getItem('username'),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber:this.state.phoneNumber,
            reason:this.state.reason,
            items:this.state.items,
            comment:this.state.comment,
            address:this.state.place.place,
            lat:this.state.place.coordinates.lat,
            lng:this.state.place.coordinates.lng,
            // place:this.state.place.coordinates.
            imageURL:this.state.image

         }
        console.log(order)

        axios.post("https://buy-the-way-a829f.firebaseio.com/orders.json",order).then(
            response=>{
                console.log(localStorage.getItem('username'))
                this.props.history.push("/profilePage")
                window.location.reload(false);
            }
        )
    }
    changeLanLngHandler=(lat,lng,address)=>{
        this.setState({myLat:lat,myLng:lng,address:address})
        console.log(this.state.myLat,this.state.myLng,this.state.address,'dean')
    }
    // changeImageHandler=(e)=>{
    //     const file=e.target.files[0];
    //     if(file){
    //         const fileType= file["type"]
    //         const validImageTypes=['image/gif','image/jpeg','image/png']
    //         if(validImageTypes.includes(fileType)){
    //             this.setState({image:file})
    //         }
    //         else{
    //             alert("Image type is not good")
    //         }
    //     }
    // }

    render() {
        return(
            <div className="OrderForm">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <div className='Heading'>first name:</div>
                        <Form.Control type="text"
                                      placeholder="first name"
                                      onChange={(event)=>this.nameChangedHandler(event)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <div className='Heading'>last name:</div>
                        <Form.Control type="text"
                                      placeholder="last name"
                                      onChange={(event)=>this.lastNameChangedHandler(event)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <div className='Heading'>phone number:</div>
                        <Form.Control type="text"
                                      placeholder="phone number"
                                      onChange={(event)=>this.phoneNumberChangedHandler(event)}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <div className='Heading'>reason:</div>

                        <Form.Control style={{textAlign:"right"}} as="select" custom onChange={(event)=>this.reasonChangedHandler(event)}>
                                <option>isolate</option>
                                <option>risk group</option>
                                <option>other...</option>
                        </Form.Control>

                    </Form.Group>
                    <Form.Group>
                        <div className='Heading'>groceries:</div>
                    {
                        this.state.items.map((item,i)=>(
                            <div key={i} >
                                <Form.Row>
                                    <InputGroup >
                                        <FormControl
                                            placeholder="item"
                                            aria-label="Item"
                                            aria-describedby="basic-addon2"
                                            onChange={(event)=>this.itemChangeHandler(event,i)}
                                        />
                                        <div className='orderButton'>
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" onClick={this.addItem}>add</Button>
                                                <Button variant="outline-secondary" >delete</Button>
                                            </InputGroup.Append>
                                        </div>


                                    </InputGroup>
                                </Form.Row>
                            </div>
                        ))
                    }
                        <Form.Group controlId="formBasicEmail">
                            <div className='Heading'>comments:</div>
                            <Form.Control type="text"
                                          placeholder="comments"
                                          onChange={(event)=>this.commentChangedHandler(event)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <div className='Heading'>address:</div>
                            <div style={{backgroundColor:'white'}}>
                                {/*<GoogleAutoComplete></GoogleAutoComplete>*/}
                                <GoogleComponent language={'iw'} coordinates={true} apiKey={"AIzaSyBRpBf8IvQe7mDA4buTgraHSYquHlzf0n4"} onChange={(e) => { this.setState({ place: e }) }}></GoogleComponent>
                            </div>
                        </Form.Group>
                    </Form.Group>
                        {/*<Button variant="primary"*/}
                        {/*        type="submit"*/}
                        {/*        onClick={this.handleOrder}>*/}
                        {/*    Submit*/}
                        {/*</Button>*/}
                </Form>
            </div>
        )
    }
}
export default OrderForm