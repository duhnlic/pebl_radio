
import NavBar from '../NavBar/NavBar'
const Profile  =({stations, isLoggedIn, handleLogin, loginForm, setLoginForm,handleLoginChange, handleLogout})=>{

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

