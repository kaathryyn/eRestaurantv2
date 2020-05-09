import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert'

class formError extends Component {
    render() {
        const {theMessage} = this.props;

        return(
            <Alert variant = "danger">{theMessage}</Alert>
        );
    }
}

export default formError;