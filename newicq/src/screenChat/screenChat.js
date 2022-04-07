import './screenChat.css'
import SendMessage from "./sendMessage";
import Message from "./message";
import {getMsgsByChatId} from '../dbHandle/dbHardcoded';
import { useState } from "react";


function ScreenChat(chatInfo) {
    return (
        <>
        {
            //add check if chatId = -1 need to show empty page
            chatInfo.chatId !== "-1" ?(
                <>
                <div className="row alert alert-dark">profile {chatInfo.chatId}</div>
                {/*<div className="position-absolute bottom-0 start-1 w-100">    position-relative */}
               
                <div id="messagesList" className="row screenChats-content-msgs">
                    {chatInfo.msgsComponents}
                </div>
               
                <SendMessage {...chatInfo} funcUpdate={chatInfo.updateMessages}/>
                {/*</div>*/}
                </>
            ):(<></>)}
        </>
    );
}
export default ScreenChat;