import { connectedUser, dbChats, getOtherUser } from "../dbHandle/dbHardcoded";
import AddChat from "./addChat";
import UserChat from "./userChat";

function Chats(props) {
    

        const currUserFriend = getOtherUser(connectedUser)

        return (

            <div>
                <AddChat updateChatId={props.updateChatId} />
                {dbChats.length !== 0 ? (
                    <div>
                    {Object.entries(currUserFriend).map(([key, value]) => ( //not dbChats
                        <UserChat user={value} updateChatId={props.updateChatId} chatId={key} key={key}/>
                      ))}
                </div>) : (<div></div>)}
            </div>
        );
    }
    export default Chats;