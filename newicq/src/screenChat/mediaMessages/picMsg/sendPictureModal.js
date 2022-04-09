function PictureModal({handleSend, handleUpload}){

    //handle the case we canceled sending the pic
    const handleCancel = (e)=>{
        let image = document.getElementById("showImageMsgModal");
        let modalSendPic = document.getElementById("modalSendPic");
        let pictureInputRegretModal = document.getElementById("pictureInputRegretModal");

        //clear the image preview
        image.src = "";
        image.width = 0;
        image.height = 0;
        
        //hide the sond button for the next time- send button will show only if a picture was selected
        modalSendPic.setAttribute("hidden", "true");

        //show the input file again for the next time we want to send a pic
        pictureInputRegretModal.removeAttribute("hidden");
    };

    //handle the send pic message button
    const handleSendPic = (e)=>{
        let image = document.getElementById("showImageMsgModal");
        let modalSendPic = document.getElementById("modalSendPic");
        let pictureInputRegretModal = document.getElementById("pictureInputRegretModal");
        //if an image has chosen
        if(image.src !== "")
        {
            //set the main mmesage box to image mode and set the picture data
            var inputMsg = document.getElementById("messageBox");
            inputMsg.type = "image";
            inputMsg.src = image.src;
            
            //set the image in the modal to nothing- in order to clear the preview
            image.src = "";
            image.width = 0;
            image.height = 0;
            
            //set the send button back to hidden
            modalSendPic.setAttribute("hidden", "true");
            //show the input file again for the next time we want to send a pic
            pictureInputRegretModal.removeAttribute("hidden");
            
            //call the handler of sending messages
            handleSend(e);
        }
    };

    return(
        <div className="modal fade" id="modalSendPicMsg" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Preview Selected Picture</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}></button>
            </div>
            <div className="modal-body">
            <input type="file" accept="image/png, image/jpeg" id="pictureInputRegretModal" onChange={handleUpload}/>
            <img src="" id="showImageMsgModal"/>
            </div>
            <div className="modal-footer">
                <button type="button" id="modalCancelPic" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>Cancel</button>
                <button type="button" id="modalSendPic" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSendPic} hidden>Send</button>
            </div>
            </div>
        </div>
        </div>


    );
}
export default PictureModal;

