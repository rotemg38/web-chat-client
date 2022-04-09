function VideoModal({handleSend, handleUploadVideo}){

    //handle the case we canceled sending the pic
    const handleCancel = (e)=>{
        let video = document.getElementById("showVideoMsgModal");
        let modalSendVideo = document.getElementById("modalSendVideo");
        let videoInputRegretModal = document.getElementById("videoInputRegretModal");

        //clear the image preview
        video.src = "";
        video.width = 0;
        video.height = 0;
        
        //hide the sond button for the next time- send button will show only if a picture was selected
        modalSendVideo.setAttribute("hidden", "true");

        //show the input file again for the next time we want to send a pic
        videoInputRegretModal.removeAttribute("hidden");
    };

    //handle the send pic message button
    const handleSendPic = (e)=>{
        let video = document.getElementById("showVideoMsgModal");
        let modalSendVideo = document.getElementById("modalSendVideo");
        let videoInputRegretModal = document.getElementById("videoInputRegretModal");
        //if an image has chosen
        if(video.src !== "")
        {
            //set the main mmesage box to image mode and set the picture data
            var inputMsg = document.getElementById("messageBox");
            inputMsg.type = "file";
            inputMsg.src = video.src;
            
            //set the image in the modal to nothing- in order to clear the preview
            video.src = "";
            video.width = 0;
            video.height = 0;
            
            //set the send button back to hidden
            modalSendVideo.setAttribute("hidden", "true");
            //show the input file again for the next time we want to send a pic
            videoInputRegretModal.removeAttribute("hidden");
            
            //call the handler of sending messages
            handleSend(e);
        }
    };

    return(
        <div className="modal fade" id="modalSendVideoMsg" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" 
        aria-labelledby="staticBackdropLabelVideo" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabelVideo">Preview Selected Video</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}></button>
                </div>

                <div className="modal-body">
                <input type="file" accept="video/*" id="videoInputRegretModal" onChange={handleUploadVideo}/>
                <video controls="controls" id="showVideoMsgModal" type="video/*" src="" width="0" height="0"></video>
                </div>

                <div className="modal-footer">
                    <button type="button" id="modalCancelVideo" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>Cancel</button>
                    <button type="button" id="modalSendVideo" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSendPic} hidden>Send</button>
                </div>
                
            </div>
        </div>
        </div>


    );
}
export default VideoModal;

