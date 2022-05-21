import './screenChat.css'
import {useEffect, useState} from 'react';
import SendMessage from "./sendMessage";
import { getImgByUsername, getDisNameByUsername } from '../dbHandle/dbHardcoded';

/* This function is responisable the chat screen that present the correspondence between the users */
function ScreenChat(chatInfo) {

    const [userData, setUserData] = useState({img : "", displayName: ""});

    //every time the 'chatInfo.otherUserName' changes update the userData state
    useEffect(()=>{
        async function fetchData() {
        var name = await getDisNameByUsername(chatInfo.otherUserName);
        var img = await getImgByUsername(chatInfo.otherUserName);
        setUserData({img: img, displayName: name});
        }
        fetchData();
        console.log(userData);
    },[chatInfo.otherUserName]);

    return (
        <>
        {
            //add check if chatId = -1 need to show empty page
            chatInfo.chatId !== "-1" ?(
                <>
                <div className="row profileBar">
                    <div className="col-1">
                        <img className='imageProfile' alt="profile" src={userData.img} width="100%" height="100%" ></img>
                    </div>
                    <div className="col-11">
                        <h3>{userData.displayName}</h3>
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