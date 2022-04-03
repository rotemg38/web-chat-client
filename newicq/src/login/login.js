
import Chats from '../chats/chats';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { userIsExists } from '../dbHandle/dbHardcoded'


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
    } else {
      navigate("/chats");
    }
  }

  const navigate = useNavigate();

  return (


    <div>
      <div className="row align-items-center justify-content-center">
        <div className="form col-lg-10">
          <div className="headline">
            <h1>Login</h1>
          </div>
          <form onSubmit={checkValid}>
            <div className="form-content">
              <div className="row">
                <div className="col-lg-12 center-block">
                  <div className="form-group centered">
                    <div className="col-sm-6">
                      <input type="text" name="userName" id="username" className="form-control" placeholder="User Name *" />
                    </div>
                  </div>
                  <br />

                  <div className="form-group centered">
                    <div className="col-sm-6">
                      <input type="text" name="password" id="password" className="form-control" placeholder="Password *" />
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
      );

    </div>
  );

}
export default Login;