
import Chats from '../chats/chats';
import './login.css';
import {useNavigate } from 'react-router-dom';
import {userIsExists} from '../dbHandle/dbHardcoded'


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
    }else{
      navigate("/chats");
    }
  }

  const navigate = useNavigate(); 
  
  return (


<div>

  <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Username</span>
  <input type="text" className="form-control" id="username" placeholder="Text" aria-label="Username" aria-describedby="basic-addon1"></input>
</div>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Password</span>
  <input type="text" className="form-control" id="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"></input>
</div>
<button onClick={checkValid} type="button" className="btn btn-outline-primary">Login</button>
<div>Not register?
      <button className='btn btn-link' onClick={()=>{navigate("/enroll");}}>Click here </button>to register</div> 

</div>
  ); 

}
export default Login;