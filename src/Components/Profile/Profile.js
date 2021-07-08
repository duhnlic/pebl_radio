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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';



const Profile  =({userProfile, isLoggedIn, handleLogin, loginForm, handleLoginChange, handleLogout, setCurrentMedia, setCurrentStation, setCurrentCountry, setCurrentGenre, setTrue, getProfileData, handleRemoveFavorite, setRemoveById, removeById, setConfirmTrue, confirmation, setConfirmFalse})=>{

    const addFavoriteIcon = <PlaylistAddIcon/>
    const appsIcon = <AppsIcon/>
    const playArrow = <PlayArrowIcon/>

    useEffect(() => {
      getProfileData();
    }, [isLoggedIn]);

    useEffect(()=>{
      console.log(`The setRemoveById is set to: ${removeById} on Profiles`)
    },[removeById])

  if(userProfile.username){
  return (
    <div>
        <div className="profile-page">
            <NavBar/>
            <center>
            <h1>Welcome to your Pebl Profile, {userProfile.username}!</h1> 
            <button onClick={handleLogout} className="logout-button">Log Out Here</button> 
            </center>
            <AccountCircleIcon/>
            <h3>{userProfile.username}'s Favorite Stations</h3>
         <div className="badge">
            {/* chosen icon
            username */}

        </div>
        </div>
        {!userProfile.stations.length ? 
        <>
        <center>
          <p>Head on over to{appsIcon}<NavLink to="/" className="navlink">Curated Stations</NavLink>Click on a station to {playArrow}play it and if you like it, click the {addFavoriteIcon} button in the player to add it to your Favorites List!</p>
          <h2>Favorites List:</h2>
        </center>
        </>:
        <div className="favorites">
        {userProfile.stations.map((stationObject, x) =>{
                if (x < 2000){
                return(
                
                <div key={stationObject.i} className="station">
                    <div className="remove-button">
                <>{!confirmation ?
                    <button
                     className="remove-btn"
                     type="primary"
                     shape="circle"
                     onClick={()=>{
                      console.log(`The base assignment of station id is: ${stationObject._id} on Profiles`)
                        setRemoveById(stationObject._id)
                        setConfirmTrue()
                     }}>
                     <DeleteOutlined />
                    </button>
                  :
                     <div>
                      <h4>Confirm Remove?</h4>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          handleRemoveFavorite()
                          setConfirmFalse()
                        }}>
                      <CheckCircleIcon/>
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          setConfirmFalse()
                        }}>
                      <CancelIcon/>
                      </button>
                    </div>
                }</>
                    </div>
                     {/* <h2>Favorites List</h2> */}
                    <div className="radio-list">
                        <h3>{stationObject.name}</h3>
                        <p>{stationObject.genre}</p>
                        <p>{stationObject.country}</p>
                        <img src={radio} height="50" width="50" alt="station-logo"></img>
                    </div>
                    <div  className="radio-button">
                        <button 
                        className="station-button"
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
                
            )}})}
        </div>
  }
      </div>
        )
  }

        return(
          <div>
          <NavBar/>
          <div className="login-page">
          <center>
            <h1>Login to Profile</h1>
          </center>
          <form onSubmit={()=>{
              handleLogin()
                }
            }>
          <center>
            <label>
              {" "}
              Username:{" "}
              <input
                className="login-field"
                type="text"
                id="username"
                value={loginForm.username}
                onChange={handleLoginChange}
              />
            </label>
            </center>
            <center>
            <label>
              {" "}
              Password:{" "}
              <input
                className="login-field"
                type="password"
                id="password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />
            </label>
          </center>
            <br />
            <input className="btn login-field" type="submit" />
          </form>
          <center>
          <h3>Don't have an account? Create one<NavLink to="/register" className="reg-navlink">here!</NavLink></h3>
          </center>
        </div>
        </div>
        );
}

export default Profile;

