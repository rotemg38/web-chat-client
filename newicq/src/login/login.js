import {Link} from 'react-router-dom'
import './login.css';
import {userIsExists} from '../dbHandle/dbHardcoded'
import Register from '../enroll/register';

function Login() {
  function checkValid() {
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (name === ' ' || name === '' || password === ' ' || password === '') {
      console.log('not valid');
      alert("Username or password is not valid")
    } // not valid-right msg?
    else if (!userIsExists(name)) {
      alert("User is not exists")
    }
  }
  return (
    <div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Username</span>
        <input type="text" class="form-control" id="username" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Password</span>
        <input type="text" class="form-control" id="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>
      </div>
      <button onClick={checkValid} type="button" class="btn btn-outline-primary">Login</button>
      <div>Not register?<button onClick={Register} type="button" class="link-primary">Click here </button>to register</div>
    </div>

  );
}

export default Login;