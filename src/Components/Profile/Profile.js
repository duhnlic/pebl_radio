import play from '../../shared/play_push_icon.svg'
import radio from '../../shared/radio_icon2.svg'
import NavBar from '../NavBar/NavBar'
const Profile  =({userProfile, isLoggedIn, handleLogin, loginForm, setLoginForm, handleLoginChange, handleLogout, setCurrentMedia, setCurrentStation, setCurrentCountry, setCurrentGenre, setTrue})=>{

    return (
        <div className="profile-page">
            <NavBar/>
          {isLoggedIn ? (
            <>
            <h1>Profile Header Placeholder</h1>
            <button onClick={handleLogout}>Log Out Here</button>
        <div className="badge">
{/* chosen icon */}
{/* username */}
{/*  */}
        </div>
        <div className="favorites">
        {userProfile.stations.map((stationObject, x) =>{
                if (x < 2000){
                return(
                <div key={stationObject.i} className="station">
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
            )}})}
        
        </div>
              )
            </>
          ) : (
            <>
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
        </>
          )}
        </div>
      );



}

export default Profile;

