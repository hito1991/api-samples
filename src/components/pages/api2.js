import React, { Component } from 'react';
import styled from 'styled-components';
import {SectionContainer,PageTitle} from '../modules/common';
import {Row,Card,Form,Button} from 'react-bootstrap'
import axios from 'axios';
import YouTube from 'react-youtube';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const VideoHolder = styled.div`
    position: relative;
    margin-top: 40px;
`
const RowLayout = styled.div`
    .card{
        margin-top: 20px;
    }
    .card-title,.card-text{
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
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

class Api2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topVideo: {
                id:"",
            },
            videos: [],
            keyword: "React",
            youtubeURL: "https://www.youtube.com/watch?v="
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount(){
        this.getList();
    }
    //method
    async getList(){
        let url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${this.state.keyword}&order=rating&maxResults=10&key=${YOUTUBE_API_KEY}`;
        let result = await axios.get(url).catch((error)=>{
        });
        if(result){
            let videoObj = Object.assign({}, this.state.topVideo);
            videoObj.id = result.data.items[0].id.videoId;
            this.setState({videos:result.data.items.filter((e,i)=>i>=1)})
            this.setState({topVideo:videoObj})
        }
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.getList();
    }

    render() {
        return (
            <>


                <SectionContainer sectionName="api2-top">
                    <PageTitle>YouTube</PageTitle>
                </SectionContainer>

                <SectionContainer sectionName="api2-content">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>検索ワード</Form.Label>
                            <Form.Control type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} placeholder="キーワードを入力してください。" />
                        </Form.Group> 
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </SectionContainer>


                <SectionContainer sectionName="api2-content-list">
                    {
                        (()=>{
                            if(this.state.topVideo.id){
                                const opts = {width:"100%"}
                                return (
                                    <VideoHolder>
                                        <YouTube videoId={this.state.topVideo.id} opts={opts}></YouTube>
                                    </VideoHolder>
                                );
                            }
                        })()
                    }
                    <RowLayout>
                        {this.state.videos.map((data,i) => {
                            return (
                            <Card key={i}>
                                <Card.Img variant="top" src={data.snippet.thumbnails.medium.url}  alt={data.snippet.title} />
                                <Card.Body>
                                    <Card.Title>{data.snippet.title}</Card.Title>
                                    <Card.Text>
                                        {data.snippet.description}
                                    </Card.Text>
                                    <Button className="btn-block" href={this.state.youtubeURL+data.id.videoId} variant="primary">詳細</Button>
                                </Card.Body>
                            </Card>
                            );
                        })}
                    </RowLayout>
                </SectionContainer>
            </>
        );
    }
}
export default Api2;
