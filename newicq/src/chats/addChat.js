import {useEffect, useState} from 'react';
import { getDisNameByUsername, getProfileImg } from "../dbHandle/dbHardcoded";
import { connectedUser, userIsExists, getConversationBy2Users } from "../dbHandle/dbHardcoded";
import './addChat.css'

/* This function responsiable about the title of the left size chats and the add chat button */
function AddChat(msgState) {

    const [logedInUser, setLogedInUser] = useState({img : "", displayName: ""});
    //get the logedInUser data- one time at page loading
    useEffect(()=>{
        async function fetchData() {
        var name = await getDisNameByUsername(connectedUser);
        var img = await getProfileImg();
        setLogedInUser({img: img, displayName: name});
    }
    fetchData();
    },[]);

    

    const checkValid = async (exists, value, user) => {
        //var chat = await getConversationBy2Users(value, connectedUser);
        var chatOnScreen = await msgState.checkIfOnScreen(value);
        if (exists == false || value === connectedUser || chatOnScreen === true) {
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
    // const checkValid = async (exists, value, user) => {
    //     var chatInSys = await getConversationBy2Users(value, connectedUser);
    //     if (exists == false || value === connectedUser || chatInSys !== false) {
    //         user.classList.remove("is-valid")
    //         user.classList.add("is-invalid")
    //         user.setCustomValidity('Wrong username')
    //         //block the option to add
    //         document.getElementById("btnAddChatModal").setAttribute("hidden", true);
    //     } else {
    //         user.classList.remove("is-invalid")
    //         user.classList.add("is-valid")
    //         user.setCustomValidity('')
    //         //allow the option to add
    //         document.getElementById("btnAddChatModal").removeAttribute("hidden");
            
    //     }
    // }
        
    /* Validation of the add chat button- check if the the user we want to add is legal */
    const checkUserID = async (event) => {
        const value = event.target.value;
        let user = document.getElementById("contactname")
        var exists = await userIsExists(value);
        checkValid(exists, value, user);
        //userIsExists(value).then(exists => checkValid(exists, value, user))
        //var exists = userIsExists(value).then(checkValid(exists, value))
        
        
        
        // if the user is not exists, the user is the current user that loged in or the user chat is allready
        // shown- then the user is not valid
        
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
                        <img src={logedInUser.img} className="col profile" alt="profile" width="100%" height="100%"/>
                    </div>

                    <div className="col-5">
                       <h3> {logedInUser.displayName}</h3>
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