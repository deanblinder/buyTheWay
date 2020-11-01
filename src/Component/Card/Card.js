import React, {Component} from 'react'
 // import {Card,Button} from "react-bootstrap";
import './Card.css'
import avatar from '../../assets/avatar.jpg'
// import 'semantic-ui-css/semantic.min.css'
import { Button, Card, Image,Icon } from 'semantic-ui-react'
class CardExampleGroups extends Component {
    render() {
        return(
            // <div  className='Card'>
                <Card>
                    {/*<Card.Content>*/}

                        <Card.Header>My active request</Card.Header>
                        <Card.Meta>Address: {this.props.address}</Card.Meta>
                        <Card.Description>
                            Groceries
                            {
                                this.props.groceries.map((item,i)=>(
                                    <lu key={i}>
                                        {/*dir="rtl"*/}
                                        <li>
                                            <strong>{item}</strong>
                                        </li>
                                    </lu>
                                ))
                            }
                            comment:{this.props.comment}
                        </Card.Description>
                    {/*</Card.Content>*/}
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'>
                                Edit
                            </Button>
                            <Button basic color='red'>
                                Remove
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            // </div>
        )
    }

}

export default CardExampleGroups