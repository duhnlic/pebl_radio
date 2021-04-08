import './App.css';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { useState, useEffect } from "react";
import Other from './Other'
import Home from './Home'
import UserSearchBar from './Components/UserSearchBar/UserSearchBar'
import logo from './shared/radio_logo.svg'
import RadioList from './Components/RadioList/RadioList'
import MediaControlCard from './Components/MediaPlayer/MediaPlayer'
import ReactAudioPlayer from 'react-audio-player';
// import axios from "axios";
// const axios = require("axios");

// Save the Component, key and path in an array of objects for each Route
// You could write all routes by hand but I'm lazy annd this lets me use
// the map method to just loop over them and make my routes
// SWITCH is used so that it only ever matches one route at a time
// If you don't want to use react router just rewrite the app component to not use it

const routes = [
  {
    Component: Other,
    key: 'Search',
    path: '/search'
  },
  {
    Component: Other,
    key: 'Another',
    path: '/another'
  },
  {
    Component: Home,
    key: 'Home',
    path: '/'
  }
]

export default function App () {
  const [searchString, setSearchString] = useState(' ');
  const [results, setResults] = useState([]);
  const [resultCountry, setResultCountry] = useState('ALL');
  const [resultGenre, setResultGenre] = useState('ALL');

  
  const apiKey = process.env.REACT_APP_STATION_KEY;
  const apiRoot = 'https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?country=';
  const keyword = '&keyword=';
  const genreRoot = '&genre=';
    
  
  console.log({apiKey});

  const getStations= async () => {

    try {
      const res = await fetch(`${apiRoot}${resultCountry}${keyword}${encodeURI(searchString)}${genreRoot}${resultGenre}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": `${apiKey}`,
          "x-rapidapi-host": "30-000-radio-stations-and-music-charts.p.rapidapi.com"
        }
      });
      const data = await res.json();
      setResults(data.results);
      setSearchString('');
      // for (let i = 0; i < 20; i++){
      //   console.log(JSON.stringify(data.results[i], null, 2))
      // }
    } catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{

    getStations();
  },[]);

  function handleChange(event) {
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getStations(searchString);
  }

  function handleCountryChange(event) {
    setResultCountry(event.target.value);
  }

  function handleGenreChange(event) {
    setResultGenre(event.target.value);
  }

  return (
    <Router>
      <nav>
        {routes.map(route => <Link key={route.key} to={route.path}>{route.key}</Link>)}
      </nav>
      <header>
        <div className="brand">
            <img src={logo} width="125" height="125" className="app-logo" alt="Stewdio Internet Radio App" />
            <h1 className="logo-app-name">Stewdio Radio</h1>
        </div>
        <UserSearchBar
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          handleCountryChange={handleCountryChange}
          handleGenreChange={handleGenreChange}
        />
      </header>
      {/* <MediaControlCard url='http://sc-hv.1.fm:7058'/> */}
      <ReactAudioPlayer className="media-player"
  src=""
  autoPlay
  controls
/>
      <Switch>
        {
          routes.map(({key, Component, path}) => (
            <Route
              key={key}
              path={path}
              component={props => <Component {...props} page={key} />}
              />))
        }
      </Switch>
      <RadioList results={results}/>
    </Router>
  )
}
