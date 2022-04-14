import AddChat from "./addChat";

function Chats(msgState) {
    

        return (

            <div>
                <AddChat {...msgState} updateChatId={msgState.updateChatId} />
            </div>
        );
    }
    export default Chats;