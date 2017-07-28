

import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";

import './App.css';


const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" }
];

class WeatherDisplay extends Component {
    constructor(){
        super();
        this.state = {
            weatherData: null
            
            
        };
    }
    
  componentDidMount() {
    const zip = this.props.zip;
     const name = this.props.name;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
           

    
    render() {
       const weatherData = this.state.weatherData;
      
          
    
        for (var key in weatherData) {
            console.log(key, ': ', weatherData[key]);
            for (var i in weatherData[key]){
                console.log('typeof', typeof(weatherData[key][i]), 'weatherData[', key, '][', i, ']', weatherData[key][i]);
            }
        };

     
    if (!weatherData) return <div>Loading</div>;
    return <div>
            <h4> {weatherData['weather'][0]['main']} in {this.props.name} <img src={'http://openweathermap.org/img/w/'+weatherData['weather'][0]['icon']+'.png' } /></h4>
            <div> Temperature {weatherData['main']['temp']} </div>
            <div> Wind speed {weatherData['wind']['speed']} </div>
            <div> Humidity {weatherData['main']['humidity']} </div>
           <div> Humidity {weatherData['weather'][0]['icon'] }</div>
          
           
        </div>;
    }
}


class App extends Component {
    
    constructor() {
        super();
        this.state = {
            activePlace: 0,
        };
    }
    
  render() {
      const activePlace = this.state.activePlace;
      
    return (
      <div className="App">
        <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                React Simple Weather App
              </Navbar.Brand>
            </Navbar.Header>
       </Navbar>
     <Grid>
        <Row>
            <Col md={4} sm={4} >
                <h4> Select your city </h4>
                <Nav 
                    bsStyle="pills"
                    stacked
                    activeKey={activePlace}
                    onSelect={index =>  this.setState({ activePlace: index })} >
                 {PLACES.map((place, index) => (
          <NavItem
            key={index}
            eventKey={index}>
              {place.name}
          </NavItem>
        ))}
                </Nav>
            </Col>
                
                 <Col md={8} sm={8}>
                     <WeatherDisplay
                     key={activePlace}
                     zip={PLACES[activePlace].zip}
                     name={PLACES[activePlace].name}

                    />
                     </Col>
        </Row>
     </Grid>    
       
       
      </div>
    );
  }
}

export default App;
