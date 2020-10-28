import React, { Component } from 'react';
class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button className={'btn' + (this.props.type?' btn-'+this.props.type : '')}>
                {this.props.children}
            </button>
        )
    }
}
export default Button;
