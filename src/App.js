import './App.css';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import logo from './peblradio.svg';
import MediaControlCard from './Components/MediaPlayer/MediaPlayer';
import ReactAudioPlayer from 'react-audio-player';
import DonationLink from './Components/DonationLink/DonationLink';
import World from './Components/3Dworld/3Dworld';
import Profile from './Components/Profile/Profile';
import Home from './Components/Home/Home';
import CuratedStations from './Components/CuratedStations/CuratedStations'
import Register from './Components/Registration/Registration'


export default function App () {
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState([]);
  const [resultCountry, setResultCountry] = useState('');
  const [resultTag, setResultTag] = useState('');
  const [currentMedia, setCurrentMedia] = useState('');
  const [currentStation, setCurrentStation] = useState('');
  const [currentCountry, setCurrentCountry] = useState('');
  const [currentGenre, setCurrentGenre] = useState('');
  const [currentFavicon, setCurrentFavicon] = useState('');
  const [playPause, setPlayPause] = useState(true);
  const [initPause, setInitPause] = useState(false);
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
      window.location.reload();
    };
  
    const handleLoginChange = (e) => {
      setLoginForm({ ...loginForm, [e.target.id]: e.target.value });
    };

    useEffect(() => {
      if (window.localStorage.getItem("token")){
        setLoggedIn(true);
      }
    },[])
    /* END AUTHENTICATION */



    //USER REGISTER

    const [registerForm, setRegisterForm] = useState({
      username: "",
      password: ""
  })

  const handleRegister = async (e) => {
    const body = { ...registerForm };
      try {
        const response = await fetch('https://worldwide-radio-database.herokuapp.com/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify(body, {token: window.localStorage.getItem("token")})
        });
      } catch (error) {
        console.log(error);
      } finally {
      setRegisterForm({
        username: "",
        password: ""
      })

    }
  }

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm, [e.target.id]: e.target.value
    })
  }
  
  // useEffect(()=>{
  //   handleRegister();
  // },[])
  
  
  //get user data for profile page
  const [userProfile, setUserProfile] = useState({})
  const getProfileData = async () => {
    try{
      const result = await fetch(
        `https://worldwide-radio-database.herokuapp.com/user/${window.localStorage.getItem(
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
          console.log(data)
          setUserProfile({...data});
        } catch(err) {
          console.log(err);
        }
      }
      
  
    // useEffect(() => {
    //   getProfileData();
    // }, [isLoggedIn]);


    //get radio stations
    const [stations, setStations] = useState([]);
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
        setStations([...data]);
      } catch(err) {
        console.log(err);
      }   
    }
  
    useEffect(() => {
      getStationData();

    }, []);





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
      console.log(results)
  }





  // Create
  const [stationData, setStationData] = useState({});

  const createFavorite = async () => {
  console.log("This link was successful!")
  const body = { ...stationData };
  try {
  const addStation = await fetch(
    `https://worldwide-radio-database.herokuapp.com/user/addStation/${currentId}/${window.localStorage.getItem(
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


  //DELETE FAVORITE FROM USER
  const [removeById, setRemoveById] = useState('')
  const [confirmation, setConfirmation] = useState(false)
  const removeFavorite = async () => {
    console.log("This link was successful!")
    console.log(`The Data received on the App.js is: ${removeById}`)
    try {
      const res = await fetch(
      `https://worldwide-radio-database.herokuapp.com/user/${window.localStorage.getItem("username")}/${removeById}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }});
    const data = await res.json();
    console.log(res)
    console.log(data)
    } catch (err) {
    console.error(err);
    } finally {
    await getProfileData();
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

  function handleFavoriteAdd() {
    createFavorite()
  }

  function handleRemoveFavorite() {
    removeFavorite();
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

  function setFalse() {
    setInitPause(false)
  }

  function setConfirmTrue() {
    setConfirmation(true)
  }

  function setConfirmFalse() {
    setConfirmation(false)
  }

  function handlePlay(event){
    if (playPause === true){
    audioElement.current.audioEl.current.pause()
    setPlayPause(false);
    setInitPause(true);
    console.log("This works!")
    } else if (playPause === false){
      audioElement.current.audioEl.current.play()
      console.log("This works!")
      setPlayPause(true);
      setInitPause(false)
    }
  }

  // function handlePause(){
  //   if (initPause === false){

  //   }
  // }


  return (
    <Router>
      <div className="container">
        <World/>
        </div>
      <div className="App">
      <nav>
          <MediaControlCard
            handlePlay={handlePlay}
            currentStation={currentStation}
            currentCountry={currentCountry}
            currentGenre={currentGenre}
            results={results}
            currentFavicon={currentFavicon}
            currentId={currentId}
            handleFavoriteAdd={handleFavoriteAdd}
            initPause={initPause}
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
            <img src={logo} className="logo-app-name" alt="Pebl Internet Radio App" />
            {/* <h1 className="logo-app-name">Pebl Radio</h1> */}
            <h4 className="slogan">The radio app as small as a pebble</h4>
        </div>
      </header>
      <Switch>
        {/* <Route exact path={"/"}> 
          <Home
          setCurrentMedia={setCurrentMedia} 
          setCurrentStation={setCurrentStation}
          setCurrentCountry={setCurrentCountry}
          setCurrentGenre={setCurrentGenre}
          setCurrentFavicon={setCurrentFavicon}
          setCurrentId={setCurrentId}
          results={results}
          setPlayPause={setPlayPause}
          setTrue={setTrue}
          setFalse={setFalse}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchString={searchString}
          handleCountryChange={handleCountryChange}
          handleGenreChange={handleGenreChange}        
          />
        </Route> */}
        <Route exact path={"/profile"}>
          <Profile
            getProfileData={getProfileData}
            userProfile={userProfile}
            isLoggedIn={isLoggedIn}
            handleLoginChange={handleLoginChange}
            handleLogin={handleLogin}
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            handleLogout={handleLogout}
            handleRemoveFavorite={handleRemoveFavorite}
            setRemoveById={setRemoveById}
            confirmation={confirmation}
            setConfirmTrue={setConfirmTrue}
            setConfirmFalse={setConfirmFalse}
            removeById={removeById}
            setCurrentMedia={setCurrentMedia} 
            setCurrentStation={setCurrentStation}
            setCurrentCountry={setCurrentCountry}
            setCurrentGenre={setCurrentGenre}
            setTrue={setTrue}
          />
        </Route>
        <Route exact path={"/"}>
          <CuratedStations
            stations={stations}
            setCurrentMedia={setCurrentMedia} 
            setCurrentStation={setCurrentStation}
            setCurrentCountry={setCurrentCountry}
            setCurrentGenre={setCurrentGenre}
            setCurrentId={setCurrentId}
            setPlayPause={setPlayPause}
            setTrue={setTrue}
          />
        </Route>
        <Route exact path={"/register"}>
          <Register
          handleRegister={handleRegister}
          handleRegisterChange={handleRegisterChange} 
          registerForm={registerForm}
          />
        </Route>  
      </Switch>
      <footer>
        <p className="credits">Created by Brian Stewart</p>
        <DonationLink/>
      </footer>
      </div>
    </Router>
  );
}

