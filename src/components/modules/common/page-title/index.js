import React, { Component } from 'react';
class PageTitle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="page-title-block">
                <h1 className="page-title">{this.props.children}</h1>
            </div>
        )
    }
}
export default PageTitle;
