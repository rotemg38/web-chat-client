import React, { useState } from "react";
import UserChat from "./userChat";
import { addConectionToList, getDisNameByUsername, getOtherUser, getConversationBy2Users, userIsExists, getProfileImg } from "../dbHandle/dbHardcoded";
import { connectedUser } from "../dbHandle/dbHardcoded";
import './addChat.css'

function AddChat(msgState) {
    const currUserFriend = getOtherUser(connectedUser)
    const chatsOnScreenList = Object.entries(currUserFriend).map(([key, value]) => (
        <UserChat {...msgState} user={value} updateChatId={msgState.updateChatId} chatId={key} key={key} />))

    const [usersOnScreen, setUserOnScreen] = useState(chatsOnScreenList);

    const addConection = () => {
        var username = document.getElementById("contactname").value
        // check if the user wants to add himself
        if (username === connectedUser) { return }
        // check if user is exist to create a chat with him:
        if (userIsExists(username) === false) { return }
        // check if userChat is allready in lists of userChats:
        if (getConversationBy2Users(username, connectedUser) !== undefined) { return }
        var chatId = addConectionToList(connectedUser, username);
        setUserOnScreen(connections => [...connections, <UserChat {...msgState} key={connections.length} user={username} updateChatId={msgState.updateChatId} chatId={chatId} />]);
    };
    return (
        <div>
            <ul className="list-group">
                <ul className="chats-title"><img src={getProfileImg()} className="col profile" alt="profile"></img>
                    <div className= "col-5">{getDisNameByUsername(connectedUser)}</div>
                    <button type="button" className="col btn btn-sm " data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> <img src="add-user.png" className="addLogo"></img></button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add new contact</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">

                                            <label htmlFor="recipient-name" className="col-form-label"></label>

                                            <input type="text" className="form-control" placeholder="Contuct's identifier" id="contactname"></input>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={addConection} value="Update" type="button" className="btn addbutton" data-bs-dismiss="modal">Add</button>
                                </div>
                            </div>
                        </div>
                    </div></ul>
                <div className="user"> {usersOnScreen}</div>

            </ul>
        </div>
    );
}
export default AddChat;