 import { userIsExists, getUserPassword } from "../dbHandle/dbHardcoded"
 
 function isExistsNonSyncPassword (isExists, pass, password, result) {
    if (isExists && pass === password) {
        return true;
    }
    return false;
 }

 async function isExistsNonSyncName(isExists, value, user, result) {
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
    var pass = await getUserPassword(user);
    var isExists = await userIsExists(user);
    return isExistsNonSyncPassword(isExists, pass, password, result);
 }

 /* This function checks the validation for each element in the login */ 
 export async function checkValidation(key, value) {
    var result = true;
    var user = document.getElementById("username")
     if (key === "userName") {
        var name = value;
        var isExists = await userIsExists(name);
        await isExistsNonSyncName(isExists, name, user, result);
        
        //if username changed check the password also
        key = "password"
        value = document.getElementById("password").value
     }
     if (key === "password") {
        var pass = document.getElementById("password");
        var correct = await correctPassword(user.value , value);

        if (value === "" || value === " " || !correct) {
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