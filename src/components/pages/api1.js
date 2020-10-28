import React, { Component } from 'react';
import styled from 'styled-components';
import {SectionContainer,PageTitle} from '../modules/common';
import {Form,Button} from 'react-bootstrap'


import { GoogleMap, useLoadScript,LoadScript } from "@react-google-maps/api";
import Geocode from "react-geocode"
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
// set response language. Defaults to english.
Geocode.setLanguage("ja");


const MapBlock = styled.div`
    margin-top:40px;
    .map-holder{
        position: relative;
        width: 100%;
        height: 500px;
    }
`

class Api1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prefecturesList:['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
            
            prefectures: "選択してください",
            address: "",

            map:null,

            latlng:"",
            mapConfig: {
              center: {
                lat: 0,
                lng: 0
              },
              zoom: 17
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //method
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    async handleSubmit(e) {
        e.preventDefault();
        var result = await Geocode.fromAddress(this.state.prefectures+this.state.address).catch((error)=>{
            //エラー処理
        });
        if(result){
            let mapConfig = Object.assign({}, this.state.mapConfig);
            mapConfig.center.lat = result.results[0].geometry.location.lat;
            mapConfig.center.lng = result.results[0].geometry.location.lng;
            this.setState({mapConfig:mapConfig})
            this.setState({latlng:result.results[0].geometry.location})

            if(this.state.map){
                this.state.map.panTo(new window.google.maps.LatLng(mapConfig.center.lat,mapConfig.center.lng));
            }
        }

    }

    render() {
        return (
            <React.Fragment>

                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY} />

                <SectionContainer sectionName="api1-top">
                    <PageTitle>Google Map</PageTitle>
                </SectionContainer>

                <SectionContainer sectionName="api1-content">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>都道府県</Form.Label>
                        <Form.Control name="prefectures" value={this.state.prefectures} onChange={this.handleChange} as="select" >
                            
                            {this.state.prefecturesList.map((data,i) => {
                                return (
                                    <option value={data} key={i}>{data}</option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group> 
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>市区町村・番地</Form.Label>
                        <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange} placeholder="住所を入力してください。" />
                    </Form.Group> 
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>

                {
                    (() =>{
                        if(this.state.latlng){
                            return (
                                <MapBlock>
                                    <GoogleMap mapContainerClassName="map-holder"
                                        center={this.state.mapConfig.center}
                                        zoom={this.state.mapConfig.zoom}
                                        onLoad={map => {
                                            this.setState({map:map})
                                        }}
                                        onUnmount={map => {
                                            
                        
                                        }}
                                    >
                                    </GoogleMap>
                                </MapBlock>
                            );
                        }
                    })()
                }

                </SectionContainer>
            </React.Fragment>
        );
    }
}
export default Api1;
