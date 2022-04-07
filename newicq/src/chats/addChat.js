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
            <ul class="list-group">
                <li class="list-group-item">My User</li>
                <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add chat</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add new contact</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label"></label>
                                        <input type="text" class="form-control" placeholder="Contuct's identifier" id="contactname"></input>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={addConection} value="Update" type="button" class="btn btn-primary" data-bs-dismiss="modal">Add</button>
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