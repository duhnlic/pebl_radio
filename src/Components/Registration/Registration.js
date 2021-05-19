import { useHistory } from 'react-router-dom'
export default function Register({handleRegister, handleRegisterChange, registerForm}){
    const history = useHistory()

    return(
        <div>
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
                type="text"
                id="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
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
                value={registerForm.password}
                onChange={handleRegisterChange}
              />
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
    );
}