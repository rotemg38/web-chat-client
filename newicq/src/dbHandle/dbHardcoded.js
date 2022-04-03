export const dbUsers = {};
export const dbMsg = {};
export const dbChats = {};
export const dbMsgInChat = {};

export function addUser(user) {
    dbUsers[user.userName] = {password:user.password};
}

export function userIsExists(name) {
    if (dbUsers[name] != null) {
        return true;
    }
    return false
}