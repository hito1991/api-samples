import React, { Component } from 'react';
import styled from 'styled-components';
import {SectionContainer,PageTitle} from '../modules/common';
import {Row,Card,Form,Button} from 'react-bootstrap'
import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const CrrentWeatherBlock = styled.div`
    text-align: center;
    *{
        display: flex;
        justify-content:center;
    }
`



class Api3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "https://api.openweathermap.org/data/2.5/forecast/daily?lang=ja&units=metric",
            lat: 35.68944,
            lon: 139.69167,
            weather:{
                title: "",
                icon: "",
                temp: "",
                city: "",
            },
            week:[]

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount(){
        let url = this.state.url;
        url += '&lat='+this.state.lat;
        url += '&lon='+this.state.lon;
        url += '&APPID='+WEATHER_API_KEY;
        let result = await axios.get(url).catch((error)=>{
            alert("エラー")
        });
        if(result){
            let weather = Object.assign({},this.state.weather);
            console.log(result)
            weather.title = result.data.current.weather[0].description;
            weather.icon = result.data.current.weather[0].icon;
            weather.temp = result.data.current.temp;
            // weather.city = result.data.current.name;
            this.setState({weather:weather})
        }
    }
    //method
    async getList(){
    }
    handleChange(event){
    }
    handleSubmit(e) {
    }

    render() {
        return (
            <>


                <SectionContainer sectionName="api3-top">
                    <PageTitle>Open Weather Map</PageTitle>
                </SectionContainer>

                <SectionContainer sectionName="api3-content">
                    <CrrentWeatherBlock>
                        <h2>現在の{this.state.weather.city}の天気</h2>
                        <div className="weather-icon"><img src={`http://openweathermap.org/img/wn/${this.state.weather.icon}@2x.png`} alt="34567" /></div>
                        <div className="weather-title">{this.state.weather.title}</div>
                        <div className="weather-temp">{~~this.state.weather.temp}°</div>
                    </CrrentWeatherBlock>
                </SectionContainer>
            </>
        );
    }
}
export default Api3;
