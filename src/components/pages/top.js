import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components';

import {
    Row,Card,Button
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {
    SectionContainer
} from '../modules/common';
const bgGradation = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:-100% 50%}
    100%{background-position:-200% 50%}
`
const KV = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
    .site-kv-bg{
        z-index: 0;
        position: absolute;
        left: 0; top: 0;
        width: 100%; height: 100%;
        background-size: 200% 200%;
        background-image: linear-gradient(90deg, #b8eefc 0%,#bc87e5 50%,#b8eefc 100%);
        animation: ${bgGradation} 10s linear infinite;
    }
    .site-title{
        z-index: 1;
        position: relative;
    }

`

const RowLayout = styled.div`
    .card{
        margin-top: 20px;
    }
    @media (min-width: 768px) {
        display: flex;
        flex-wrap: wrap;
        margin-left: -10px;
        margin-right: -10px;
        .card{
            margin-left: 10px;
            margin-right: 10px;
            width: calc(33.333333% - 20px)
        }
    }
`

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rootData: props,
        };
    }
    
    render() {
        return (
            <React.Fragment>
                <KV className="site-kv">
                    <div className="site-kv-bg"></div>
                    <h1 className="site-title">API SAMPLES</h1>
                </KV>

                <SectionContainer sectionName="top-list">
                    <RowLayout>
                        {this.state.rootData.pages.map((data,i) => {
                            if(!data.pageList) return false;
                            return (
                            <Card key={i}>
                                <Card.Body>
                                    <Card.Title>{data.title}</Card.Title>
                                    <LinkContainer to={data.path}>
                                        <Button variant="primary">Go page</Button>
                                    </LinkContainer>
                                </Card.Body>
                            </Card>
                            );
                        })}
                    </RowLayout>
                </SectionContainer>
            </React.Fragment>
        );
    }
}
export default Home;
