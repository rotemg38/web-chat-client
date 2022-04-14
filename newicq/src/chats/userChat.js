import './userChat.css'
import {dbMsg, dbMsgInChat, dbUsers, getConversation, getMsgsByChatId } from '../dbHandle/dbHardcoded';
import { Component } from 'react';

class ProfilePicture extends Component {
    constructor(username){
    super();
    if (dbUsers[username].img !== ""){
        this.img = dbUsers[username].img;
    }
    else {
        this.img = "/default_picture.jpg"
    }
  }
  getPic(){
      return this.img
  }
}
class LastMsg extends Component {
    constructor(username){
        super();
        var currChat;
        // get the chat that contain the convection between them:
        currChat = getConversation(username)
        var clock = "" 
        var lastMsg = ""
        var msgsList = getMsgsByChatId(currChat)
        if(dbMsgInChat[currChat] !== undefined){ // check if there is no msgs between them yet
            for (var i=0; i < msgsList.length; i++){
                // check which msg was the last that arrived from user1:
                if (clock < dbMsg[msgsList[i].idMsg].date){
                    clock = dbMsg[dbMsgInChat[currChat][i].idMsg].date
                    lastMsg = dbMsg[dbMsgInChat[currChat][i].idMsg].text
                }
            }
        }
        this.state = {time:clock, msg:lastMsg}
        
    }
}


function UserChat(msgState) {

    const handleUserChatClick = (event)=> {
        msgState.updateChatId(msgState.chatId);
    }


    return (
        <div className="list-group">
            <button href="#" className="list-group-item list-group-item-action flex-column align-items-start"
            onClick={handleUserChatClick}>
                <div className="d-flex w-100 justify-content-between">

                <img src={dbUsers[user].img} alt="default" className="img-thumbnail"></img> {/*new ProfilePicture(user).getPic() */}
                    <h5 className="mb-1">{user}</h5>

                    <span className="text-muted badge badge-info">msg not seen: </span>
                </div>
                <p className="mb-1">last message: {msgState.msgState===undefined ? (new LastMsg(msgState.user).state.text):(msgState.text)}  
                <small  className="text-muted"><small> since {new LastMsg(msgState.user).state.time} </small></small> 
                </p>
            </button>
        </div>
    );
}
export default UserChat;