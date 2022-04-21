import AddChat from "./addChat";

function Chats(msgState) {

        return (

            <div>

                <AddChat addConection={msgState.addConection} usersOnScreen={msgState.usersOnScreen} lastMsg={msgState.lastMsg} updateChatId={msgState.updateChatId} />

            </div>
        );
    }
    export default Chats;