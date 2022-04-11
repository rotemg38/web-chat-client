 import { userIsExists, getUserPassword } from "../dbHandle/dbHardcoded"
 
 function correctPassword (user, password) {
    if (getUserPassword(user) === password) {
        return true
    }
    return false
 }

 export function checkValidation(key, value) {
    var user = document.getElementById("username")
     if (key === "userName") {
        if(value === "" || !userIsExists(value)){
            user.classList.remove("is-valid")
            user.classList.add("is-invalid")
            user.setCustomValidity('Wrong username')
            return 
        }
        else{
            user.classList.remove("is-invalid")
            user.classList.add("is-valid")
            user.setCustomValidity('')
            return 
        }
     }
     if (key === "password") {
        var pass = document.getElementById("password")
        if (value === "" || value === " " || !correctPassword(user.value , value)) {
            pass.classList.remove("is-valid")
            pass.classList.add("is-invalid")
            pass.setCustomValidity('Wrong password')
            return 
        }
        else{
            pass.classList.remove("is-invalid")
            pass.classList.add("is-valid")
            pass.setCustomValidity('')
            return 
        }
     }
 }