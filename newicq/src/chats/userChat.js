import './userChat.css'
function UserChat({user}) {
    return (
        <div class="list-group">
        
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <img src="default_picture.jpg" alt="default" class="img-thumbnail"></img>
                    <h5 class="mb-1">{user}</h5>
                    <span class="text-muted badge badge-info">12</span>
                </div>
                <p class="mb-1">last message.  
                <small  class="text-muted"><small>   time.</small></small>
                </p>
            </a>
        </div>
        /*<li class="list-group-item d-flex justify-content-between align-items-center">
            {user}
            <div class="badge badge-pill badge-success">{amout}</div>
            <ul><span>last msg</span></ul>
    </li>*/
    );
}
export default UserChat;