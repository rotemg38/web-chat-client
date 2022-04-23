import './userNotSignIn.css'
import { useNavigate } from 'react-router-dom';

function UserConnectionError() {
    const navigate = useNavigate();

    return(
        <div className="errorMsg">
            <img alt="ConfusedEmoji" src="ConfusedEmoji.png"></img>
        
            <h1>
                Ooops.... Can't access this page!
            </h1>
            <br/>
            <h3>
            Sorry, no user is connected, 
            
            pleas<button className="btn btn-link" onClick={() => { navigate("/"); }}><h3>sign in</h3></button>
            </h3>
        </div>
        
    );
}

export default UserConnectionError;