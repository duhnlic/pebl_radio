import './App.css';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import Other from './Other'
import Home from './Home'
import UserSearchBar from './Components/UserSearchBar/UserSearchBar'
import logo from './shared/radio_logo.svg'
import RadioList from './Components/RadioList/RadioList'

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

  const apiStructure = {
    apiKey: process.env.REACT_APP_STATION_KEY,
    apiRoot: 'https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?country=ALL&keyword=',
    
  };

  function getStations(searchString){
    fetch(`${apiStructure.apiRoot}${encodeURI(searchString)}&genre=ALL`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": `bc056006f2msh3b35a2de07ea1b5p1bdf3djsnf66e3c9e1dca`,
        "x-rapidapi-host": "30-000-radio-stations-and-music-charts.p.rapidapi.com"
      }
    })
    .then(response => {
      setResults(response);
    })
    .catch(err => {
      console.error(err);
    });
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
        />
      </header>
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
