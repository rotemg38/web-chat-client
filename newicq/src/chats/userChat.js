import './userChat.css'
import { dbMsg, dbMsgInChat, dbUsers, getDisNameByUsername , getConversation, getMsgsByChatId, getLastMsg } from '../dbHandle/dbHardcoded';
import { Component } from 'react';

class ProfilePicture extends Component {
    constructor(username) {
        super();
        if (dbUsers[username].img !== "") {
            this.img = dbUsers[username].img;
        }
        else {
            this.img = "/default_picture.jpg"
        }
    }
    getPic() {
        return this.img
    }
}
class LastMsg extends Component {
    constructor(username) {
        super();
        var currChat;
        // get the chat that contain the convection between them:
        currChat = getConversation(username)
        var clock = ""
        var lastMsg = ""
        var msgsList = getMsgsByChatId(currChat)
        if (dbMsgInChat[currChat] !== undefined) { // check if there is no msgs between them yet
            for (var i = 0; i < msgsList.length; i++) {
                // check which msg was the last that arrived from user1:
                if (clock < dbMsg[msgsList[i].idMsg].date) {
                    clock = dbMsg[dbMsgInChat[currChat][i].idMsg].date
                    lastMsg = dbMsg[dbMsgInChat[currChat][i].idMsg].text
                }
            }
        }
        this.state = { time: clock, msg: lastMsg }

    }
}


function UserChat(msgState) {

    const handleUserChatClick = (event) => {
        msgState.updateChatId(msgState.chatId);
    }


    return (
        <div className="list-group">
            <button href="#" className="list-group-item list-group-item-action flex-column align-items-start"
                onClick={handleUserChatClick}>
                <div className="d-flex w-100 justify-content-between">
                    <img src={dbUsers[msgState.user].img} alt="default" className="img-thumbnail col"></img> {/*new ProfilePicture(user).getPic() */}
                    <div className='maintext'><h5 className="mb-1 col-10">{getDisNameByUsername(msgState.user)}</h5>
                    {/*last message: */}
                    <span className="mb-1 col-9">{msgState.text} {/*getLastMsg(getConversation(msgState.user)).msg*/} {/*new LastMsg(msgState.user).state.text*/}
                    </span></div>
                    {/*time of last message: */}
                    <small className="text-muted col"><small> {new LastMsg(msgState.user).state.time} </small></small>
                </div>
                

            </button>
        </div>
    );
}
export default UserChat;