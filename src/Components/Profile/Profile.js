import play from '../../shared/play_push_icon.svg'
import radio from '../../shared/radio_icon2.svg'
import NavBar from '../NavBar/NavBar'
import  {NavLink} from 'react-router-dom';
import {useEffect} from 'react';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { DeleteOutlined } from "@ant-design/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppsIcon from '@material-ui/icons/Apps';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';



const Profile  =({userProfile, isLoggedIn, handleLogin, loginForm, setLoginForm, handleLoginChange, handleLogout, setCurrentMedia, setCurrentStation, setCurrentCountry, setCurrentGenre, setTrue, getProfileData, handleRemoveFavorite, setRemoveById, removeById})=>{

    const addFavoriteIcon = <PlaylistAddIcon/>
    const appsIcon = <AppsIcon/>
    const playArrow = <PlayArrowIcon/>

    useEffect(() => {
      getProfileData();
    }, [isLoggedIn]);

    useEffect(()=>{
      handleRemoveFavorite()
      console.log(`The setRemoveById is set to: ${removeById} on Profiles`)
    },[removeById])

  if(userProfile.username){
  return (
    <div>
        <div className="profile-page">
            <NavBar/>
            <center>
            <h1>Profile Header Placeholder</h1>
            <button onClick={handleLogout} className="logout-button">Log Out Here</button> 
            </center>
            <AccountCircleIcon/>
         <div className="badge">
            {/* chosen icon
            username */}

        </div>
        </div>
        {!userProfile.stations.length ? 
        <>
        <center>
          <h1>Welcome to your Pebl Profile, {userProfile.username}!</h1> 
          <p>Head on over to{appsIcon}<NavLink to="pebl-curated" className="navlink">Curated Stations</NavLink>Click on a station to {playArrow}play it and if you like it, click the {addFavoriteIcon} button in the player to add it to your Favorites List!</p>
          <h2>Favorites List:</h2>
        </center>
        </>:
        <div className="favorites">
        {userProfile.stations.map((stationObject, x) =>{
                if (x < 2000){
                return(
                <center>
                <div key={stationObject.i} className="station">
                    <div className="remove-button">
                    <button
                     className="remove-btn"
                     type="primary"
                     shape="circle"
                     onClick={()=>{
                      console.log(`The base assignment of station id is: ${stationObject._id} on Profiles`)
                        setRemoveById(stationObject._id)
                      // setRemoveById(stationObject._id)

                      

                     }}

                     >
                     <DeleteOutlined />

                    </button>
                    </div>
                     <h2>Favorites List</h2>
                    <div className="radio-list">
                        <h3>{stationObject.name}</h3>
                        <p>{stationObject.genre}</p>
                        <p>{stationObject.country}</p>
                        <img src={radio} height="50" width="50" alt="station-logo"></img>
                    </div>
                    <div  className="radio-button">
                        <button 
                        onClick={() => { 
                                setCurrentMedia(stationObject.url)
                                setCurrentStation(stationObject.name)
                                setCurrentCountry(stationObject.country)
                                setCurrentGenre(stationObject.genre)
                                setTrue()
                            }
                        }>
                            <img src={play} height="30px" width="30px" className="play-pause" alt="Play/Pause" />
                        </button>
                    </div>
                </div>
                </center>
            )}})}
        </div>
  }
      </div>
        )
  }

        return(
          <div>
          <center>
            <h1>Login to Profile</h1>
          </center>
          <form onSubmit={()=>{
              handleLogin()
                }
            }>
            <label>
              {" "}
              Username:{" "}
              <input
                type="text"
                id="username"
                value={loginForm.username}
                onChange={handleLoginChange}
              />
            </label>
            <br />
            <br />
            <label>
              {" "}
              Password:{" "}
              <input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />
            </label>
            <br />
            <input type="submit" />
          </form>
          <center>
          <h3>Don't have an account? Create one <NavLink to="/register" className="navlink">here!</NavLink></h3>
          </center>
        </div>
        );
}

export default Profile;

