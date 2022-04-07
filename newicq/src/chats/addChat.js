import { render } from "react-dom";
import { connections, connectionsList } from "./chats";
import React, { useState } from "react";
import UserChat from "./userChat";
import { addConectionToList, userIsExists } from "../dbHandle/dbHardcoded";
import { connectedUser } from "../dbHandle/dbHardcoded";


function AddChat(props) {
    const [usersOnScreen, setUserOnScreen] = useState([]);
   
    const addConection = () => {
        var username = document.getElementById("contactname").value
        if (userIsExists(username)==false){return} // check if user is exist to create a chat with him
        var chatId = addConectionToList(connectedUser, username);
        setUserOnScreen( connections => [...connections, <UserChat key={connections.length} user={username} updateChatId={props.updateChatId} chatId={chatId}/>]);
        
    };
    return (
        <div>
            <ul className="list-group">
                <li className="list-group-item">My User</li>
                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add chat</button>
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
                                <button onClick={addConection} value="Update" type="button" className="btn btn-primary" data-bs-dismiss="modal">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user"> {usersOnScreen}</div>

            </ul>
        </div>
    );
}
export default AddChat;