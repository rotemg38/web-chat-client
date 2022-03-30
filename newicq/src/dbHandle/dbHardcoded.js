export const dbUsers = {};

export function addUser(user) {
    dbUsers[user.userName] = {password:user.password};

    alert(user.userName + user.password)
}