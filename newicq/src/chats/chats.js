import AddChat from "./addChat";

/* This function responsiable about the chats list that the connected user has */
function Chats(msgState) {
    return (
        <div>
            <AddChat checkIfOnScreen={msgState.checkIfOnScreen} addConection={msgState.addConection} usersOnScreen={msgState.usersOnScreen} lastMsg={msgState.lastMsg} updateChatId={msgState.updateChatId} />
        </div>
    );
}
export default Chats;