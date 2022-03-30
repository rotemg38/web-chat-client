import Chats from "../chats/chats";
import ScreenChat from "../screenChat/screenChat";

function MainScreenChats() {
    return (
        <div>
            <div className="row">
                <div className="col-3 bg-primary">
                    <Chats/>
                </div>
                <div className="col-9 bg-secondary">
                    <ScreenChat/>
                </div>
            </div>
           

        </div>


    );
}
export default MainScreenChats;