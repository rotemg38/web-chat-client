export const handleVideo = (e)=>{
    var inputVideo = document.getElementById("videoInput");
    inputVideo.click();
};

export const handleUploadVideo = (e)=>{
    if(e.target.files) {
        let imageFile = e.target.files[0]; //here we get the image file
        //if there is file- must ne image due to the limitions in the input element
        if(imageFile !== undefined){
            //create a local url to the image
            let url = URL.createObjectURL(imageFile);
            
            //the place of presenting the image
            let imageModal = document.getElementById("showVideoMsgModal");
            //the send button in the modal
            let modalSendPic = document.getElementById("modalSendVideo");
            //the input that the user can also upload from the modal
            let pictureInputRegretModal = document.getElementById("videoInputRegretModal");

            //show the selected image in the modal
            imageModal.src = url
            imageModal.width = 400;
            imageModal.height = 300;

            //allow to see the send button in order to send the pic as a messege
            modalSendPic.removeAttribute("hidden");

            //hide the input file element because we allready uploaded an image
            pictureInputRegretModal.setAttribute("hidden","true");
            
            //clear the input file from the selected image name
            e.target.value = "";
        } 
    }
};