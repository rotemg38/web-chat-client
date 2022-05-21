import './login.css';
import { useNavigate } from 'react-router-dom';
import { setConnectedUser } from '../dbHandle/dbHardcoded'
import { useState } from 'react';
import { checkValidation } from './loginValidation'

/* This function is responsiable about the login page component */
function Login() {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  /* Handel login after submit the form (and check form validation) */
  const handleLogin = async (event) => {
    var form = document.getElementById("loginForm");
    form.classList.add('was-validated')
    var user = document.getElementById("username")
    var pass = document.getElementById("password")

    //check form validility before submitting
    if (!checkValidation("username", user.value) && !checkValidation("password", pass.value)) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setConnectedUser(inputs.userName);
      //successfuly login:
      navigate("/chats");
    }
  }
  /* Handler for any change in one of the elements */
  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setInputs(values => ({ ...values, [key]: value }))
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

          <form id="loginForm" onSubmit={handleLogin} className='needs-validation' noValidate>
            <div className="form-content">
              <div className="row">
                <div className="col-lg-12 center-block">

                  {/* user name element */}
                  <div className="form-group centered">
                    <div className="form-floating col-sm-7">
                      <input type="text" id="username" name="userName" className="form-control" placeholder="User Name"
                        value={inputs.userName || ""} onChange={handleChange} required />
                      <div id="userNameInvalid" className="invalid-feedback">User Name doesn't exists or the field is empty.</div>
                      <label htmlFor="userName">Username</label>
                    </div>
                  </div>
                  <br />

                  {/* password element */}
                  <div className="form-group centered">
                    <div className="form-floating col-sm-7">
                      <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                        value={inputs.password || ""} onChange={handleChange}
                        required />
                      <label htmlFor="password">Password</label>
                      <div id="passwordInvalid" className="invalid-feedback">Please fill out this field with your password.</div>
                    </div>
                  </div>

                  <div>Not register?
                    <button className='btn btn-link' onClick={() => { navigate("/enroll"); }}>Click here </button>to register
                  </div>
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