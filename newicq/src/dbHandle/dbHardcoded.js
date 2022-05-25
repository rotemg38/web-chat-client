
import axios from 'axios'

export var connectedUser = "";


axios.defaults.withCredentials = true;
const server = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5067/api" 
  });

/* HELPFUL FUNCTION TO USE THE DATE BASES: */

/* Set the connected user var to the one who was log in or register */
export async function setConnectedUser(username) {
    connectedUser = username;

    await server.get("/setup/" + username).then((response) => {
        console.log(response);
    });
}

/* get the connected user */
export async function getConnectedUser() {
    var response = await server.get("/setup/connectedUser");
    var data = response.data;
    console.log(data);
    if(data !== null){
        connectedUser = data;
    }else{
        connectedUser = "";
    }
}

export async function disConnectUser(){
    await server.get("/setup/disConnectUser");
}

/* Add user to data base */
export async function addUser(user) {
    
    if (user.img === undefined) {
        user.img = "default_picture.jpg";
    }
    var addedUser = {
                    "id": user.userName,
                    "name": user.displayName,
                    "password": user.password,
                    "image": user.img,
                    "last": null,
                    "lastdate": null,
                    "server": "localhost:5067"}
    var response = await server.post("/setup/register", addedUser);
    
    console.log(response.data);            
}

async function getUserByUsername(username) {
    try
    {
        var respons = await server.get("/contacts/" + username);
        var data = await respons.data;
        return data;
    } catch(e){
        //user not found- thus return null
        return null;
        
    }
}

/* Get user password by username */
export async function getUserPassword(username) {
    //return dbUsers[user].password
    var data = await getUserByUsername(username);
    if(data !== null){
        return data.Password;
    }
    return null;
}

/* Get profile image of connected user */
export async function getProfileImg() {
    return await getImgByUsername(connectedUser);
}

/* Get profile image by user */
export async function getImgByUsername(username) {
    //return dbUsers[username].img;
    var data = await getUserByUsername(username);
    if(data !== null){
        return data.Image;
    }
    return null;
}

/* Get display name by username */
export async function getDisNameByUsername(username) {
    //return dbUsers[username].displayName;
    var data = await getUserByUsername(username);
    if(data !== null){
        return data.Name;
    }
    return null;
}

/* Check if user is exists on system (users data base) */
export async function userIsExists(name) {
    if(name === ''){
        return false;
    }
    //getUserByUsername(name).then(data => )
    var data = await getUserByUsername(name);
    
    console.log(data);
    if(data !== null && data.Id !== ""){
        return true;
    }
    
    return false;
}

/* Add chat to chats data base */
export async function addConectionToList(user1, user2) {
    await server.post('/invitations', {
        "from": user1,
        "to": user2,
        "server": "localhost:5067"
    });

    var respons = await server.get('/chats/getchat/'+ user1 + "/" + user2);
    var data = await respons.data;
    return data.ChatId;
}


export async function addMsg(msg, to){
    await server.post('/contacts/'+to+"/Messages", {
        "content": msg.text
    });
   
}

/* Get messages list by chat id */
export async function getMsgsByChatId(idC) {

    var respons = await server.get('/chats/'+idC);
    var data = await respons.data;
    return data;
}

/* Get the other user of a specific chat */
export async function getOtherUserByChatId(idC, user1) {

    var respons = await server.get('/chats/'+user1+'/'+idC);
    var data = await respons.data;
    return data;
}

/* Get the chat that contain the convection between 2 users: */
// export function getConversation(user) {
//     for (const [key, value] of Object.entries(dbChats)) {
//         if (value[0] === user || value[1] === user) {
//             return key;
//         }
//     }
// }

/* Get chat between 2 users by these users */
export async function getConversationBy2Users(user1, user2) {
    var respons = await server.get('/chats/getchat/'+user1+'/'+user2);
    var data = await respons.data;
    return data;
}

/* Get a list of other user for all chats */
export async function getOtherUser(user) {

    var respons = await server.get('/chats/user/'+user);
    var data = await respons.data;
    console.log(data);
    return data;
}


/* Get last message info of a specific chat */
export async function getLastMsg(chatId) {
    var respons = await server.get('/chats/msgs/' + chatId);
    var data = await respons.data;
    console.log(data);
    return data;
}
