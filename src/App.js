import './App.css';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useState, useRef } from "react";
import Other from './Other'
import Home from './Home'
import UserSearchBar from './Components/UserSearchBar/UserSearchBar'
import logo from './shared/App_Icon.svg'
import RadioList from './Components/RadioList/RadioList'
import MediaControlCard from './Components/MediaPlayer/MediaPlayer'
import ReactAudioPlayer from 'react-audio-player';
import DonationLink from './Components/DonationLink/DonationLink';


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
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState([]);
  const [resultCountry, setResultCountry] = useState('');
  const [resultTag, setResultTag] = useState('');
  const [currentMedia, setCurrentMedia] = useState('');
  const [currentStation, setCurrentStation] = useState('');
  const [currentCountry, setCurrentCountry] = useState('');
  const [currentGenre, setCurrentGenre] = useState('');
  const [playPause, setPlayPause] = useState(true);
  const audioElement = useRef(null);

  const apiKey = process.env.REACT_APP_STATION_KEY;
  const apiRoot = 'https://radio-browser.p.rapidapi.com/json/stations/byname/';
  const apiExtend = 'reverse=false&offset=0&limit=10000&hidebroken=true';

  const getStations= async () => {
    console.log(`${apiRoot}${encodeURI(searchString)}?${resultCountry}${resultTag}${apiExtend}`)
    try {
      const res = await fetch(`${apiRoot}${encodeURI(searchString)}?${resultCountry}${resultTag}${apiExtend}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": `${apiKey}`,
          "x-rapidapi-host": "radio-browser.p.rapidapi.com"
        }
      });
      const data = await res.json();
      setResults(data);
      setSearchString('');
      // console.log(data)
      // for (let i = 0; i < 20; i++){
        // console.log(JSON.stringify(data.results[i], null, 2))
      // }
    } catch(err){
      console.log(err);
    }
  }


  function handleChange(event) {
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getStations(searchString);
  }

  function handleCountryChange(event) {
    // console.log(event.target.value);
    setResultCountry(event.target.value);
  }

  function handleGenreChange(event) {
    setResultTag(event.target.value);
  }

  function setTrue(){
    setPlayPause(true)
  }


  function handlePlay(event){
    if (playPause === true){
    audioElement.current.audioEl.current.pause()
    setPlayPause(false);
    console.log("This works!")
    } else if (playPause === false){
      audioElement.current.audioEl.current.play()
      console.log("This works!")
      setPlayPause(true);
    }
  }


  return (
    <Router>
      <nav>
        {/* {routes.map(route => <Link key={route.key} to={route.path}>{route.key}</Link>)} */}
          <MediaControlCard
            handlePlay={handlePlay}
            currentStation={currentStation}
            currentCountry={currentCountry}
            currentGenre={currentGenre}
          />
          <ReactAudioPlayer className="media-player"
            src= {currentMedia}
            autoPlay
            ref={audioElement}
            // controls
          />
      </nav>
      <header>
        <div className="brand">
            <img src={logo} width="200" height="200" className="App-logo" alt="Pebl Internet Radio App" />
            <h1 className="logo-app-name">Pebl Radio</h1>
        </div>
        <UserSearchBar
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          handleCountryChange={handleCountryChange}
          handleGenreChange={handleGenreChange}
        />
        <p className="disclaimer">DISCLAIMER: Pebl Radio is not responsible for broken links from station providers.</p>
      </header>
      {/* <Switch>
        {
          routes.map(({key, Component, path}) => (
            <Route
              key={key}
              path={path}
              component={props => <Component {...props} page={key} />}
              />))
        }
      </Switch> */}
      <RadioList 
      setCurrentMedia={setCurrentMedia}
      setCurrentStation={setCurrentStation}
      setCurrentCountry={setCurrentCountry}
      setCurrentGenre={setCurrentGenre}
      results={results}
      setPlayPause={setPlayPause}
      setTrue={setTrue}/>
      <footer>
        <p className="credits">Created by Brian Stewart</p>
        <DonationLink/>
      </footer>
    </Router>
  )
}
