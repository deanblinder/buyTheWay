import React, {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../Toolbar/Toolbar'


class Layout extends Component {
    render() {
        return (
            <Auxiliary>
                <Toolbar/>
                <main >
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout;