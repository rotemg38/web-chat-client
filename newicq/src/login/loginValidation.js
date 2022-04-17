 import { userIsExists, getUserPassword } from "../dbHandle/dbHardcoded"
 
 function correctPassword (user, password) {
    if (userIsExists(user) && getUserPassword(user) === password) {
        return true
    }
    return false
 }

 export function checkValidation(key, value) {
    var result = true;
    var user = document.getElementById("username")
     if (key === "userName") {
        if(value === "" || !userIsExists(value)){
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