import '../sendMessage.css'
import PictureModal from './picMsg/sendPictureModal';
import { handlePicture, handleUpload } from './picMsg/sendPictureButtonHandler';

function MediaButton({handleSend}){

    return(
        <div>
            
            <div className="dropdown">
                <button className="btn btn-outline-primary" type="button" id="media" 
                data-bs-toggle="dropdown" aria-expanded="false"> media </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <button className="dropdown-item" onClick={handlePicture}>picture</button>
                    </li>
                    <li>
                        <button className="dropdown-item">video</button>
                    </li>
                    <li>
                        <button className="dropdown-item">audio</button>
                    </li>
                </ul>
            </div> 

            {/**this is a hidden input in order to open the file browser when clicking the picture button */}
            <input type="file" accept="image/png, image/jpeg" id="pictureInput" data-bs-toggle="modal" data-bs-target="#modalSendPicMsg" onChange={handleUpload} hidden/>
            <PictureModal handleSend={handleSend} handleUpload={handleUpload}/>
            
            
            {/*
            <canvas id= "myCanvas" width="50" height="0" hidden/>
            
            <span id="imgSpan" hidden>
                <img src="" id="imageTest"/>
            </span>
           */}

        </div>
    );
}

export default MediaButton;
/**
 * data-bs-toggle="modal" data-bs-target="#modalSendPicMsg"
 * 
 *<button className="btn btn-outline-secondary" type="button" id="media">media</button>
*/