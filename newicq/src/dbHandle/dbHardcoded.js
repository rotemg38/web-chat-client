export const dbUsers = { "user1": { password: "123", img: "default_picture.jpg" }, "user2": { password: "123", img: "default_picture.jpg" }, "user3": { password: "123", img: "default_picture.jpg" }, "user4": { password: "123", img: "profile_pic_check.jpg" } };
export const dbMsg = { msg1: { text: "hello", date: "09:00" }, msg2: { text: "hello friend", date: "09:10" }, msg3: { text: "need to go", date: "09:15" } };
var msgId = 3;
var chatId = 1;
export const dbChats = { chat1: ["user1", "user2"] };
export const dbMsgInChat = {
    chat1: [{ idMsg: "msg1", from: "user1", to: "user2" },
    { idMsg: "msg2", from: "user2", to: "user1" },
    { idMsg: "msg3", from: "user1", to: "user2" }]
};
export var connectedUser = "user1";

export function addUser(user) {
    dbUsers[user.userName] = { password: user.password, phone: user.phone, img: user.img };
}

export function userIsExists(name) {
    if (dbUsers[name] != null) {
        return true;
    }
    return false
}

export function addConectionToList(user1, user2) {
    chatId += 1;
    dbChats["chat" + chatId] = [user1, user2];
    return "chat" + chatId;
}

function generateMsgId() {
    msgId += 1;
    return "msg" + msgId;
}


export function addMsg(msg) {
    var id = generateMsgId();
    dbMsg[id] = msg;
    return id;
}

export function addMsgInChat(idM, idC, from, to) {
    if (dbMsgInChat[idC] === undefined) {
        dbMsgInChat[idC] = [];
    }
    dbMsgInChat[idC].push({ idMsg: idM, from: from, to: to });
}

export function getOtherUserByChatId(idC, user1) {
    var users = dbChats[idC];
    if (users[0] === user1)
        return users[1];
    return users[0];
}

export function getMsgById(id) {
    return dbMsg[id];
}

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
    // console.log(result.length)
    return result;
}
//get the chat that contain the convection between 2 users:
export function getConversation(user) {
    for (const [key, value] of Object.entries(dbChats)) {
        if (value[0] === user || value[1] === user) {
            return key;
        }
    }
}
export function getConversationBy2Users(user1, user2) {
    for (const [key, value] of Object.entries(dbChats)) {
        if ((value[0] === user1 && value[1] === user2) || (value[0] === user2 && value[1] === user1)) {
            return key
        }
    }
}

export function getOtherUser(user) {
    var users = {} // {chatNum: user}
    for (const [key, value] of Object.entries(dbChats)) {
        if (value[0] === user) {
            users[key] = value[1]
        } else if (value[1] === user) {
            users[key] = value[0]
        }
    }
    return users
}

export function getUserPassword(user) {
    return dbUsers[user].password
}
