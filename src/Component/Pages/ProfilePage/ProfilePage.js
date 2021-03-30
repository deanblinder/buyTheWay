import React, {Component} from "react";
import {Container, Col,Row,Image,Card,Button} from 'react-bootstrap'
import 'semantic-ui-css/semantic.min.css'
import OrderCard from '../../Card/Card'
import axios from 'axios'
// import cover from '../../../assets/cover.jpg'
import cover from '../../../assets/emptyImg.jpg'
import firebase from "firebase";
import ReactRoundedImage from "react-rounded-image";

import './ProfilePage.css'
import {storage} from "../../firebaseConfig";
class ProfilePage extends Component{
    state={
        hasRequest:false,
        profilePic:"https://p1.hiclipart.com/preview/823/765/288/login-icon-system-administrator-user-user-profile-icon-design-avatar-face-head-png-clipart.jpg",
        coverPic:cover,
        user:null,
        order:null
    }


    componentDidMount() {
        axios.get('http://buy-the-way-a829f.firebaseio.com/orders.json')
            .then(response=>{
                 let orders=response.data
                console.log(orders)
                for(let key in orders){
                    if(orders[key].username===localStorage.getItem('username')){
                        this.setState({hasRequest:true,order:orders[key]})
                    }
                }

            })
        axios.get('http://buy-the-way-a829f.firebaseio.com/users.json')
            .then(response=>{
                let users=response.data
                // console.log(users)
                for(let key in users){
                    if(users[key].userName===localStorage.getItem('username')){
                        console.log(users[key],"user")
                        this.setState({user:users[key]})
                        if(this.state.user.coverPic){
                            this.setState({coverPic:this.state.user.coverPic})
                        }
                        if(this.state.user.profilePic){
                            this.setState({profilePic:this.state.user.profilePic})
                        }
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
                // window.location.reload(false);
            })
    }
    changeCoverPicHandler=(e)=>{
        const file=e.target.files[0];
        if(file){
            const fileType= file["type"]
            const validImageTypes=['image/gif','image/jpeg','image/png']
            if(validImageTypes.includes(fileType)){
                // this.setState({profilePic:file})
                console.log(file.name)
                storage.ref(`profile/${file.name}`).put(file)
                storage.ref("profile").child(file.name).getDownloadURL().then(myURL=>{
                    console.log(myURL)
                    this.setState({coverPic:myURL})
                    axios.get('https://buy-the-way-a829f.firebaseio.com/users.json')
                        .then(response=>{
                            // console.log(response)
                            let users=response.data
                            for(let key in users){
                                if(users[key].userName===localStorage.getItem('username')){
                                    console.log(key,'key')
                                    firebase.database().ref('users/' + key).update({
                                        coverPic : myURL
                                    }, function(error) {
                                        if (error) {
                                            console.log("The write failed...")
                                            // The write failed...
                                        } else {
                                            console.log("Data saved successfully!")
                                            // Data saved successfully!
                                        }
                                    });
                                }

                            }
                        })
                })
            }
            else{
                alert("Image type is not good")
            }
        }
    }
    changeProfilePicHandler=(e)=>{
        const file=e.target.files[0];
        if(file){
            const fileType= file["type"]
            const validImageTypes=['image/gif','image/jpeg','image/png']
            if(validImageTypes.includes(fileType)){
                // this.setState({profilePic:file})
                console.log(file.name)
                storage.ref(`profile/${file.name}`).put(file)
                storage.ref("profile").child(file.name).getDownloadURL().then(myURL=>{
                    console.log(myURL)
                    this.setState({profilePic:myURL})
                    axios.get('https://buy-the-way-a829f.firebaseio.com/users.json')
                        .then(response=>{
                            // console.log(response)
                            let users=response.data
                            for(let key in users){
                                if(users[key].userName===localStorage.getItem('username')){
                                    console.log(key,'key')
                                    firebase.database().ref('users/' + key).update({
                                        profilePic : myURL
                                    }, function(error) {
                                        if (error) {
                                            console.log("The write failed...")
                                            // The write failed...
                                        } else {
                                            console.log("Data saved successfully!")
                                            // Data saved successfully!
                                        }
                                    });
                                }

                            }
                        })
                })
            }
            else{
                alert("Image type is not good")
            }
        }
    }
    render() {
        let button2=null
        let fullName='FirstName LastName'
        if(this.state.hasRequest){
            console.log(this.state.order)
            fullName=<h1>{this.state.order.firstName.value+" "+this.state.order.lastName.value}</h1>
             button2= <div style={{marginLeft:"10%",zIndex:'1'}}>
                 <OrderCard
                     address={this.state.order.address}
                     groceries={this.state.order.items}
                     comment={this.state.order.comment}
                     removeOrder={this.removeOrder}/>
                 </div>
        }
        else{

                button2= <Button  variant="primary" onClick={this.goToOrderForm}>Enter request</Button>

        }
        return(
            <div>
            <div style={{position:'relative'}}>
                    <div className='coverImage'>
                        <img src={this.state.coverPic}></img>
                            <div style={{position:'absolute', top:'55%',right:'85%',zIndex:'1'}}>
                                <input id='coverPic'  type='file' onChange={this.changeCoverPicHandler}></input>
                                <label style={{marginLeft:'80%' , width: '100%'}}  htmlFor='coverPic'>
                                    <span className="material-icons">
                                        add_photo_alternate
                                    </span>&nbsp;
                                    change cover picture
                                </label>
                            </div>
                    </div>
                <div style={{position:'absolute', top:'50%',justifyContent:'center',width:'100%'}}>
                    <div className='profilePic'>
                        <div style={{display:'flex', justifyContent:'center', position:'relative',zIndex:'0'}} >
                           <div style={{justifyContent:'center'}}>
                               <ReactRoundedImage
                                   image={this.state.profilePic}
                                   roundedColor="white"
                                   imageWidth="200"
                                   imageHeight="200"
                                   hoverColor="grey"
                                   roundedSize="15"
                               />
                           </div>

                            <div style={{position:'absolute',top:'70%',left:'60%',height:'10%'}}>
                                <input id='profilePic' type='file' onChange={this.changeProfilePicHandler}></input>
                                <label style={{marginLeft: '50%'}} htmlFor='profilePic'>
                                        <span className="material-icons">
                                        add_photo_alternate
                                         </span> &nbsp;
                                </label>
                            </div>
                        </div>
                        <div className='fullName'>
                            {fullName}
                        </div>

                    </div>
                    <div style={{marginLeft:'47%',marginTop:'2%'}}>
                        {/*<Button variant="primary">Edit profile</Button>*/}
                        {button2}
                    </div>
                </div>
            </div>

            </div>
        )
    }

}
export default ProfilePage