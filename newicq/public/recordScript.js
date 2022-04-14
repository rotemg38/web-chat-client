var audioData;
var record;
const startRecording = (e) => {
    let startRecord = document.getElementById("startRecord");
    let stopRecord = document.getElementById("stopRecord");
    startRecord.disabled = true;
    stopRecord.disabled=false;
    
    //present the label of recording
    document.getElementById("recordingLabel").removeAttribute("hidden");

    // This will prompt for permission if not allowed earlier
    navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream => {
        audioData = []; 
        record = new MediaRecorder(stream);
        record.ondataavailable = e => {
            audioData.push(e.data);
            if (record.state === "inactive"){
                let audioB = new Blob(audioData,{type:'audio/x-mpeg-3'});
                let recordedAudio = document.getElementById("recordedAudio");
                recordedAudio.controls=true;
                recordedAudio.src = URL.createObjectURL(audioB);
            }
        }
        record.start();  
    })
    .catch(e=>alert("error in recording message!"));
   
}

const stopRecording = (e) => {
    let startRecord = document.getElementById("startRecord");
    let stopRecord = document.getElementById("stopRecord");
    startRecord.disabled = false;
    stopRecord.disabled=true;
    record.stop();
    //the send button in the modal
    let modalSend = document.getElementById("modalSendAudio");
    //allow to see the send button in order to send the record as a messege
    modalSend.removeAttribute("hidden");
    //hide the label says that recording started
    document.getElementById("recordingLabel").setAttribute("hidden", true);
 
}

//set the function defined above to the right buttons
let startRecord = document.getElementById("startRecord");
startRecord.onclick = startRecording;

let stopRecord = document.getElementById("stopRecord");
stopRecord.onclick = stopRecording;