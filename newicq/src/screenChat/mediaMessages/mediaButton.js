import '../sendMessage.css'
import { handlePicture, handleVideo, handleUpload } from './sendMediaButtonsHandler';
import ModalPicVid from './modalPicVid';
import ModalAudio from './modalAudio';
import { Image,CameraReels, Mic, Paperclip } from 'react-bootstrap-icons';

/* This function is responisable about the media button on the chat screen panel */

function MediaButton({handleSend}){
    return(
        <div>
            <div className="dropdown">
                <button className="btn btn-outline-primary" type="button" id="media" 
                data-bs-toggle="dropdown" aria-expanded="false"> 
                <Paperclip/>
                 </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <button id="pictureMedia" className="dropdown-item" onClick={handlePicture}>
                        <Image />
                        </button>
                    </li>
                    <li>
                        <button id="videoMedia" className="dropdown-item" onClick={handleVideo}>
                            <CameraReels/>
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalMsgAudio">
                            <Mic/>
                        </button>
                    </li>
                </ul>
            </div> 

            {/*this is a hidden input in order to open the file browser when clicking the picture or video button */}
            <input type="file" accept="" id="fileInput"
            data-bs-toggle="modal" data-bs-target="#modalSendMsg" onChange={handleUpload} hidden/>
            
            <ModalPicVid handleSend={handleSend} handleUpload={handleUpload}/>

            <ModalAudio handleSend={handleSend}/>

        </div>
    );
}
export default MediaButton;
