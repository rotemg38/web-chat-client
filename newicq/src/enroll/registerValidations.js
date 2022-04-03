import {userIsExists} from "../dbHandle/dbHardcoded";

//this function checks the validation of the password field and the confirmPass field related to each other
const passwordValidation = (pass, confirmPass) => {
    if(pass === undefined || confirmPass === undefined)
        return false;

    if(pass === "" || confirmPass === "")
        return false;
   
    if (pass !== confirmPass) {
       
       return false;

    }
    return true;
} 
 
 
///receive key- the field name we are checking
///and value- the value of the field
export const formValidationByElement = (key, value)=>{
    var result = true;
    var pass = document.getElementById("password");
    var confirmPass = document.getElementById("confirmPass");
    if(key === "password") {
        if(!pass.checkValidity()){
            // document.getElementById("passwordInvalid").innerHTML = pass.validationMessage;
            pass.classList.remove("is-valid");
            pass.classList.add("is-invalid");
            result = false;
            //pass.setCustomValidity('error');
            //return false;
        }else{
            pass.classList.remove("is-invalid");
            pass.classList.add("is-valid");
            //pass.setCustomValidity('')
            //return true;
            
        }
        //after the password is checked, check also the confirmPassword because the password might effect the confirm
        key = "confirmPass";
        value = confirmPass.value;
    } 
    if(key === "confirmPass"){
        if(!(passwordValidation(pass.value, value))){
            confirmPass.classList.remove("is-valid");
            confirmPass.classList.add("is-invalid");
            confirmPass.setCustomValidity('error')
            return false;
        }else{
            confirmPass.classList.remove("is-invalid");
            confirmPass.classList.add("is-valid");
            confirmPass.setCustomValidity('')
            //because- after password check we are checking the confirm, 
            //if the confirm is OK but the password wasnt so we need to return false
            return result;
        }

    } 
    if(key === "userName"){
        var userName = document.getElementById("userName");
        if(userName.value === "" || userIsExists(userName.value)){
            userName.classList.remove("is-valid");
            userName.classList.add("is-invalid");
            userName.setCustomValidity('error')
            return false;
        }else{
            userName.classList.remove("is-invalid");
            userName.classList.add("is-valid");
            userName.setCustomValidity('')
            return true;
        }

    }
    if(key === "phoneNumber"){
        //TODO: add validation checks if neccecary
        return true;
    }

    //to all of the rest fields that only have a "require"- check regulat validation 
    var element = document.getElementById(key);
    if(!element.checkValidity()){ 
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        return false;
    }

    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
}