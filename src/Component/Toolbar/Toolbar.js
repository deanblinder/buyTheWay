import React, {Component} from "react";
import {Nav,Navbar} from 'react-bootstrap'

class Toolbar extends Component{
    state={
        isLoggedIn:false
    }
    componentDidMount() {
        localStorage.getItem('isLoggedIn')==="true"? this.setState({isLoggedIn:true}):this.setState({isLoggedIn:false})
    }

    logOut=()=>{
        // event.preventDefault();
        this.setState({isLoggedIn:false})
        localStorage.clear()
    }
    render() {
        return(
            <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand hidden={this.state.isLoggedIn} href="/">Home</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link hidden={!this.state.isLoggedIn} href="/profilePage"  >profile</Nav.Link>
                            <Nav.Link hidden={!this.state.isLoggedIn} href="/map">Look Around</Nav.Link>
                            <Nav.Link hidden={!this.state.isLoggedIn} href="/" onClick={this.logOut}>Logout</Nav.Link>
                        </Nav>
                    </Navbar>

            </div>
        )
    }

}
export default Toolbar