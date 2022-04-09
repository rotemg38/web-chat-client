
//open the files browser when clicking the picture option
export const handlePicture=(e)=>{
    var inputPic = document.getElementById("pictureInput");
    inputPic.click();
};

//handle the uploading of the selected image- mainly handle the presentation of the picture
export const handleUpload=(e)=>{
    
    if(e.target.files) {
        let imageFile = e.target.files[0]; //here we get the image file
        //if there is file- must ne image due to the limitions in the input element
        if(imageFile !== undefined){
            //create a local url to the image
            let url = URL.createObjectURL(imageFile);
            
            //the place of presenting the image
            let imageModal = document.getElementById("showImageMsgModal");
            //the send button in the modal
            let modalSendPic = document.getElementById("modalSendPic");
            //the input that the user can also upload from the modal
            let pictureInputRegretModal = document.getElementById("pictureInputRegretModal");

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
/** 
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function (e) {
          var myImage = new Image(); // Creates image object
          myImage.src = e.target.result; // Assigns converted image to image object
         
          myImage.onload = function(ev) {
            var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
            var myContext = myCanvas.getContext("2d"); // Creates a contect object
            myCanvas.width = myImage.width; // Assigns image's width to canvas
            myCanvas.height = myImage.height; // Assigns image's height to canvas
            myContext.drawImage(myImage,0,0); // Draws the image on canvas resized
            let imgData = myCanvas.toDataURL("image/jpeg",0.75); // Assigns image base64 string in jpeg format to a variable
            
            let image = document.getElementById("imageMsg");
            image.src = imgData
            image.width = myImage.width*0.1;
            image.height = myImage.height*0.1;

            //let picInput = document.getElementById("pictureInput");
            //picInput.setAttribute("data-bs-toggle", "modal");
            //picInput.setAttribute("data-bs-target", "#modalSendPicMsg");
            //picInput.toggle();

            //let picModal = document.getElementById("modalSendPicMsg");
            //$("#modalSendPicMsg").modal('show');
            

            //inputMsg.type = "image";
            //inputMsg.src = imgData;
            

            //inputMsg.style.backgroundImage = 'url(' + imgData + ')';
           // inputMsg.width = myImage.width*0.1;
            //inputMsg.height = myImage.height*0.1;
            //document.getElementById("texts").innerHTML = document.getElementById("imgSpan").innerHTML;
            
            //inputMsg.value = document.getElementById("imgSpan").innerHTML;
            //handleSend(e);
            }
        }
**/
      }
};