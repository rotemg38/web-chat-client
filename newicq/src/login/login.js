
import Register from "../enroll/register";
import Chats from '../chats/chats';
import './login.css';

function Login() {
  function checkValid() {
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (name == ' ' || name == '' || password == ' ' || password == ''){
      console.log('not valid');
      alert("Username or password is not valid")} // not valid-right msg?
  }
  return (
<div>
  <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Username</span>
  <input type="text" class="form-control" id="username" placeholder="Text" aria-label="Username" aria-describedby="basic-addon1"></input>
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Password</span>
  <input type="text" class="form-control" id="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>
</div>
<button onClick={checkValid} type="button" class="btn btn-outline-primary">Login</button>
<div>Not register?<a href="https://www.youtube.com/watch?v=oj3x3WSt1J4" class="link-primary">Click here </a>to register</div> 
</div>

  );
}

export default Login;