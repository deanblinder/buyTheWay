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
        reason:'בידוד',
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
        if(image){
            storage.ref(`profile/${this.state.image.name}`).put(this.state.image)
            storage.ref("profile").child(this.state.image.name).getDownloadURL().then(myURL=>{
                // this.setState({url:myURL,progress:0})
                console.log(myURL,"url")
                // if(!myURL){
                //     myURL='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hiclipart.com%2Ffree-transparent-background-png-clipart-pfjjr&psig=AOvVaw0hO-Oim3nCrAKZksWdYL-D&ust=1603208330555000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjDk9D-wOwCFQAAAAAdAAAAABAE'
                // }
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
                    imageURL:myURL

                }
                console.log(order)

                axios.post("https://buy-the-way-a829f.firebaseio.com/orders.json",order).then()
                console.log(localStorage.getItem('username'))
                 this.props.history.push("profilePage")

            })
        }
        else {
            let order={
                username:this.props.match.params.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber:this.state.phoneNumber,
                reason:this.state.reason,
                items:this.state.items,
                comment:this.state.comment,
                address:this.state.place.place,
                lat:this.state.place.coordinates.lat,
                lng:this.state.place.coordinates.lng,
                imageURL:"https://p1.hiclipart.com/preview/823/765/288/login-icon-system-administrator-user-user-profile-icon-design-avatar-face-head-png-clipart.jpg"

            }
            console.log(order)
            axios.post("https://buy-the-way-a829f.firebaseio.com/orders.json",order).then()
            window.location.reload(false);
        }


    }
    changeLanLngHandler=(lat,lng,address)=>{
        this.setState({myLat:lat,myLng:lng,address:address})
        console.log(this.state.myLat,this.state.myLng,this.state.address,'dean')
    }
    changeImageHandler=(e)=>{
        const file=e.target.files[0];
        if(file){
            const fileType= file["type"]
            const validImageTypes=['image/gif','image/jpeg','image/png']
            if(validImageTypes.includes(fileType)){
                this.setState({image:file})
            }
            else{
                alert("Image type is not good")
            }
        }
    }

    render() {
        const imgClick=()=>{
            console.log("kdlsdlsdkl")
        }
        console.log(this.state)
        return(
            <div className="OrderForm">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>שפ פרטי</Form.Label>
                        <Form.Control type="text"
                                      placeholder="שם פרטי"
                                      onChange={(event)=>this.nameChangedHandler(event)}
                                      style ={{textAlign:'right'}}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>שם משפחה</Form.Label>
                        <Form.Control type="text"
                                      placeholder="שם משפחה"
                                      onChange={(event)=>this.lastNameChangedHandler(event)}
                                      style ={{textAlign:'right'}}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>מספר טלון</Form.Label>
                        <Form.Control type="text"
                                      placeholder="מספר טלפון"
                                      onChange={(event)=>this.phoneNumberChangedHandler(event)}
                                      style ={{textAlign:'right'}}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>סיבה</Form.Label>
                        <Form.Control as="select" custom onChange={(event)=>this.reasonChangedHandler(event)}>
                            <option>בידוד</option>
                            <option>קבוצת סיכון</option>
                            <option>אחר..</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>קניות</Form.Label>
                    {
                        this.state.items.map((item,i)=>(
                            <div key={i}>
                                <Form.Row>
                                    <InputGroup>
                                        <div className='orderButton'>
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" onClick={this.addItem}>עוד</Button>
                                                <Button variant="outline-secondary" >מחק</Button>
                                            </InputGroup.Append>
                                        </div>
                                        <FormControl
                                            placeholder="מוצר"
                                            aria-label="Item"
                                            aria-describedby="basic-addon2"
                                            onChange={(event)=>this.itemChangeHandler(event,i)}
                                        />


                                    </InputGroup>
                                </Form.Row>
                            </div>
                        ))
                    }
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>הערות</Form.Label>
                            <Form.Control type="text"
                                          placeholder="הערות"
                                          onChange={(event)=>this.commentChangedHandler(event)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>כתובת</Form.Label>
                            <div style={{backgroundColor:'white'}}>
                                <GoogleComponent language={'iw'} coordinates={true} apiKey={"AIzaSyCz75H6TUotNy-TcGON0wmw5pjOM2quK6s"} onChange={(e) => { this.setState({ place: e }) }}></GoogleComponent>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.File id="exampleFormControlFile1" type="file" onChange={this.changeImageHandler} label="בחר תמונה" />
                        </Form.Group>
                    </Form.Group>
                        <Button variant="primary"
                                type="submit"
                                onClick={this.handleOrder}>
                            Submit
                        </Button>
                </Form>
            </div>
        )
    }
}
export default OrderForm