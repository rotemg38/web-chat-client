 import { userIsExists, getUserPassword } from "../dbHandle/dbHardcoded"
 
 function isExistsNonSyncPassword (isExists, pass, password, result) {
    if (isExists && pass === password) {
        result = true;
    }
    result = false;
 }

 function isExistsNonSyncName(isExists, value, user, result) {
    if(value === "" || !isExists){
        user.classList.remove("is-valid")
        user.classList.add("is-invalid")
        user.setCustomValidity('Wrong username')
        result = false
    }
    else{
        user.classList.remove("is-invalid")
        user.classList.add("is-valid")
        user.setCustomValidity('')
    }
 }
 /* This function checks the validation of the password field  */
 async function correctPassword (user, password) {
    var result = true;
    var pass = getUserPassword(user);
    userIsExists(user).then(isExists => isExistsNonSyncPassword(isExists, pass, password, result));
    return result;

 }

 /* This function checks the validation for each element in the login */ 
 export async function checkValidation(key, value) {
    var result = true;
    var user = document.getElementById("username")
     if (key === "userName") {
         var name = value;
        userIsExists(value).then(isExists => isExistsNonSyncName(isExists, name, user, result));
         //var isExists = await userIsExists(value);
        
        //if username changed check the password also
        key = "password"
        value = document.getElementById("password").value
     }
     if (key === "password") {
        var pass = document.getElementById("password")
        if (value === "" || value === " " || !correctPassword(user.value , value)) {
            pass.classList.remove("is-valid")
            pass.classList.add("is-invalid")
            pass.setCustomValidity('Wrong password')
            return false
        }
        else{
            pass.classList.remove("is-invalid")
            pass.classList.add("is-valid")
            pass.setCustomValidity('')
            return result
        }
     }
 }