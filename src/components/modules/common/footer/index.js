import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer className="footer">
                <Container fluid="md">
                    footer
                </Container>
            </footer>
        )
    }
}
export default Footer;
