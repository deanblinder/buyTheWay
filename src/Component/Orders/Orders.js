import React, {Component} from "react";
import axios from 'axios'
import Order from '../Orders/Order/Order'


class Orders extends Component{
    state={
        orders:[
            {
                lat: "12321",
                lng: "324234" ,
                reason:"isolate",
                address:"gat 8",
                phoneNumber:"048243621",
                where:"super",
                fullName:"dean blinder",
                userName:"deanblinder",
                groceries:["milk","apple"]
            }
        ],
        loading:true
    }
    componentDidMount() {
        // axios.get('https://dean-project-291812.firebaseio.com/requests.json')
        //     .then(response=>{
        //         let orders=[]
        //         for(let key in response.data) {
        //             let groceries=[]
        //             for (let item in response.data[key].groceries) {
        //                 groceries.push(response.data[key].groceries[item])
        //             }
        //             let request={
        //                 lat: response.data[key].location.lat,
        //                 lng: response.data[key].location.lng,
        //                 reason:response.data[key].reason,
        //                 address:response.data[key].location.address,
        //                 phoneNumber:response.data[key].PhoneNumber,
        //                 where:response.data[key].whichHelp,
        //                 fullName:response.data[key].name+" "+response.data[key].lastName,
        //                 userName:response.data[key].userName,
        //                 groceries:groceries
        //             }
        //             orders.push(request)
        //         }
        //         this.setState({orders:orders})
        //         console.log(orders)
        //     })
    }

    render() {
        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order
                        key={order.userName}
                        phoneNumber={order.phoneNumber}
                        address={order.address}
                        groceries={order.groceries}
                        fullName={order.fullName}
                        reason={order.reason}/>
                ))}
            </div>
        );
    }
}
export default Orders