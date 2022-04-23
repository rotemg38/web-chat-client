import { useEffect } from 'react';
import { RecordCircle, StopFill } from 'react-bootstrap-icons';
import "./modalDesign.css"

/* This function is responisable about sending voice message */

function ModalAudio({ handleSend }) {

    const handleCancelSend = (e) => {
        let showMsgModal = document.getElementById("recordedAudio");
        let modalSend = document.getElementById("modalSendAudio");

        //clear the record preview
        showMsgModal.src = "";
        showMsgModal.removeAttribute("controls");

        //hide the send button for the next time- send button will show only if audio was recorded
        modalSend.setAttribute("hidden", "true");

    };
    const handleSendAudio = (e) => {
        let showMsgModal = document.getElementById("recordedAudio");
        let modalSend = document.getElementById("modalSendAudio");

        //if audio was recorded
        if (showMsgModal.src !== "") {
            //set the main mmesage box to adio mode and set the file data
            var inputMsg = document.getElementById("messageBox");
            inputMsg.type = "file";
            inputMsg.accept = "audio";
            inputMsg.src = showMsgModal.src;

            //clear the record preview
            showMsgModal.src = "";
            showMsgModal.removeAttribute("controls");

            //set the send button back to hidden
            modalSend.setAttribute("hidden", "true");

            //call the handler of sending messages
            handleSend(e);
        }
    };

    //when this component is loading- first we need to load the recors audio script 
    //in order to set the ground for audio messages
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "recordScript.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);


    return (
        <div className="modal fade" id="modalMsgAudio" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalMsgAudioLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="modalMsgAudioLabel">
                            Record Your Message
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancelSend}></button>
                    </div>

                    <div className="modal-body">
                        <p >
                            <button className='btn btn-outline-primary' id="startRecord" title='start recording'>
                                <RecordCircle size={30} />
                            </button>
                            <button className='btn btn-outline-primary' id="stopRecord" title='stop recording' disabled>
                                <StopFill size={30} />
                            </button>
                        </p>
                        <p id="recordingLabel" hidden>
                            <label>Recording...</label>
                        </p>
                        <p>
                            <audio id="recordedAudio"></audio>
                        </p>

                    </div>

                    <div className="modal-footer">
                        <button type="button" id="modalCancelAudio" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancelSend}>Cancel</button>
                        <button type="button" id="modalSendAudio" className="btn btnSendModal" data-bs-dismiss="modal" onClick={handleSendAudio} hidden>Send</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default ModalAudio;

