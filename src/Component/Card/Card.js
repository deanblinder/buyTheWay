import React, {Component} from 'react'
import './Card.css'
import { Button, Card, Image,Icon } from 'semantic-ui-react'
class CardExampleGroups extends Component {
    render() {
        return(
                <Card>
                        <Card.Header>My active request</Card.Header>
                        <Card.Meta>Address: {this.props.address}</Card.Meta>
                        <Card.Description>
                            Groceries
                            {
                                this.props.groceries.map((item,i)=>(
                                    <lu key={i}>
                                        <li>
                                            <strong>{item}</strong>
                                        </li>
                                    </lu>
                                ))
                            }
                            comment:{this.props.comment}
                        </Card.Description>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'>
                                Edit
                            </Button>
                            <Button basic color='red' onClick={this.props.removeOrder}>
                                Remove
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
        )
    }

}

export default CardExampleGroups