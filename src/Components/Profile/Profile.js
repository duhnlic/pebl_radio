import play from '../../shared/play_push_icon.svg'
import radio from '../../shared/radio_icon2.svg'
import NavBar from '../NavBar/NavBar'
import  {NavLink} from 'react-router-dom';
import {useEffect} from 'react';
import { BallotSharp } from '@material-ui/icons';
import { Button } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
const Profile  =({userProfile, isLoggedIn, handleLogin, loginForm, setLoginForm, handleLoginChange, handleLogout, setCurrentMedia, setCurrentStation, setCurrentCountry, setCurrentGenre, setTrue, getProfileData})=>{
  console.log(userProfile.stations)

    useEffect(() => {
      getProfileData();
    }, [isLoggedIn]);

  if(userProfile.username){
  return (
    <div>
        <div className="profile-page">
            <NavBar/>
            <center>
            <h1>Profile Header Placeholder</h1>
            <button onClick={handleLogout} className="logout-button">Log Out Here</button> 
            </center>
         <div className="badge">
            {/* chosen icon
            username */}

        </div>
        </div>
        {!userProfile.stations.length ? 
        <>
        <center>
          <h1>You Don't have any stations.</h1>
        </center>
        </>:
        <div className="favorites">
        {userProfile.stations.map((stationObject, x) =>{
                if (x < 2000){
                return(
                <center>
                <div key={stationObject.i} className="station">
                    <div className="remove-button">
                    <Button
                     className="remove-btn"
                     type="primary"
                     shape="circle"
                     icon={<DeleteOutlined />}
                     onClick={()=>{

                     }}
                     />
                    </div>
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

