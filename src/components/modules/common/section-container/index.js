import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
class SectionContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <section className={'section' +( this.props.sectionName ? ' section-'+this.props.sectionName : '')}>
                <Container fluid="md">
                    {this.props.children}
                </Container>
            </section>
        )
    }
}
export default SectionContainer;
