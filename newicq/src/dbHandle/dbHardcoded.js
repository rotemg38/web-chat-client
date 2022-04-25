
/* ALL DATABASES THAT ARE REALEVANT FOR THE APP: */

const dbUsers = {
    "rihanna": { displayName: "Rihanna", password: "SingWithMe8", img: "https://pbs.twimg.com/profile_images/1133109643734130688/BwioAwkz.jpg" },
    "elon": { displayName: "Elon Musk", password: "ImRich10", img: "https://images-na.ssl-images-amazon.com/images/M/MV5BOTI3ODk1MTMyNV5BMl5BanBnXkFtZTcwNDEyNTE2Mg@@._V1_UY317_CR6,0,214,317_AL_.jpg" },
    "ryan": { displayName: "Ryan Reynolds", password: "FunnyMe5", img: "https://upload.wikimedia.org/wikipedia/commons/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg" },
    "shir": { displayName: "Shir", password: "Shir1998", img: "default_picture.jpg" },
    "rotem": { displayName: "Rotem", password: "Rotem100", img: "default_picture.jpg" },
    "dwayne johnson": { displayName: "The Rock", password: "Strong9", img: "https://www.biography.com/.image/t_share/MTgwOTI0NDYwNjQ2Mjc4MjMy/gettyimages-1061959920.jpg" },
    "michael": { displayName: "Michael Jackson", password: "TheKIng3", img: "https://geo-media.beatport.com/image_size/590x404/080c6217-0efa-4323-8b7e-2ad3546a1def.jpg" },
    "obama": { displayName: "Barak Obama", password: "Prsident7", img: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg" },
};
var msgId = 11;
const dbMsg = {
    msg1: { type: "text", text: "Yes we can", date: "09:00" },
    msg2: { type: "text", text: "I love the movie Moana", date: "09:10" },
    msg3: { type: "image", text: "image", imgSrc: "https://www.cnet.com/a/img/resize/2d182bccac072cff2ae775f47484ee46602f91b4/2021/11/19/73203c5f-bb09-4470-b61a-8383db890b83/free-guy-2020.jpg?auto=webp&fit=crop&height=630&width=1200", date: "09:15" },
    msg4: { type: "text", text: "Love never felt so good", date: "09:15" },
    msg5: { type: "text", text: "shine bright like a diamond", date: "09:20" },
    msg6: { type: "image", text: "image", imgSrc: "https://www.tesla.com/ownersmanual/images/GUID-BEE67A59-6DD7-460C-9C49-0DD47E707A02-online-en-US.jpg", date: "8:00" },
    msg7: { type: "text", text: "When will we meet?", date: "09:34" },
    msg8: { type: "text", text: "My favorite movie", date: "09:16" },
    msg9: { type: "text", text: "Love youre car. I have that one too!", date: "08:45" },
    msg10: { type: "text", text: "ראית את האפליקציה של שיר ורותם? ממש יפה", date: "09:46" },
    msg11: { type: "text", text: "כן! וגם עובד מעולה", date: "09:49" }
};
var chatId = 7;
const dbChats = {
    chat1: ["shir", "dwayne johnson"], chat2: ["rotem", "obama"], chat3: ["michael", "rihanna"],
    chat4: ["shir", "ryan"], chat5: ["rotem", "elon"], chat6: ["ryan", "elon"], chat7: ["dwayne johnson", "rihanna"]
};

const dbMsgInChat = {
    chat1: [{ idMsg: "msg2", from: "dwayne johnson", to: "shir" }],
    chat2: [{ idMsg: "msg1", from: "obama", to: "rotem" }],
    chat3: [{ idMsg: "msg4", from: "michael", to: "rihanna" }, { idMsg: "msg5", from: "rihanna", to: "michael" }],
    chat4: [{ idMsg: "msg3", from: "shir", to: "ryan" }, { idMsg: "msg8", from: "shir", to: "ryan" }],
    chat5: [{ idMsg: "msg7", from: "rotem", to: "elon" }],
    chat6: [{ idMsg: "msg6", from: "elon", to: "ryan" }, { idMsg: "msg9", from: "ryan", to: "elon" }],
    chat7: [{ idMsg: "msg10", from: "rihanna", to: "dwayne johnson" }, { idMsg: "msg11", from: "dwayne johnson", to: "rihanna" }]
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
    var chatExists = getConversationBy2Users(user1, user2);
    if (chatExists === false) {
        chatId += 1;
        dbChats["chat" + chatId] = [user1, user2];
        return "chat" + chatId;
    } else {
        return chatExists;
    }
    // chatId += 1;
    // dbChats["chat" + chatId] = [user1, user2];
    // return "chat" + chatId;
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
    return false
}

/* Get a list of other user for all chats */
export function getOtherUser(user) {
    var users = [] // {chatNum: user}
    for (const [key, value] of Object.entries(dbChats)) {
        if (value[0] === user) {
            users.push([key, value[1]]);
        } else if (value[1] === user) {
            users.push([key, value[0]]);
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
    return getImgByUsername(connectedUser);
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
    if (indexLastMsg !== -1) {
        return msgsList[indexLastMsg]
    }
    return {}
}
