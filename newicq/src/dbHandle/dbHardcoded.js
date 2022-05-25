
import axios from 'axios'

/* ALL DATABASES THAT ARE REALEVANT FOR THE APP: */

const dbUsers = {
    "rihanna": { displayName: "Rihanna", password: "SingWithMe8", img: "https://pbs.twimg.com/profile_images/1133109643734130688/BwioAwkz.jpg" },
    "elon": { displayName: "Elon Musk", password: "ImRich10", img: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg" },
    "ryan": { displayName: "Ryan Reynolds", password: "FunnyMe5", img: "https://pbs.twimg.com/profile_images/1299844050208555008/7wMQaJRA_400x400.jpg" },
    "shir": { displayName: "Shir", password: "Shir1998", img: "default_picture.jpg" },
    "rotem": { displayName: "Rotem", password: "Rotem100", img: "default_picture.jpg" },
    "dwayne johnson": { displayName: "The Rock", password: "Strong9", img: "https://www.biography.com/.image/t_share/MTgwOTI0NDYwNjQ2Mjc4MjMy/gettyimages-1061959920.jpg" },
    "michael": { displayName: "Michael Jackson", password: "TheKIng3", img: "https://geo-media.beatport.com/image_size/590x404/080c6217-0efa-4323-8b7e-2ad3546a1def.jpg" },
    "obama": { displayName: "Barak Obama", password: "Prsident7", img: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg" },
};
var msgId = 19;
const dbMsg = {
    msg1: { type: "text", text: "Yes we can", date: "09:00", fullDate:"2022-04-25 09:00" },
    msg2: { type: "text", text: "I love the movie Moana", date: "09:10", fullDate:"2022-04-25 09:10" },
    msg3: { type: "image", text: "image", imgSrc: "https://www.cnet.com/a/img/resize/2d182bccac072cff2ae775f47484ee46602f91b4/2021/11/19/73203c5f-bb09-4470-b61a-8383db890b83/free-guy-2020.jpg?auto=webp&fit=crop&height=630&width=1200", date: "09:15" , fullDate:"2022-04-25 09:15" },
    msg4: { type: "text", text: "Love never felt so good", date: "09:15", fullDate:"2022-04-25 09:15"  },
    msg5: { type: "text", text: "shine bright like a diamond", date: "09:20" , fullDate:"2022-04-25 09:20" },
    msg6: { type: "image", text: "image", imgSrc: "https://www.tesla.com/ownersmanual/images/GUID-BEE67A59-6DD7-460C-9C49-0DD47E707A02-online-en-US.jpg", date: "08:00", fullDate:"2022-04-25 08:00"  },
    msg7: { type: "text", text: "When will we meet?", date: "09:34", fullDate:"2022-04-25 09:34" },
    msg8: { type: "text", text: "My favorite movie", date: "09:16", fullDate:"2022-04-25 09:16"  },
    msg9: { type: "text", text: "Love youre car. I have that one too!", date: "08:45" , fullDate:"2022-04-25 08:45" },
    msg10: { type: "text", text: "ראית את האפליקציה של שיר ורותם? ממש יפה", date: "09:46", fullDate:"2022-04-25 09:46"  },
    msg11: { type: "text", text: "כן! וגם עובד מעולה", date: "09:49", fullDate:"2022-04-25 09:49"},
    msg12: { type: "text", text: "And I love this app! Looks good", date: "09:12", fullDate:"2022-04-25 09:12" },
    msg13: { type: "text", text: "And yours app is MY favorite :)", date: "09:18", fullDate:"2022-04-25 09:18" },
    msg14: { type: "text", text: "Thats right. And that why we built this app", date: "09:05", fullDate:"2022-04-25 09:05" },
    msg15: { type: "text", text: "Soon. We need to talk about the future of this app", date: "09:05", fullDate:"2022-04-25 09:05"  },
    msg16: { type: "text", text: "את חייבת לשמוע את השיר המעולה הזה", date: "09:00", fullDate:"2022-04-25 09:00" },
    msg17: { type: "audio", text: "audio", audioSrc:"record.m4a",  date: "09:00", fullDate:"2022-04-25 09:00" },
    msg18: { type: "text", text: "ואת חייבת לראות את הסרטון הקורע הזה ", date: "09:02", fullDate:"2022-04-25 09:02" },
    msg19: { type: "video", text: "video", videoSrc:"cool_video.mov", date: "09:02", fullDate:"2022-04-25 09:02" }
};
var chatId = 8;
const dbChats = {
    chat1: ["shir", "dwayne johnson"], 
    chat2: ["rotem", "obama"], 
    chat3: ["michael", "rihanna"],
    chat4: ["shir", "ryan"], 
    chat5: ["rotem", "elon"], 
    chat6: ["ryan", "elon"], 
    chat7: ["dwayne johnson", "rihanna"], 
    chat8: ["shir", "rotem"]
};

const dbMsgInChat = {
    chat1: [{ idMsg: "msg2", from: "shir", to: "dwayne johnson" }, { idMsg: "msg12", from: "dwayne johnson", to: "shir" }],
    chat2: [{ idMsg: "msg1", from: "obama", to: "rotem" }, { idMsg: "msg14", from: "rotem", to: "obama" }],
    chat3: [{ idMsg: "msg4", from: "michael", to: "rihanna" }, { idMsg: "msg5", from: "rihanna", to: "michael" }],
    chat4: [{ idMsg: "msg3", from: "shir", to: "ryan" }, { idMsg: "msg8", from: "shir", to: "ryan" }, { idMsg: "msg13", from: "ryan", to: "shir" }],
    chat5: [{ idMsg: "msg7", from: "rotem", to: "elon" }, { idMsg: "msg15", from: "elon", to: "rotem" }],
    chat6: [{ idMsg: "msg6", from: "elon", to: "ryan" }, { idMsg: "msg9", from: "ryan", to: "elon" }],
    chat7: [{ idMsg: "msg10", from: "rihanna", to: "dwayne johnson" }, { idMsg: "msg11", from: "dwayne johnson", to: "rihanna" }],
    chat8:[{ idMsg: "msg16", from: "rotem", to: "shir" }, { idMsg: "msg17", from: "rotem", to: "shir" },
    { idMsg: "msg18", from: "shir", to: "rotem" }, { idMsg: "msg19", from: "shir", to: "rotem" }]
};
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

/* Add user to data base */
export async function addUser(user) {
    
    if (user.img === undefined) {
        dbUsers[user.userName] = { password: user.password, phone: user.phoneNumber, displayName: user.displayName, gender: user.gender, img: "default_picture.jpg" };
    } else {
        dbUsers[user.userName] = { password: user.password, phone: user.phoneNumber, displayName: user.displayName, gender: user.gender, img: user.img };
    }
    
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
    if(name == ''){
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
    var respons = await server.post('/invitations', {
        "from": user1,
        "to": user2,
        "server": "localhost:5067"
    });
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
export function getConversation(user) {
    for (const [key, value] of Object.entries(dbChats)) {
        if (value[0] === user || value[1] === user) {
            return key;
        }
    }
}

/* Get chat between 2 users by these users */
export async function getConversationBy2Users(user1, user2) {
    var respons = await server.get('/chats/getchat/'+user1+'/'+user2);
    var data = await respons.data;
    return data;
    // if (data === "") {
    //     return false;
    // } return true;
}

/* Get a list of other user for all chats */
export async function getOtherUser(user) {

    var respons = await server.get('/chats/user/'+user);
    var data = await respons.data;
    console.log(data);
    return data;
    /*
    var users = [] // {chatNum: user}
    for (const [key, value] of Object.entries(dbChats)) {
        if (value[0] === user) {
            users.push([key, value[1]]);
        } else if (value[1] === user) {
            users.push([key, value[0]]);
        }
    }
    return users*/
}


/* Get last message info of a specific chat */
export async function getLastMsg(chatId) {
    var respons = await server.get('/chats/msgs/' + chatId);
    var data = await respons.data;
    console.log(data);
    return data;
}
