import UserChat from "./userChat";
import ReactDOM from 'react-dom'
import AddChat from "./addChat";

// export var connections = [{user:'shir', newMsgs:'1'},{user:'fintsy', newMsgs:'21'}];
// export const connectionsList = connections.map((connect)=>{
//     return <UserChat user={connect.user} amout={connect.newMsgs} />
// });

function Chats() {
    return (
        <div>
            <AddChat />
            {/*<ul class="list-group">
                {connectionsList}
    </ul>*/}
        </div>
    );
}
export default Chats;