import './screenChat.css'
import SendMessage from "./sendMessage";
import Message from "./message";
import {getMsgsByChatId} from '../dbHandle/dbHardcoded';
import { useState } from "react";


function ScreenChat(chatInfo) {
    var chatMessages= getMsgsByChatId(chatInfo.chatId);
    var connectedUser = chatInfo.connectedUser;
    /*const messages = [{text: "hello",date:"09:00", from:"user1", to:"user2"},
    {text: "hello friend",date:"09:10", from:"user2", to:"user1"},
    {text: "need to go",date:"09:15", from:"user1", to:"user2"},
    {text: "kmd nkc dnskcmdlskcjnbdhscjnkdmscnjbdhscjnklmds cnjbdhscjnkmdcnbdhscjnldsncbdskjnc",date:"09:20", from:"user2", to:"user1"},
    {text: "bye bye",date:"09:30", from:"user2", to:"user1"}]*/
    
    var messageList = chatMessages.map((msg, key)=>{
        msg["connectedUser"] = connectedUser;
        return <Message {...msg} key={key}/>
    });

    const [msgsComponents, setMsgsComponents] = useState(messageList);

    const updateMessages = (msg)=>{
        setMsgsComponents( msgs => [...msgs, <Message {...msg} key={msgs.length}/>]);
    };

    return (
        <>
        <div className="row alert alert-dark">profile</div>
        {/*<div className="position-absolute bottom-0 start-1 w-100">    position-relative */}
       
        <div id="messagesList" className="row screenChats-content-msgs">
            {msgsComponents}
        </div>
       
        <SendMessage {...chatInfo} funcUpdate={updateMessages}/>
        {/*</div>*/}
        </>
    
    );
}
export default ScreenChat;