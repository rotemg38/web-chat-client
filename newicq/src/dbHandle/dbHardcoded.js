
<<<<<<< HEAD
export const dbUsers = {"user1":{password:"123", img: "default_picture.jpg"}};//debug
=======
export const dbUsers = {"user1":{password:"123", img: "profile_pic_check.jpg"},"user2":{password:"123", img: "profile_pic_check.jpg"},"user3":{password:"123", img: "profile_pic_check.jpg"},"user4":{password:"123", img: "profile_pic_check.jpg"}};//debug
>>>>>>> f2205e6d3aa51413f34eb7276453bf3ad895c114
export const dbMsg = {msg1:{text: "hello",date:"09:00"}, msg2:{text: "hello friend",date:"09:10"},msg3:{text: "need to go",date:"09:15"}};
var msgId = 3;
var chatId = 1;
export const dbChats = {chat1:["user1","user2"]};
export const dbMsgInChat = {chat1:[{idMsg: "msg1", from: "user1", to: "user2"}, {idMsg: "msg2", from: "user2", to: "user1"},
{idMsg: "msg3", from: "user1", to: "user2"}]};
<<<<<<< HEAD
=======
export var connectedUser = "user1";
>>>>>>> f2205e6d3aa51413f34eb7276453bf3ad895c114

var msgId = 3
export function addUser(user) {
    dbUsers[user.userName] = {password:user.password, phone: user.phone, img: user.img};
}

export function userIsExists(name) {
    if (dbUsers[name] != null) {
        return true;
    }
    return false
}
<<<<<<< HEAD
export function addConectionToList(user1, user2) {
    var i = 1;
    dbChats.array.forEach(element => {
        i++;   
    });
    dbChats[i] = {first: user1, second: user2};
=======

export function addConectionToList(user1, user2) {
    chatId+=1;
    dbChats["chat"+chatId] = [user1, user2];
    return "chat"+chatId;
}

function generateMsgId(){
    msgId+=1;
    return "msg" + msgId;
>>>>>>> f2205e6d3aa51413f34eb7276453bf3ad895c114
}


export function addMsg(msg){
    var id = generateMsgId();
    dbMsg[id] = msg;
    return id;
}

export function addMsgInChat(idM, idC, from, to){
    if(dbMsgInChat[idC] === undefined){
        dbMsgInChat[idC] = [];
    }
    dbMsgInChat[idC].push({idMsg: idM, from: from, to: to});
}

export function getOtherUserByChatId(idC, user1){
    var users = dbChats[idC];
    if(users[0] === user1)
        return users[1];
    return users[0];
}

export function getMsgById(id){
    return dbMsg[id];
}

export function getMsgsByChatId(idC) {
    var result = [];
    var lstMsg = dbMsgInChat[idC];
    if(lstMsg !== undefined){
        lstMsg.forEach(element => {
            let msg = getMsgById(element.idMsg);
            let elm = Object.assign({}, element, msg);
            result.push(elm);
        });
    }
   // console.log(result.length)
    return result;
<<<<<<< HEAD
}

function generateMsgId(){
    msgId+=1;
    return "msg" + msgId;
}

=======

}
>>>>>>> f2205e6d3aa51413f34eb7276453bf3ad895c114
