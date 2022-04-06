import Chats from "../chats/chats";
import ScreenChat from "../screenChat/screenChat";
import './mainScreenChats.css'

function MainScreenChats() {
    const chatInfo = {connectedUser:"user1" ,chatId:"chat1"}
    return (
        
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-md-3">
                    <Chats/>
                </div>
                {/*position-relative*/}
                <div className="col-md-9">
                    <ScreenChat {...chatInfo}/>
                </div>
            </div>
        </div>
        
    );
}
export default MainScreenChats;