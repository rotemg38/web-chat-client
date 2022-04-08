import './screenChat.css'
import { addMsg, addMsgInChat, getOtherUserByChatId} from '../dbHandle/dbHardcoded';

function SendMessage(props) {
    const handleSend = (event)=>{
        var inputMsgBox = document.getElementById("messageBox");
        event.preventDefault();//prevent rerender
        if(inputMsgBox.value !== ""){
            let text = inputMsgBox.value;
            let time = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: "numeric", minute: "numeric"});
            let idMsg = addMsg({text: text, date: time});
            let otherUser = getOtherUserByChatId(props.chatId, props.connectedUser);
            addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
            
            props.funcUpdate({text: text, date: time, connectedUser: props.connectedUser, from: props.connectedUser, to:otherUser});
            
            //clean input
            inputMsgBox.value = "";
        }
        
    };

    return (
        <div className='row'>
            <form onSubmit={handleSend}>
                <div className="input-group">
                    <button className="btn btn-outline-secondary" type="button" id="media">media</button>
                    <input type="text" autoComplete="off" id="messageBox" name="messageBox" className="form-control"/>
                    <button className="btn btn-outline-secondary" type="submit" id="send">Send</button>
                </div>
            </form>
      </div>
    
    );
}
export default SendMessage;