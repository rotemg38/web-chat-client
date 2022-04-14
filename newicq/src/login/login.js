import './login.css';
import { useNavigate } from 'react-router-dom';
import { setConnectedUser } from '../dbHandle/dbHardcoded'
import { useState } from 'react';
import { checkValidation } from './loginValidation'

function Login() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const handleLogin = (event) => {
    var form = document.getElementById("loginForm");
    form.classList.add('was-validated')
    //check form validility before submitting
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else{
      setConnectedUser(inputs.userName);
      //successfuly login:
       navigate("/chats");
    }
  }

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
  
    setInputs(values => ({...values, [key]: value}))
    //check the validility of the current changing element
    checkValidation(key, value);
}

  return (


    <div>
      <div className="row align-items-center justify-content-center">
      <div className="form col-lg-5 cardBody">
          <div className="headline">
            <h1>Login</h1>
          </div>
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="form-content">
              <div className="row">
                <div className="col-lg-12 center-block">
                  <div className="form-group centered">
                    <div className="col-sm-6">
                      <input type="text" name="userName" id="username" className="form-control" placeholder="User Name *"
                      value={inputs.userName || ""} onChange={handleChange} required/>
                    </div>
                  </div>
                  <br />

                  <div className="form-group centered">
                    <div className="col-sm-6">
                      <input type="text" name="password" id="password" className="form-control" placeholder="Password *"
                      value={inputs.password || ""} onChange={handleChange} required/>
                    </div>
                  </div>
                  <div>Not register?
                    <button className='btn btn-link' onClick={() => { navigate("/enroll"); }}>Click here </button>to register</div>
                  <br />
                </div>
              </div>
              <br />
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
        <div id="try"></div>
      </div>
    </div>
  );

}
export default Login;