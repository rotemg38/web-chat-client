import Chats from "../chats/chats";
import ScreenChat from "../screenChat/screenChat";

function MainScreenChats() {
    return (
        <div>
            <div className="row">
                <div className="col-4 ">
                    <Chats/>
                </div>
                <div className="col-8 bg-secondary">
                    <ScreenChat/>
                </div>
            </div>
           

        </div>


    );
}
export default MainScreenChats;