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
                        <Card.Meta>Address:</Card.Meta>
                        <Card.Description>
                            Groceries
                            <ui>
                                <li>
                                    milk
                                </li>
                                <li>
                                    milk
                                </li>
                                <li>
                                    milk
                                </li>
                            </ui>
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