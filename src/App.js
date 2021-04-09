import './App.css';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import Other from './Other'
import Home from './Home'
import UserSearchBar from './Components/UserSearchBar/UserSearchBar'
import logo from './shared/App_Icon.svg'
import RadioList from './Components/RadioList/RadioList'
import MediaControlCard from './Components/MediaPlayer/MediaPlayer'
import ReactAudioPlayer from 'react-audio-player';


import Grid from '@material-ui/core/Grid';

import pink from "@material-ui/core/colors/pink";
import deepPurple from "@material-ui/core/colors/deepPurple";

import createTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { AudioPlayer } from 'mui-audio-player';




// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';


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
  const [resultCountry, setResultCountry] = useState('ALL');
  const [resultGenre, setResultGenre] = useState('ALL');
  const [currentMedia, setCurrentMedia] = useState('');
  // const [currentStation, setCurrentStation] = useState('');
  const [playPause, setPlayPause] = useState(false);
  
  
  const apiKey = process.env.REACT_APP_STATION_KEY;
  const apiRoot = 'https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi?country=';
  const keyword = '&keyword=';
  const genreRoot = '&genre=';
    
  
  // console.log({apiKey});

  const getStations= async () => {
    console.log(`${apiRoot}${resultCountry}${keyword}${encodeURI(searchString)}${genreRoot}${resultGenre}`)
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
      // console.log(data)
      // for (let i = 0; i < 20; i++){
        // console.log(JSON.stringify(data.results[i], null, 2))
      // }
    } catch(err){
      console.log(err);
    }
  }








  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: 'flex',
  //     backgroundColor: '#2f4858',
  //     color: '#a6bac9'
  //   },
  //   details: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //   },
  //   content: {
  //     flex: '1 0 auto',
  //     color: '#a6bac9'
  //   },
  //   cover: {
  //     width: 151,
  //   },
  //   controls: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     paddingLeft: theme.spacing(1),
  //     paddingBottom: theme.spacing(1),
  //   },
  //   playIcon: {
  //     height: 52,
  //     width: 150,
  //     color: '#a6bac9'
  //   },
  // }));
  
  // function MediaControlCard() {
  //   const classes = useStyles();
  //   const theme = useTheme();
    // 
      // 
  //     return (
      
  //             <Card className={classes.root}>
  //             <div className={classes.details}>
  //                 <CardContent className={classes.content}>
  //                 <Typography component="h5" variant="h5" className={classes.content}>
  //                     Station: {currentStation}
  //                 </Typography>
  //                 <Typography variant="subtitle1" className={classes.content}>
  //                     Country:
  //                 </Typography>
  //                 <Typography variant="subtitle2" className={classes.content}>
  //                     Genre:
  //                 </Typography>
  //                 </CardContent>
  //                 <div className={classes.controls}>
  //                 <IconButton aria-label="play/pause">
  //                     <PlayArrowIcon className={classes.playIcon}
                        
  //                     />
  //                 </IconButton>
  //                 </div>
  //             </div>
  //             <CardMedia
  //                 className={classes.cover}
  //                 image="/static/images/cards/live-from-space.jpg"
  //                 title="Live from space album cover"
  //             />
  //             </Card>
          
  //     );
  // }




  // function handlePlayChange(event){
  //   setPlayPause(event.target.value);
  // }


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

  // const RadioPlayer = ReactMediaPlayer
    const mutedState = true;

  function handlePlay(event){
    setPlayPause(!playPause)
    console.log("This works!")
    // ReactAudioPlayer.pause()
    // console.log(ReactMediaPlayer)

  }

//   const theme = createTheme({
//     palette: {
//         type: 'light',
//         primary: deepPurple,
//         secondary: pink
//     }
// });

  return (
    <Router>
      <nav>
        {/* {routes.map(route => <Link key={route.key} to={route.path}>{route.key}</Link>)} */}
          <ReactAudioPlayer className="media-player"
            src= {currentMedia}
            autoPlay
            mute={mutedState}
            controls
          />
          {/* <ThemeProvider theme={theme}>
              <Grid justify="center" alignContent="center"alignItems="center" container style={{ height: "10rem",backgroundColor: deepPurple["500"] }}>
                  <Grid md={4} item />
                  <Grid md={4} item>
                      <AudioPlayer 
                          theme={theme}
                          src="http://5.39.71.159:8994/;"
                          src={currentMedia}
                          autoPlay={true}
                          rounded={true}
                          elevation={1}
                          width="400px"
                      />
                  </Grid>
                  <Grid md={4} item />
              </Grid>
          </ThemeProvider> */}



          <MediaControlCard
            handlePlay={handlePlay}
            // currentStation={currentStation}
          />
      </nav>
      <header>
        <div className="brand">
            <img src={logo} width="200" height="200" className="App-logo" alt="Stewdio Internet Radio App" />
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
      // setCurrentStation={setCurrentStation}
      results={results}/>
    </Router>
  )
}
