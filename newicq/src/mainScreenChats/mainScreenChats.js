import Chats from "../chats/chats";
import ScreenChat from "../screenChat/screenChat";
import './mainScreenChats.css'
import { connectedUser } from "../dbHandle/dbHardcoded";
import { useState } from "react";

function MainScreenChats() {
    const [chatId, setChatId] = useState("-1");

    const chatInfo = {connectedUser: connectedUser, chatId: chatId}

    const updateChatId = (chatId)=>{
        setChatId(chatId);
    }
    const getCurrentChatId = () =>{
        return chatInfo.chatId;
    }

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-md-3">
                    <Chats updateChatId={updateChatId}/>
                </div>
                {/*position-relative*/}
                <div className="col-md-9">
                    <ScreenChat {...chatInfo} getCurrentChatId={getCurrentChatId}/>
                </div>
            </div>
        </div>
        
    );
}
export default MainScreenChats;