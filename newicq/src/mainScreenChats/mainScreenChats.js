import Chats from "../chats/chats";
import ScreenChat from "../screenChat/screenChat";
import './mainScreenChats.css'
import '../App.css'
import { connectedUser, getOtherUserByChatId } from "../dbHandle/dbHardcoded";
import { useState } from "react";
import {getMsgsByChatId} from '../dbHandle/dbHardcoded';
import Message from "../screenChat/message";


function MainScreenChats() {
    const [chatsState, setChatsState] = useState({chatId: "-1", otherUserName:"", msgsComponents: [] });
   
    const [msgState, setLastMsgs] = useState({text:"", date:""});

    const chatInfo = {connectedUser: connectedUser, chatId: chatsState.chatId, otherUserName: chatsState.otherUserName, msgsComponents: chatsState.msgsComponents}

    //when the user click the chat he wants to see this function will be activate and update the current chatId he is watching
    const updateChatId = (chatId)=>{
        var chatMessages= getMsgsByChatId(chatId);
        var connectedUser = chatInfo.connectedUser;
   
        var messageList = chatMessages.map((msg, key)=>{
            msg["connectedUser"] = connectedUser; /// didnt understand
            return <Message {...msg} key={key}/>
        });


        var other = getOtherUserByChatId(chatId, connectedUser);
        setChatsState({chatId: chatId, otherUserName:other, msgsComponents: messageList});

        //change the display to be 100% - handle design
        document.getElementById("mainScreenChat").style = "height:100%";

    }
   
    //when message is sent this function will be activate and update the display of the messages
    //this function add the given message to the list of messages that we are displaying now
    const updateMessages = (msg)=>{
       setChatsState((curentState)=>{
            return {chatId: curentState.chatId, otherUserName: curentState.otherUserName, 
                msgsComponents: [...curentState.msgsComponents, <Message {...msg} key={curentState.msgsComponents.length}/>]};
       });
       setLastMsgs((current)=>{
           return { text: msg.text, date: msg.date}})
    }


    return (
        <div id="mainScreenChat" className="container">
            <div className="row">
                <div className="col-md-3">
                    <Chats {...msgState} updateChatId={updateChatId} msgState={msgState}/>
                </div>
                <div className="col-md-9">
                    <ScreenChat {...chatInfo} updateMessages={updateMessages}/>
                </div>
            </div>
        </div>
        
    );
}
export default MainScreenChats;