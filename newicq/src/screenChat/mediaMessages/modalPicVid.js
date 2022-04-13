import { getCurrentShowElementModal, getCurrentMedia } from "./sendMediaButtonsHandler";

function ModalPicVid({handleSend, handleUpload}){

    //handle the case we canceled sending the pic/video
    const handleCancel = (e)=>{
        let showMsgModal = getCurrentShowElementModal();
        let modalSend = document.getElementById("modalSend");
        let inputRegretModal = document.getElementById("inputRegretModal");

        //clear the image/video preview
        showMsgModal.src = "";
        showMsgModal.width = 0;
        showMsgModal.height = 0;
        
        //hide the send button for the next time- send button will show only if a file was selected
        modalSend.setAttribute("hidden", "true");

        //show the input file again for the next time we want to send a pic/video
        inputRegretModal.removeAttribute("hidden");
    };

    //handle the send pic/video message button
    const handleSendPic = (e)=>{
        let showMsgModal = getCurrentShowElementModal();
        let modalSend = document.getElementById("modalSend");
        let inputRegretModal = document.getElementById("inputRegretModal");
        //if a file has chosen
        if(showMsgModal.src !== "")
        {
            //set the main mmesage box to image/video mode and set the file data
            var inputMsg = document.getElementById("messageBox");
            inputMsg.type = getCurrentMedia();
            inputMsg.accept = getCurrentMedia();
            inputMsg.src = showMsgModal.src;
            
            //set the image/video in the modal to nothing- in order to clear the preview
            showMsgModal.src = "";
            showMsgModal.width = 0;
            showMsgModal.height = 0;
            
            //set the send button back to hidden
            modalSend.setAttribute("hidden", "true");
            //show the input file again for the next time we want to send a pic/video
            inputRegretModal.removeAttribute("hidden");
            
            //call the handler of sending messages
            handleSend(e);
        }
    };

    return(
        <div className="modal fade" id="modalSendMsg" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                        Preview Your Selected Media 
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}></button>
                </div>

                <div className="modal-body">
                <input type="file" accept="" id="inputRegretModal" onChange={handleUpload}/>

                <span id="mediaTypeImage" hidden>
                    <img alt="" src="" id="showPicMsgModal"/>
                </span>
                <span id="mediaTypeVideo" hidden>
                    <video controls="controls" id="showVideoMsgModal" type="video/*" src="" width="0" height="0"></video>
                </span>
                
                </div>

                <div className="modal-footer">
                    <button type="button" id="modalCancel" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>Cancel</button>
                    <button type="button" id="modalSend" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSendPic} hidden>Send</button>
                </div>

            </div>
        </div>
        </div>


    );
}
export default ModalPicVid;

