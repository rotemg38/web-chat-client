
export const dbUsers = {"user1":{password:"123", img: "default_picture.jpg"}};//debug
export const dbMsg = {msg1:{text: "hello",date:"09:00"}, msg2:{text: "hello friend",date:"09:10"},msg3:{text: "need to go",date:"09:15"}};
export const dbChats = {chat1:["user1","user2"], chat2: ["user2", "user1"]};
export const dbMsgInChat = {chat1:[{idMsg: "msg1", from: "user1", to: "user2"}, {idMsg: "msg2", from: "user2", to: "user1"},
{idMsg: "msg3", from: "user1", to: "user2"}]};

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
export function addConectionToList(user1, user2) {
    var i = 1;
    dbChats.array.forEach(element => {
        i++;   
    });
    dbChats[i] = {first: user1, second: user2};
}


export function addMsg(msg){
    var id = generateMsgId();
    dbMsg[id] = msg;
    return id;
}

export function addMsgInChat(idM, idC, from, to){
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
    lstMsg.forEach(element => {
        let msg = getMsgById(element.idMsg);
        let elm = Object.assign({}, element, msg);
        result.push(elm);
    });
   // console.log(result.length)
    return result;
}

function generateMsgId(){
    msgId+=1;
    return "msg" + msgId;
}

