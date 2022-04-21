
/* ALL DATA BASES THAT ARE REALEVANT FOR THE APP: */

export const dbUsers = {
    "user1": { displayName: "USER1", password: "123", img: "default_picture.jpg" },
    "user2": { displayName: "USER2", password: "123", img: "default_picture.jpg" },
    "user3": { displayName: "USER3", password: "123", img: "default_picture.jpg" },
    "user4": { displayName: "USER4", password: "123", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUqFxzIoDWZ8bRMo9noLJzFYP0MyC0snBxkg&usqp=CAU" }
};
export const dbMsg = {
    msg1: { type: "text", text: "hello", date: "09:00" },
    msg2: { type: "text", text: "hello friend", date: "09:10" },
    msg3: { type: "text", text: "need to go", date: "09:15" },
    msg4: { type: "image",text:"image", imgSrc: "default_picture.jpg", date: "09:15" }
};
var msgId = 4;
var chatId = 1;
export const dbChats = { chat1: ["user1", "user2"] };
export const dbMsgInChat = {
    chat1: [{ idMsg: "msg1", from: "user1", to: "user2" },
    { idMsg: "msg2", from: "user2", to: "user1" },
    { idMsg: "msg3", from: "user1", to: "user2" },
    { idMsg: "msg4", from: "user1", to: "user2" }]
};
export var connectedUser = "";

/* HELPFUL FUNCTION TO USE THE DATE BASES: */

/* Set the connected user var to the one who was log in or register */
export function setConnectedUser(username) {
    connectedUser = username
}

/* Add user to data base */
export function addUser(user) {
    if (user.img === undefined) {
        dbUsers[user.userName] = { password: user.password, phone: user.phoneNumber, displayName: user.displayName, gender: user.gender, img: "default_picture.jpg" };
    } else {
        dbUsers[user.userName] = { password: user.password, phone: user.phoneNumber, displayName: user.displayName, gender: user.gender, img: user.img };
    }
}

/* Add profile image to data base by user */
export function addImg(username, imgSrc) {
    dbUsers[username] = { img: imgSrc };
}

/* Get profile image by user */
export function getImgByUsername(username) {
    return dbUsers[username].img;
}

/* Get display name by username */
export function getDisNameByUsername(username) {
    return dbUsers[username].displayName;
}

/* Check if user is exists on system (users data base) */
export function userIsExists(name) {
    if (dbUsers[name] != null) {
        return true;
    }
    return false
}

/* Add chat to chats data base */
export function addConectionToList(user1, user2) {
    chatId += 1;
    dbChats["chat" + chatId] = [user1, user2];
    return "chat" + chatId;
}

/* Create last message id for current message */
function generateMsgId() {
    msgId += 1;
    return "msg" + msgId;
}

/* Add a message to data base */
export function addMsg(msg) {
    var id = generateMsgId();
    dbMsg[id] = msg;
    return id;
}

/* Add message to data base by chat id */
export function addMsgInChat(idM, idC, from, to) {
    if (dbMsgInChat[idC] === undefined) {
        dbMsgInChat[idC] = [];
    }
    dbMsgInChat[idC].push({ idMsg: idM, from: from, to: to });
}

/* Get the other user of a specific chat */
export function getOtherUserByChatId(idC, user1) {
    var users = dbChats[idC];
    if (users[0] === user1)
        return users[1];
    return users[0];
}

/* Get message info by id */
export function getMsgById(id) {
    return dbMsg[id];
}

/* Get messages list by chat id */
export function getMsgsByChatId(idC) {
    var result = [];
    var lstMsg = dbMsgInChat[idC];
    if (lstMsg !== undefined) {
        lstMsg.forEach(element => {
            let msg = getMsgById(element.idMsg);
            let elm = Object.assign({}, element, msg);
            result.push(elm);
        });
    }
    return result;
}

/* Get the chat that contain the convection between 2 users: */
export function getConversation(user) {
    for (const [key, value] of Object.entries(dbChats)) {
        if (value[0] === user || value[1] === user) {
            return key;
        }
    }
}

/* Get chat between 2 users by these users */
export function getConversationBy2Users(user1, user2) {
    for (const [key, value] of Object.entries(dbChats)) {
        if ((value[0] === user1 && value[1] === user2) || (value[0] === user2 && value[1] === user1)) {
            return key
        }
    }
}

/* Get a list of other user for all chats */
export function getOtherUser(user) {
    var users = [] // {chatNum: user}
    for (const [key, value] of Object.entries(dbChats)) {
        if (value[0] === user) {
            users.push([key , value[1]]);
        } else if (value[1] === user) {
            users.push([key , value[0]]);
        }
    }
    return users
}

/* Get user password by username */
export function getUserPassword(user) {
    return dbUsers[user].password
}

/* Get profile image of connected user */
export function getProfileImg() {
    return dbUsers[connectedUser].img
}

/* Get last message info of a specific chat */
export function getLastMsg(chatId) {
    var clock = ""
    var indexLastMsg = -1
    var msgsList = getMsgsByChatId(chatId)
    if (dbMsgInChat[chatId] !== undefined) { // check if there is no msgs between them yet
        for (var i = 0; i < msgsList.length; i++) {
            // check which msg was the last that arrived from user1:
            if (clock <= dbMsg[msgsList[i].idMsg].date) {
                clock = dbMsg[dbMsgInChat[chatId][i].idMsg].date;
                indexLastMsg = i;
            }
        }
    }
    if(indexLastMsg !== -1){
        return msgsList[indexLastMsg]
    }
    return {}
}
