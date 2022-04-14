import './screenChat.css'
import SendMessage from "./sendMessage";
import { getImgByUsername, getDisNameByUsername } from '../dbHandle/dbHardcoded';

function ScreenChat(chatInfo) {
    return (
        <>
        {
            //add check if chatId = -1 need to show empty page
            chatInfo.chatId !== "-1" ?(
                <>
                <div className="row profileBar">
                    <div className="col-1">
                        <img className='imageProfile' alt="profile image" src={getImgByUsername(chatInfo.otherUserName)} width="100%" height="100%" ></img>
                    </div>
                    <div className="col-11">
                        <h3>{getDisNameByUsername(chatInfo.otherUserName)}</h3>
                    </div>
                </div>
                
                <div id="messagesList" className="row screenChats-content-msgs">
                    {chatInfo.msgsComponents}
                </div>
               
                <SendMessage {...chatInfo} funcUpdate={chatInfo.updateMessages}/>
               
                </>
            ):(<></>)}
        </>
    );
}
export default ScreenChat;