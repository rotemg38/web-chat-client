var currentMedia = "";

//return the current media message we want to send
export const getCurrentMedia = ()=>{return currentMedia};

//according to the current media we want to send 
//this function return the correct element to present the file in the modal
export const getCurrentShowElementModal = ()=>{
    let showMsgModal;
    if(currentMedia === "image"){
        showMsgModal  = document.getElementById("showPicMsgModal");
    } else {
        showMsgModal  = document.getElementById("showVideoMsgModal");
    }

    return showMsgModal;
};

//open the files browser when clicking the picture option and set the elements to sending image
export const handlePicture=(e)=>{
    currentMedia = "image";
    let inputFile = document.getElementById("fileInput");
    let inputRegretModal = document.getElementById("inputRegretModal");
    let mediaTypeImage = document.getElementById("mediaTypeImage");
    let mediaTypeVideo = document.getElementById("mediaTypeVideo");

    //switch the show in the modal from video to image
    mediaTypeImage.removeAttribute("hidden");
    mediaTypeVideo.setAttribute("hidden","true");

    //update the input file to accept the correct type of files-images
    inputFile.setAttribute("accept","image/png, image/jpeg");
    inputRegretModal.setAttribute("accept","image/png, image/jpeg");
    
    inputFile.click();
};

//open the files browser when clicking the video option and set the elements to sending video
export const handleVideo = (e)=>{
    currentMedia = "file";//representing video in handleSend func in sendMessage.js file
    let inputFile = document.getElementById("fileInput");
    let inputRegretModal = document.getElementById("inputRegretModal");
    let mediaTypeImage = document.getElementById("mediaTypeImage");
    let mediaTypeVideo = document.getElementById("mediaTypeVideo");

    //switch the show in the modal from image to video
    mediaTypeVideo.removeAttribute("hidden");
    mediaTypeImage.setAttribute("hidden","true");
    
    //update the input file to accept the correct type of files-videos
    inputFile.setAttribute("accept","video/*");
    inputRegretModal.setAttribute("accept","video/*");

    inputFile.click();
};

//handle the uploading of the selected file- mainly handle the presentation of the file
//the file could be picture or video
export const handleUpload=(e)=>{
    
    if(e.target.files) {
        let file = e.target.files[0]; //here we get the file
        //if there is file
        if(file !== undefined){
            //create a local url to the file
            let url = URL.createObjectURL(file);
            
            //the place of presenting the file
            let previewMsgModal = getCurrentShowElementModal();
            //the send button in the modal
            let modalSend = document.getElementById("modalSend");
            //the input that the user can also upload from the modal
            let inputRegretModal = document.getElementById("inputRegretModal");

            //show the selected file in the modal
            previewMsgModal.src = url
            previewMsgModal.width = 400;
            previewMsgModal.height = 300;

            //allow to see the send button in order to send the file as a messege
            modalSend.removeAttribute("hidden");

            //hide the input file element because we allready uploaded a file
            inputRegretModal.setAttribute("hidden","true");
            
            //clear the input file from the selected file name
            e.target.value = "";
        }
      }
};

