import { useHistory } from 'react-router-dom'
export default function Register({handleRegister, handleRegisterChange, registerForm}){
    const history = useHistory()

    return(
      <div>
        <div className="login-page">
            <h2>Create an Account:</h2>
            <form onSubmit={ async ()=>{
              await handleRegister()
              history.push('/profile')
            }
            }>
            <label>
              {" "}
              Username:{" "}
              <input
                className="login-field"
                type="text"
                id="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
              />
            </label>
            <br />
            <label>
              {" "}
              Password:{" "}
              <input
                className="login-field"
                type="password"
                id="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
              />
            </label>
            <br />
            <br />
            <input type="submit" className="login-field" />
          </form>
        </div>
      </div>
    );
}