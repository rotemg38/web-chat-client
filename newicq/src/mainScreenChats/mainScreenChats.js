import Chats from "../chats/chats";
import ScreenChat from "../screenChat/screenChat";
import './mainScreenChats.css'
import { connectedUser } from "../dbHandle/dbHardcoded";
import { useState } from "react";
import {getMsgsByChatId} from '../dbHandle/dbHardcoded';
import Message from "../screenChat/message";


function MainScreenChats() {
    const [chatsState, setChatsState] = useState({chatId: "-1",msgsComponents: [] });
   
    const [msgState, setMsgs] = useState()

    const chatInfo = {connectedUser: connectedUser, chatId: chatsState.chatId, msgsComponents: chatsState.msgsComponents}

    //when the user click the chat he wants to see this function will be activate and update the current chatId he is watching
    const updateChatId = (chatId)=>{
        var chatMessages= getMsgsByChatId(chatId);
        var connectedUser = chatInfo.connectedUser;
   
        var messageList = chatMessages.map((msg, key)=>{
            msg["connectedUser"] = connectedUser;
            return <Message {...msg} key={key}/>
        });
        setChatsState({chatId: chatId, msgsComponents: messageList});

    }
   
    //when message is sent this function will be activate and update the display of the messages
    //this function add the given message to the list of messages that we are displaying now
    const updateMessages = (msg)=>{
       setChatsState((curentState)=>{
            return {chatId: curentState.chatId, msgsComponents: [...curentState.msgsComponents, <Message {...msg} key={curentState.msgsComponents.length}/>]};
       });
    }


    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-md-3">
                    <Chats updateChatId={updateChatId}/>
                </div>
                {/*position-relative*/}
                <div className="col-md-9">
                    <ScreenChat {...chatInfo} updateMessages={updateMessages}/>
                </div>
            </div>
        </div>
        
    );
}
export default MainScreenChats;