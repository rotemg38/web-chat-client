export const dbUsers = {
    "user1": { displayName: "USER1", password: "123", img: "default_picture.jpg" },
    "user2": { displayName: "USER2", password: "123", img: "default_picture.jpg" },
    "user3": { displayName: "USER3", password: "123", img: "default_picture.jpg" },
    "user4": { displayName: "USER4", password: "123", img: "https://cdn.w600.comps.canstockphoto.co.il/%D7%A6%D7%99%D7%95%D7%A8-%D7%94%D7%99%D7%AA%D7%95%D7%9C%D7%99-%D7%90%D7%99%D7%A9-%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%99%D7%9D-%D7%90%D7%99%D7%A4%D7%99%D7%90%D7%A1_csp15427430.jpg" }
};
export const dbMsg = {
    msg1: { type: "text", text: "hello", date: "09:00" },
    msg2: { type: "text", text: "hello friend", date: "09:10" },
    msg3: { type: "text", text: "need to go", date: "09:15" },
    msg4: { type: "image", imgSrc: "default_picture.jpg", date: "09:15" }
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

export function setConnectedUser(username) {
    connectedUser = username
}

export function addUser(user) {
    if (user.img === undefined) {
        dbUsers[user.userName] = { password: user.password, phone: user.phoneNumber, displayName: user.displayName, gender: user.gender, img: "default_picture.jpg" };
    } else {
        dbUsers[user.userName] = { password: user.password, phone: user.phoneNumber, displayName: user.displayName, gender: user.gender, img: user.img };
    }
}

export function addImg(username, imgSrc) {
    dbUsers[username] = { img: imgSrc };
}

export function getImgByUsername(username) {
    return dbUsers[username].img;
}
export function getDisNameByUsername(username) {
    return dbUsers[username].displayName;
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
export function getProfileImg() {
    return dbUsers[connectedUser].img
}
export function getLastMsg(chatId) {
    var clock = ""
    var lastMsg = ""
    var msgsList = getMsgsByChatId(chatId)
    if (dbMsgInChat[chatId] !== undefined) { // check if there is no msgs between them yet
        for (var i = 0; i < msgsList.length; i++) {
            // check which msg was the last that arrived from user1:
            if (clock < dbMsg[msgsList[i].idMsg].date) {
                clock = dbMsg[dbMsgInChat[chatId][i].idMsg].date
                lastMsg = dbMsg[dbMsgInChat[chatId][i].idMsg].text
            }
        }
    }
    var lstMsg = { time: clock, msg: lastMsg }
    return lstMsg

}