import React, { Component } from 'react';
import styled from 'styled-components';
import {SectionContainer,PageTitle} from '../modules/common';
import {Row,Card,Form,Button} from 'react-bootstrap'
import axios from 'axios';
import { Header } from '../modules/common';


import Geocode from "react-geocode"
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
Geocode.setLanguage("ja");


const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const CrrentWeatherBlock = styled.div`
    text-align: center;
    *{
        display: flex;
        justify-content:center;
    }
`
const WeekListBlock =  styled.div`
    margin-top: 40px;
    text-align:center;
`
const RowLayout = styled.div`
    display: flex;
    border-right: 1px solid rgba(0,0,0,.125);
    .card{
        border-radius:0;
        border-right:0;
    }
    @media (min-width: 768px) {
        .card{
            width: 16.666666666%;
        }
    }
`



class Api3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "https://api.openweathermap.org/data/2.5/onecall?lang=ja&units=metric",
            lat: 35.68944,
            lon: 139.69167,
            address: "",
            weather:{
                title: "",
                icon: "",
                temp: "",
            },
            weeks: ["日", "月", "火", "水", "木", "金", "土"],
            week:[]

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.getAdress();
        this.getWeather();
    }
    //method
    async getAdress(){
        var result = await Geocode.fromLatLng(this.state.lat,this.state.lon).catch((error)=>{
            alert("エラー")
        });
        if(result&&result.results[0].plus_code.compound_code.split("、")[1]){
            this.setState({address:result.results[0].plus_code.compound_code.split("、")[1]})
        }
    }
    async getWeather(){
        let url = this.state.url;
        url += '&lat='+this.state.lat;
        url += '&lon='+this.state.lon;
        url += '&APPID='+WEATHER_API_KEY;
        let result = await axios.get(url).catch((error)=>{
            alert("エラー")
        });
        if(result){
            let weather = Object.assign({},this.state.weather);
            weather.title = result.data.current.weather[0].description;
            weather.icon = result.data.current.weather[0].icon;
            weather.temp = result.data.current.temp;
            this.setState({weather:weather})
            this.setState({week:result.data.daily.filter((e,i)=>i>0)})
            console.log(this.state.week)

        }
    }
    dateArrange(dt){
        var d = new Date(dt * 1000);
        var date = d.getDate();
        var day = d.getDay();

        return `${date}日\n（${this.state.weeks[day]}）`

    }
    handleChange(event){
    }
    handleSubmit(e) {
    }

    render() {
        return (
            <>
                <Header></Header>
                <SectionContainer sectionName="api3-top">
                    <PageTitle>Open Weather Map</PageTitle>
                </SectionContainer>

                <SectionContainer sectionName="api3-content">
                    <CrrentWeatherBlock>
                        <h2>現在の{this.state.address}の天気</h2>
                        <div className="weather-icon"><img src={`http://openweathermap.org/img/wn/${this.state.weather.icon}@2x.png`} alt="34567" /></div>
                        <div className="weather-title">{this.state.weather.title}</div>
                        <div className="weather-temp">{~~this.state.weather.temp}°</div>
                    </CrrentWeatherBlock>

                    <WeekListBlock>
                        <h2>{this.state.address}の週間天気</h2>
                        <RowLayout>

                            {this.state.week.map((data,i) => {
                                return (
                                <Card key={i}>
                                    <Card.Img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description}  />
                                    <Card.Body>
                                        <Card.Text><small>{data.weather[0].description}</small></Card.Text>
                                        <Card.Text><small>{this.dateArrange(data.dt)}</small></Card.Text>
                                        <Card.Text>
                                            <small style={{color:'red'}}>{~~data.temp.max}</small>
                                            <small> / </small>
                                            <small style={{color:'blue'}}>{~~data.temp.min}</small>
                                            </Card.Text>
                                    </Card.Body>
                                </Card>
                                );
                            })}
                        </RowLayout>

                    </WeekListBlock>


                </SectionContainer>
            </>
        );
    }
}
export default Api3;
