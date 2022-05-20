import './userChat.css'
import { getImgByUsername, getDisNameByUsername } from '../dbHandle/dbHardcoded';
import {React, useEffect, useState} from 'react';

/* This function is responsiable about the componenet of every chat from chat list the connected user has */
function UserChat(msgState) {

    const [userData, setUserData] = useState({img : "", displayName: ""});
   
    useEffect(()=>{
        async function fetchData() {
        var name = await getDisNameByUsername(msgState.user);
        var img = await getImgByUsername(msgState.user);
        setUserData({img: img, displayName: name});
        }
        fetchData();
    },[]);

    /* Handle on click the chats that choisen- notify the main screen the current chat ID  */
    const handleUserChatClick = (event) => {
        msgState.updateChatId(msgState.chatId);
    }

    return (
        <div className="list-group">
            <button href="#" className="list-group-item list-group-item-action flex-column align-items-start" onClick={handleUserChatClick}>
                {/* the content of the user and the last message: */}
                <div className="justify-content-between">
                    {/* profile image: */}
                    <img src={userData.img} alt="default" className="img-thumbnail col"></img>
                    {/* the last message info: */}
                    <div className='maintext col-10'>
                        <h5 className="mb-1">{userData.displayName}</h5>
                        {/*last message text: */}
                        <div className="mb-1 text"> {msgState.lastMsg.text}
                        </div>
                    </div>
                    {/*time of last message: */}
                    <div className="text-muted col"><div> {msgState.lastMsg.fullDate} </div></div>
                </div>
            </button>
        </div>

    );
}
export default UserChat;