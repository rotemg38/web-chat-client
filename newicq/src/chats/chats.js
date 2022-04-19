import AddChat from "./addChat";

function Chats(msgState) {
    

        return (

            <div>
                <AddChat {...msgState} updateChatId={msgState.updateChatId} getMsgState={msgState.getMsgState}/>
            </div>
        );
    }
    export default Chats;