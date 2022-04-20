import './sendMessage.css'
import { addMsg, addMsgInChat, getOtherUserByChatId} from '../dbHandle/dbHardcoded';
import MediaButton from './mediaMessages/mediaButton';
import { SendFill } from 'react-bootstrap-icons';
function SendMessage(props) {

    const handleSend = (event)=>{
        var time = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: "numeric", minute: "numeric"});
        var inputMsgBox = document.getElementById("messageBox");
        var msgType = inputMsgBox.accept;
        
        event.preventDefault();//prevent rerender
        if(inputMsgBox.value !== ""){
            let text = inputMsgBox.value;
            let idMsg = addMsg({type: msgType, text: text, date: time});
            let otherUser = getOtherUserByChatId(props.chatId, props.connectedUser);
            addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
            
            props.funcUpdate({type: msgType, text: text, date: time, connectedUser: props.connectedUser, from: props.connectedUser, to:otherUser});
            
            //clean input
            inputMsgBox.value = "";

        }
        //if the input is on image mode- means we want to send an image 
        else if(msgType === "image"){
            let idMsg = addMsg({type: msgType, text: "image", date: time, imgSrc: inputMsgBox.src});
            let otherUser = getOtherUserByChatId(props.chatId, props.connectedUser);
            addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
            
            props.funcUpdate({type: msgType ,text: "image", imgSrc: inputMsgBox.src, date: time, connectedUser: props.connectedUser, from: props.connectedUser, to:otherUser});
            
            //clean input
            inputMsgBox.removeAttribute("src");
            //return to defult mode- which is text mode
            inputMsgBox.type = "text";
            inputMsgBox.accept = "text";
            inputMsgBox.value = "";
        }
         //if the input is on file mode- means we want to send an video 
         else if(msgType === "file"){
            msgType = "video";
            let idMsg = addMsg({type: msgType,text: "video", date: time, videoSrc: inputMsgBox.src});
            let otherUser = getOtherUserByChatId(props.chatId, props.connectedUser);
            addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
            
            props.funcUpdate({type: msgType,text: "video", videoSrc: inputMsgBox.src, date: time, connectedUser: props.connectedUser, from: props.connectedUser, to:otherUser});
            
            //clean input
            inputMsgBox.removeAttribute("src");
            //return to defult mode- which is text mode
            inputMsgBox.type = "text";
            inputMsgBox.accept = "text";
            inputMsgBox.value = "";
        }
        //if the input is on audio mode- means we want to send an audio 
        else if(msgType === "audio"){
            let idMsg = addMsg({type: msgType,text: "audio", date: time, audioSrc: inputMsgBox.src});
            let otherUser = getOtherUserByChatId(props.chatId, props.connectedUser);
            addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
            
            props.funcUpdate({type: msgType,text: "audio", audioSrc: inputMsgBox.src, date: time, connectedUser: props.connectedUser, from: props.connectedUser, to:otherUser});
            
            //clean input
            inputMsgBox.removeAttribute("src");
            //return to defult mode- which is text mode
            inputMsgBox.type = "text";
            inputMsgBox.accept = "text";
            inputMsgBox.value = "";
        }
        
    };

    return (
        <div className='row'>
            <form onSubmit={handleSend}>
                <div className="input-group">
                    <MediaButton handleSend={handleSend}/>
                    <input type="text" accept="text" autoComplete="off" id="messageBox" name="messageBox" className="form-control"/>
                    <button className="btn btn-primary" type="submit" id="send">
                        <SendFill/>
                    </button>
                </div>
            </form>
      </div>
    
    );
}
export default SendMessage;