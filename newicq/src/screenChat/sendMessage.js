import './sendMessage.css'
import { addMsg, addMsgInChat, getOtherUserByChatId} from '../dbHandle/dbHardcoded';
import MediaButton from './mediaMessages/mediaButton';
function SendMessage(props) {

    const handleSend = (event)=>{
        var inputMsgBox = document.getElementById("messageBox");
        var msgType = inputMsgBox.type;
        
        event.preventDefault();//prevent rerender
        if(inputMsgBox.value !== ""){
            let text = inputMsgBox.value;
            let time = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: "numeric", minute: "numeric"});
            let idMsg = addMsg({type: msgType, text: text, date: time});
            let otherUser = getOtherUserByChatId(props.chatId, props.connectedUser);
            addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
            
            props.funcUpdate({type: msgType, text: text, date: time, connectedUser: props.connectedUser, from: props.connectedUser, to:otherUser});
            
            //clean input
            inputMsgBox.value = "";

        }
        //if the input is on image mode- means we want to send an image 
        else if(msgType == "image"){
            let time = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: "numeric", minute: "numeric"});
            let idMsg = addMsg({type: msgType, date: time, imgSrc: inputMsgBox.src});
            let otherUser = getOtherUserByChatId(props.chatId, props.connectedUser);
            addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
            
            props.funcUpdate({type: msgType, imgSrc: inputMsgBox.src, date: time, connectedUser: props.connectedUser, from: props.connectedUser, to:otherUser});
            
            //clean input
            inputMsgBox.removeAttribute("src");
            //return to defult mode- which is text mode
            inputMsgBox.type = "text";
            inputMsgBox.value = "";
        }
         //if the input is on video mode- means we want to send an video 
         else if(msgType == "file"){
            msgType = "video";
            let time = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: "numeric", minute: "numeric"});
            let idMsg = addMsg({type: msgType, date: time, videoSrc: inputMsgBox.src});
            let otherUser = getOtherUserByChatId(props.chatId, props.connectedUser);
            addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
            
            props.funcUpdate({type: msgType, videoSrc: inputMsgBox.src, date: time, connectedUser: props.connectedUser, from: props.connectedUser, to:otherUser});
            
            //clean input
            inputMsgBox.removeAttribute("src");
            //return to defult mode- which is text mode
            inputMsgBox.type = "text";
            inputMsgBox.value = "";
        }
        
    };

    return (
        <div className='row'>
            <form onSubmit={handleSend}>
                <div className="input-group">
                    <MediaButton handleSend={handleSend}/>
                    <input type="text" autoComplete="off" id="messageBox" name="messageBox" className="form-control"/>
                    <button className="btn btn-primary" type="submit" id="send">Send</button>
                </div>
            </form>
      </div>
    
    );
}
export default SendMessage;