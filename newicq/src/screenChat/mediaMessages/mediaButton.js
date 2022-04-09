import '../sendMessage.css'
import { handlePicture, handleVideo, handleUpload } from './sendMediaButtonsHandler';
import ModalPicVid from './modalPicVid';

function MediaButton({handleSend}){
    return(
        <div>
            
            <div className="dropdown">
                <button className="btn btn-outline-primary" type="button" id="media" 
                data-bs-toggle="dropdown" aria-expanded="false"> media </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <button id="pictureMedia" className="dropdown-item" onClick={handlePicture}>picture</button>
                    </li>
                    <li>
                        <button id="videoMedia" className="dropdown-item" onClick={handleVideo}>video</button>
                    </li>
                    <li>
                        <button className="dropdown-item">audio</button>
                    </li>
                </ul>
            </div> 

            {/*this is a hidden input in order to open the file browser when clicking the picture or video button */}
            <input type="file" accept="" id="fileInput"
            data-bs-toggle="modal" data-bs-target="#modalSendMsg" onChange={handleUpload} hidden/>
            
            <ModalPicVid handleSend={handleSend} handleUpload={handleUpload}/>

        </div>
    );
}

export default MediaButton;
