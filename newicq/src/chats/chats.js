import AddChat from "./addChat";

function Chats(props) {
    

       

        return (

            <div>
                <AddChat updateChatId={props.updateChatId} />
            </div>
        );
    }
    export default Chats;