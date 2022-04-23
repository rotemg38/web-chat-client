import { getDisNameByUsername, getProfileImg } from "../dbHandle/dbHardcoded";
import { connectedUser, userIsExists, getConversationBy2Users } from "../dbHandle/dbHardcoded";
import './addChat.css'

/* This function responsiable about the title of the left size chats and the add chat button */

function AddChat(msgState) {
    /* Validation of the add chat button- check if the the user we want to add is legal */
    const checkUserID = (event) => {
        const value = event.target.value;
        let user = document.getElementById("contactname")
        
        // if the user is not exists, the user is the current user that loged in or the user chat is allready
        // shown- then the user is not valid
        if (!userIsExists(value) || value === connectedUser || getConversationBy2Users(value, connectedUser) !== undefined) {
            user.classList.remove("is-valid")
            user.classList.add("is-invalid")
            user.setCustomValidity('Wrong username')
            //block the option to add
            document.getElementById("btnAddChatModal").setAttribute("hidden", true);
        } else {
            user.classList.remove("is-invalid")
            user.classList.add("is-valid")
            user.setCustomValidity('')
            //allow the option to add
            document.getElementById("btnAddChatModal").removeAttribute("hidden");
            
        }
    }

    const cancleBtn = (e)=>{
        let user = document.getElementById("contactname")
         //clear the field and the validation checks for the next time and hide the add button
         user.classList.remove("is-valid")
         user.classList.remove("is-invalid")
         user.value= "";
         document.getElementById("btnAddChatModal").setAttribute("hidden", true);
    }
    return (
        <div>
            <ul className="list-group">
                <ul className="chats-title">
                    <div className="col-1">
                        <img src={getProfileImg()} className="col profile" alt="profile" width="100%" height="100%"/>
                    </div>

                    <div className="col-5">
                       <h3> {getDisNameByUsername(connectedUser)}</h3>
                    </div>

                    <button type="button" className="col btn btn-sm " data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" title="Add Chat"> 
                        <img src="add-user.png" alt="add-user-logo" className="addLogo"></img>
                    </button>
                    

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add new contact</h5>
                                    <button onClick={cancleBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form id="contucts-identifier" className='needs-validation' noValidate>
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label"></label>
                                            <input type="text" className="form-control" onChange={checkUserID} placeholder="Contuct's identifier" id="contactname" required></input>
                                            <div className="invalid-feedback">
                                                User is not exists or chat is allready exists
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={cancleBtn} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button id="btnAddChatModal" onClick={msgState.addConection} value="Update" type="button" className="btn addbutton" data-bs-dismiss="modal" hidden>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
                {/* the list of the chats that was added */}
                <div className="user"> {msgState.usersOnScreen}</div>
            </ul>
        </div>
    );

}
export default AddChat;