import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Routers from '../router';
import 'bootstrap/dist/css/bootstrap.min.css';
import mixin from '../assets/css/common.scss';


import {
  Footer
} from './modules/common';

/* eslint-disable import/first */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages:Routers
    };
  }
  
  render(){
    return (
      <BrowserRouter>

        <Switch>
        {Routers.map(route => {
          return (
            <Route 
            key={route.id}
            exact
            path={route.path}
            render={props=>{ 
              if(route.id==0) return ( <route.component {...props} {...this.state} /> ) 
              else return ( <route.component /> ) 
            }}
            />
          );
        })}
        </Switch>
        <Footer></Footer>

      </BrowserRouter>
    );
  }
}

export default App;
