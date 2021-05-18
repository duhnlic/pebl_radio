// import './App.css';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import UserSearchBar from './Components/UserSearchBar/UserSearchBar';
import logo from './shared/App_Icon.svg';
import RadioList from './Components/RadioList/RadioList';
import MediaControlCard from './Components/MediaPlayer/MediaPlayer';
import ReactAudioPlayer from 'react-audio-player';
import DonationLink from './Components/DonationLink/DonationLink';
import { Canvas } from '@react-three/fiber';
import World from './Components/3Dworld/3Dworld';
import Profile from './Components/Profile/Profile';
import Home from './Components/Home/Home';
import CuratedStations from './Components/CuratedStations/CuratedStations'


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
  const [currentId, setCurrentId] =  useState('');
  const audioElement = useRef(null);




    /* Authentication */
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loginForm, setLoginForm] = useState({
      username: "",
      password: ""
    });
    const handleLogin = async (e) => {
      try {
        const response = await fetch("https://worldwide-radio-database.herokuapp.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...loginForm })
        });
        console.log(e);
        console.log(JSON.stringify({ ...loginForm }))
        const data = await response.json();
        if (data.token) {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("username", data.username);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const handleLogout = () => {
      window.localStorage.clear();
      setLoggedIn(false);
    };
  
    const handleLoginChange = (e) => {
      setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
    };

    // useEffect(() => {
    //   handleLogin();
    // },[])

  
    /* END AUTHENTICATION */


    //get user data for profile page
    const [userProfile, setUserProfile] = useState([])
    const getProfileData = async () => {
      try{
        const result = await fetch(
          `https://worldwide-radio-database.herokuapp.com/${window.localStorage.getItem(
            "username"
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        );
        const data = await result.json();
        console.log()
        setUserProfile([...data.stations]);
      } catch(err) {
        console.log(err);
      }
    }
  
    // useEffect(() => {
    //   getProfileData();
    // }, []);


    //get radio stations
    const [stations, setStations] = useState([])
    const getStationData = async () => {
      try{
        const result = await fetch(
          `https://worldwide-radio-database.herokuapp.com/stations`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const data = await result.json();
        console.log()
        setStations([...data.stations]);
      } catch(err) {
        console.log(err);
      }
    }
  
    // useEffect(() => {
    //   getStationData();
    // }, []);




    //get third party api data
  const apiKey = process.env.REACT_APP_STATION_KEY;
  const apiRoot = 'https://radio-browser.p.rapidapi.com/json/stations/byname/';
  const apiExtend = 'reverse=false&offset=0&limit=10000&hidebroken=true';

  const getStations= async () => {
    // console.log(`${apiRoot}${encodeURI(searchString)}?${resultCountry}${resultTag}${apiExtend}`)
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





  // Create
  const [stationData, setStationData] = useState({

  });

  const createFavorite = async (e) => {
  console.log("This link was successful!")
  e.preventDefault();
  const body = { ...stationData };
  try {
  const addStation = await fetch(
    `https://worldwide-radio-database.herokuapp.com/addStation/${currentId}/${window.localStorage.getItem(
      "username"
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`

      },
      body: JSON.stringify({
        ...body,
        username: window.localStorage.getItem("username")
      })
    }
  );
  const data = await addStation.json();
  // setStationData({

  // });
  } catch (err) {
  console.error(err);
  } finally {
  await getStationData();
  }
  };
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  //   if (e.target.id === "tags"){
  //     setFormData({...formData, "tags": e.target.value.split(" ")})
  //   }
  // };

  function handleChange(event) {
    setSearchString(event.target.value);
  }


  function handleFavoriteAdd(event) {
    createFavorite()
  }

// HANDLE SUBMIT FOR THIRD PARTY API
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

  function handleStationId(){

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

  // useEffect(()=>{},[])

  return (
    <Router>
      <nav>
          <MediaControlCard
            handlePlay={handlePlay}
            currentStation={currentStation}
            currentCountry={currentCountry}
            currentGenre={currentGenre}
            results={results}
            currentId={currentId}
            handleFavoriteAdd={handleFavoriteAdd}
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
        {/* <UserSearchBar
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          handleCountryChange={handleCountryChange}
          handleGenreChange={handleGenreChange}
        /> 
        <p className="disclaimer">DISCLAIMER: Pebl Radio is not responsible for broken links from station providers.</p> */}
      </header>
      <World/>
      <Switch>
        <Route exact path={"/"}> 
          <Home
          setCurrentMedia={setCurrentMedia} 
          setCurrentStation={setCurrentStation}
          setCurrentCountry={setCurrentCountry}
          setCurrentGenre={setCurrentGenre}
          setCurrentId={setCurrentId}
          results={results}
          stations={stations}
          setPlayPause={setPlayPause}
          setTrue={setTrue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          handleCountryChange={handleCountryChange}
          handleGenreChange={handleGenreChange}        
          />
        </Route>
        <Route exact path={"/profile"}>
          <Profile
            stations={stations}
            isLoggedIn={isLoggedIn}
            handleLoginChange={handleLoginChange}
            handleLogin={handleLogin}
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            handleLogout={handleLogout}
          />
        </Route>
        <Route exact path={"/pebl-curated"}>
          <CuratedStations/>
        </Route>  
      </Switch>
      {/* <RadioList 
      setCurrentMedia={setCurrentMedia}
      setCurrentStation={setCurrentStation}
      setCurrentCountry={setCurrentCountry}
      setCurrentGenre={setCurrentGenre}
      setCurrentId={setCurrentId}
      results={results}
      stations={stations}
      setPlayPause={setPlayPause}
      setTrue={setTrue}
      /> */}
      <footer>
        <p className="credits">Created by Brian Stewart</p>
        <DonationLink/>
      </footer>
    </Router>
  );
}

