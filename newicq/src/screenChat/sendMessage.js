import './sendMessage.css'
import { addMsgOld, addMsg, addMsgInChat, getOtherUserByChatId} from '../dbHandle/dbHardcoded';
import MediaButton from './mediaMessages/mediaButton';
import { SendFill } from 'react-bootstrap-icons';

/* This function is responsiable about the act of sending a message- notify any component involved and act accordingly */
function SendMessage(props) {

    //internal usage of the funcion- general function to send any message
    const sendMsg = async (inputMsgBox, msg)=>{
        let otherUser = await getOtherUserByChatId(props.chatId, props.connectedUser);
        
        //todo: to delete
        //let idMsg = addMsgOld(msg);
        //addMsgInChat(idMsg, props.chatId, props.connectedUser, otherUser);
        //todo: end of delete
        
        await addMsg(msg, otherUser);
        //add to msg the relevant fields
        msg["connectedUser"] = props.connectedUser;
        msg["from"] = props.connectedUser;
        msg["to"] = otherUser;

        //add more for the server ajutments:
        msg["Sent"] = true;
        msg["Content"] = msg.text;
        msg["Created"] = msg.fullDate;
        props.funcUpdate(msg);
        
       //clean input
       inputMsgBox.removeAttribute("src");
       //return to defult mode- which is text mode
       inputMsgBox.type = "text";
       inputMsgBox.accept = "text";
       inputMsgBox.value = "";
    };


    /* Handler for each message that sent */
    const handleSend = async (event)=>{
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.toLocaleTimeString('en-GB', { hour12: false, hour: "numeric", minute: "numeric"});
        let inputMsgBox = document.getElementById("messageBox");
        let msgType = inputMsgBox.accept;
        
        event.preventDefault();//prevent rerender
        
        let msg;
        if(inputMsgBox.value !== ""){
            let text = inputMsgBox.value;
            msg = {type: msgType, text: text, date: time, fullDate: date+' '+time};
        }
        //if the input is on image mode- means we want to send an image 
        else if(msgType === "image"){
            msg = {type: msgType, text: "image", date: time, imgSrc: inputMsgBox.src, fullDate: date+' '+time};    
        }
         //if the input is on file mode- means we want to send an video 
         else if(msgType === "file"){
            msgType = "video";
            msg = {type: msgType,text: "video", date: time, videoSrc: inputMsgBox.src, fullDate: date+' '+time};
        }
        //if the input is on audio mode- means we want to send an audio 
        else if(msgType === "audio"){
            msg = {type: msgType,text: "audio", date: time, audioSrc: inputMsgBox.src, fullDate: date+' '+time};
        } else {
            return;//end the function- dont send anything
        }
        
        await sendMsg(inputMsgBox, msg);
        
    };

    return (
        <div className='row'>
            <form onSubmit={handleSend}>
                <div className="input-group">
                    {/*<MediaButton handleSend={handleSend}/>*/}
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