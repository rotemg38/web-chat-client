import Chats from "../chats/chats";
import ScreenChat from "../screenChat/screenChat";
import './mainScreenChats.css'
import '../App.css'
import { connectedUser, getOtherUserByChatId, userIsExists, getConversationBy2Users } from "../dbHandle/dbHardcoded";
import { useEffect, useState } from "react";
import { getMsgsByChatId, getOtherUser, getLastMsg } from '../dbHandle/dbHardcoded';
import Message from "../screenChat/message";
import UserChat from "../chats/userChat";
import { addConectionToList } from "../dbHandle/dbHardcoded";
import UserConnectionError from "../errorPages/userNotSignIn";

/* This function is responsiable about the the main screen of the chats page- 
merge between the chats list and the chat screen */
function MainScreenChats({connection}) {

    const [chatsState, setChatsState] = useState({ chatId: "-1", otherUserName: "", msgsComponents: [], lastMsg: {} });

    const chatInfo = { connectedUser: connectedUser, chatId: chatsState.chatId, otherUserName: chatsState.otherUserName, msgsComponents: chatsState.msgsComponents }

    //when the user click the chat he wants to see this function will be activate and update the current chatId he is watching
    const updateChatId = async (chatId) => {
        var chatMessages = await getMsgsByChatId(chatId);
        var connectedUser = chatInfo.connectedUser;

        // list of the messages
        var messageList = chatMessages.map((msg, key) => {
            msg["connectedUser"] = connectedUser;
            return <Message {...msg} key={key} />
        });

        var other = await getOtherUserByChatId(chatId, connectedUser);
        setChatsState({ chatId: chatId, otherUserName: other, msgsComponents: messageList, lastMsg: {} });

        //change the display to be 100% - handle design
        document.getElementById("mainScreenChat").style = "height:100%";

    }


    const [usersOnScreen, setUserOnScreen] = useState();

    const updateMsg = (msg)=>{
        setChatsState((curentState) => {
            return {
                chatId: curentState.chatId, otherUserName: curentState.otherUserName,
                msgsComponents: [...curentState.msgsComponents, <Message {...msg} key={curentState.msgsComponents.length} />],
                lastMsg: msg
            };
        });

        setUserOnScreen((current) => {
            return current.map((value, key) => {
                if (value.props.chatId === chatsState.chatId)
                    return <UserChat lastMsg={msg} user={chatsState.otherUserName} updateChatId={updateChatId} chatId={chatsState.chatId} key={key} />
                return value;
            });

        });
    }

    useEffect(()=>{
        //add the connected user
        connection.invoke("AddUserConnection", connectedUser);
        //when message is recieved need to update the messages
        connection.on("ReciveMessage", function (msg){
            updateMsg(JSON.parse(msg));
          });

        async function fetchData() {
            var currUserFriend = await getOtherUser(connectedUser)
            // list of the chats connected
            const chatsOnScreenList = currUserFriend.map((value, key) => {
                //var last = await ;
                return <UserChat lastMsg={getLastMsg(value.Item1)} user={value.Item2} updateChatId={updateChatId} chatId={value.Item1} key={key} />
            });
            
            setUserOnScreen(chatsOnScreenList);

        }
        fetchData();
    },[]);


    /* When message is sent this function will be activate and update the display of the messages.
    This function add the given message to the list of messages that we are displaying now.
    Also this function update the last message for te specific chat */
    const updateMessages = (msg) => {
        
        var invokeMsg = {Id: -1, Content: msg.Content, Created: msg.Created, Sent: false};
     
        connection.invoke("SentMessage", JSON.stringify(invokeMsg), chatsState.otherUserName);

        updateMsg(msg);
        /*setChatsState((curentState) => {
            return {
                chatId: curentState.chatId, otherUserName: curentState.otherUserName,
                msgsComponents: [...curentState.msgsComponents, <Message {...msg} key={curentState.msgsComponents.length} />],
                lastMsg: msg
            };
        });

        setUserOnScreen((current) => {
            return current.map((value, key) => {
                if (value.props.chatId === chatsState.chatId)
                    return <UserChat lastMsg={msg} user={chatsState.otherUserName} updateChatId={updateChatId} chatId={chatsState.chatId} key={key} />
                return value;
            });

        });*/
    }
    const checkIfOnScreen = async (username) => {
        var chat = await getConversationBy2Users(username, connectedUser);
        if (chat === "") { //chat doesn't exists
            return false;
        }
        var onScreenValue = 0;
        var onScreen =  usersOnScreen.map((value, key) => { // check if it's on screen
            if (value.props.chatId === chat.ChatId) { 
                onScreenValue = 1;
            }
        });
        if (onScreenValue === 1) {
            return true;
        }
        return false;
    }

    /* Add the chat to the chat list in the left side of screen */
    const addConection = async() => {
        var user = document.getElementById("contactname")
        var username = user.value
        // check if the user wants to add himself
        if (username === connectedUser) { return }
        // check if user is exist to create a chat with him:
        if (userIsExists(username) === false) { return }
        // check if userChat is allready in lists of userChats:
        if (await checkIfOnScreen(username) === true) { return }
        //if (await getConversationBy2Users(username, connectedUser) !== "") { return }
        
        //clear the field and the validation checks for the next time and hide the add button
        user.classList.remove("is-valid")
        user.value= "";
        document.getElementById("btnAddChatModal").setAttribute("hidden", true);


        var chatId = await addConectionToList(connectedUser, username);
        var newList = usersOnScreen;
        // add the new chat
        newList.push(<UserChat lastMsg={{}} key={usersOnScreen.length} user={username} updateChatId={updateChatId} chatId={chatId} />);
        // list the chats on screen
        setUserOnScreen(
            (current) => {
                return newList.map((value, key) => {
                    return value;
                });
            });
    };

    return (
        <>
        {
        connectedUser === ""?(
           <UserConnectionError/> 
        ):(
            <div id="mainScreenChat" className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Chats checkIfOnScreen={checkIfOnScreen} addConection={addConection} setUserOnScreen={setUserOnScreen} usersOnScreen={usersOnScreen} lastMsg={chatsState.lastMsg} updateChatId={updateChatId} />
                    </div>
                    <div className="col-md-9">
                        <ScreenChat {...chatInfo} updateMessages={updateMessages} />
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
export default MainScreenChats;