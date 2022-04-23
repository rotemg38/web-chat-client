import './sendMessage.css'
import { addMsg, addMsgInChat, getOtherUserByChatId} from '../dbHandle/dbHardcoded';
import MediaButton from './mediaMessages/mediaButton';
import { SendFill } from 'react-bootstrap-icons';

/* This function is responsiable about the act of sending a message- notify any component involved and act accordingly */
function SendMessage(props) {

    //internal usage of the funcion- general function to send any message
    const sendMsg = (inputMsgBox, msg)=>{
        let idMsg = addMsg(msg);
        let otherUser = getOtherUserByChatId(props.chatId, props.connectedUser);
        addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
        //add to msg the relevant fields
        msg["connectedUser"] = props.connectedUser;
        msg["from"] = props.connectedUser;
        msg["to"] = otherUser;
        props.funcUpdate(msg);
        
       //clean input
       inputMsgBox.removeAttribute("src");
       //return to defult mode- which is text mode
       inputMsgBox.type = "text";
       inputMsgBox.accept = "text";
       inputMsgBox.value = "";
    };


    /* Handler for each message that sent */
    const handleSend = (event)=>{
        let time = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: "numeric", minute: "numeric"});
        let inputMsgBox = document.getElementById("messageBox");
        let msgType = inputMsgBox.accept;
        
        event.preventDefault();//prevent rerender
        
        let msg;
        if(inputMsgBox.value !== ""){
            let text = inputMsgBox.value;
            msg = {type: msgType, text: text, date: time};
        }
        //if the input is on image mode- means we want to send an image 
        else if(msgType === "image"){
            msg = {type: msgType, text: "image", date: time, imgSrc: inputMsgBox.src};    
        }
         //if the input is on file mode- means we want to send an video 
         else if(msgType === "file"){
            msgType = "video";
            msg = {type: msgType,text: "video", date: time, videoSrc: inputMsgBox.src};
        }
        //if the input is on audio mode- means we want to send an audio 
        else if(msgType === "audio"){
            msg = {type: msgType,text: "audio", date: time, audioSrc: inputMsgBox.src};
        } else {
            return;//end the function- dont send anything
        }
        
        sendMsg(inputMsgBox, msg);
        
    };

    return (
        <div className='row'>
            <form onSubmit={handleSend}>
                <div className="input-group">
                    <MediaButton handleSend={handleSend}/>
                    <input type="text" accept="text" autoComplete="off" id="messageBox" name="messageBox" className="form-control"/>
                    <button className="btn btn-primary" type="submit" id="send" title="Send Message">
                        <SendFill/>
                    </button>
                </div>
            </form>
      </div>
    );
}
export default SendMessage;