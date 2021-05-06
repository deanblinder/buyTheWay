import Order from '../Orders/Order/Order'
import axios from 'axios'
import React,{Component} from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import icon from '../../assets/mapIcon.jpg'

export class MapContainer extends Component {
    state = {
        markers: [
            {}
        ],
        initLat: null,
        initLng: null,
        selectedMark: null,
        place:{
            place:"",
            coordinates:{lat:31.243870,lng:34.793991}
        }
    }
    componentDidMount() {
        axios.get('https://buy-the-way-a829f.firebaseio.com/orders.json')
            .then(response=>{
                let requests=[]
                let flag=true
                let index=0;
                for(let key in response.data){
                    let request={
                        id:index++,
                        lat: response.data[key].lat,
                        lng: response.data[key].lng,
                        firstName:response.data[key].firstName,
                        lastName:response.data[key].lastName,
                        reason:response.data[key].reason,
                        address:response.data[key].address,
                        phoneNumber:response.data[key].phoneNumber.value,
                        items:response.data[key].items,
                        comment:response.data[key].comment,
                        image:response.data[key].imageURL,
                        username:response.data[key].username
                       }
                    requests.push(request)
                }
                 this.setState({markers:requests})
            })
        axios.get("gs://buy-the-way-a829f.appspot.com")
            .then(response=>{

            })
    }
    markerClick=(marker)=>{
        this.setState({selectedMark: marker})
        let copiedPlace={
            ...this.state.place
        }
        copiedPlace.coordinates.lng=marker.lng
        copiedPlace.coordinates.lat=marker.lat
        this.setState({place:copiedPlace})
    }
    render() {
        const google_key = process.env.REACT_APP_GOOGLE_API_KEY;
        return (
            <div>
                <div style={{backgroundColor:'white'}}/>
            <Map center={{lat: this.state.place.coordinates.lat,lng:this.state.place.coordinates.lng}} initialCenter={{lat: this.state.place.coordinates.lat, lng: this.state.place.coordinates.lng}} google={this.props.google} zoom={14}>
                {this.state.markers.map((marker, i) => {
                    return marker.username === localStorage.getItem('username') ?
                        <Marker
                            key={i}
                            position={{
                                lat: marker.lat,
                                lng: marker.lng,
                            }}
                            onClick={()=>this.markerClick(marker)}
                            icon={{
                                url:icon,
                                scaledSize: new window.google.maps.Size(25,40)
                            }}
                        />
                        : <Marker
                            key={i}
                            position={{
                                lat: marker.lat,
                                lng: marker.lng,
                            }}
                            onClick={()=>this.markerClick(marker)}
                        />
                })}
                    {this.state.selectedMark && (
                        <InfoWindow
                            onClose={() => {
                                 this.setState({selectedMark: null});
                            }}
                            position={{
                                lat:( this.state.selectedMark.lat),
                                lng: (this.state.selectedMark.lng)
                            }}
                            visible={true}
                        >
                            <div>
                                <Order
                                    image={this.state.selectedMark.image}
                                    fullName={this.state.selectedMark.firstName.value+" "+this.state.selectedMark.lastName.value}
                                    phoneNumber={this.state.selectedMark.phoneNumber}
                                    groceries={this.state.selectedMark.items}
                                    address={this.state.selectedMark.address}
                                    reason={this.state.selectedMark.reason}
                                    comment={this.state.selectedMark.comment}
                                    />
                            </div>
                        </InfoWindow>
                    )}
            </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({

    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)