import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import styled from 'styled-components';


const HeaderEl =  styled.header`
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HeaderEl className="header">
                <a href="/">API SAMPLES</a>
            </HeaderEl>
        )
    }
}
export default Header;
