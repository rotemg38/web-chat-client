
import UserChat from "./userChat";
import ReactDOM from 'react-dom'
import AddChat from "./addChat";

// export var connections = [{user:'shir', newMsgs:'1'},{user:'fintsy', newMsgs:'21'}];
// export const connectionsList = connections.map((connect)=>{
//     return <UserChat user={connect.user} amout={connect.newMsgs} />
// });

function Chats(props) {
    return (
        <div>
            <AddChat updateChatId={props.updateChatId}/>
        </div>
    );
}
export default Chats;