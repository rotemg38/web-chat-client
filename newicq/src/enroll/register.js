import './register.css'
import { useState } from "react";
import {addUser} from "../dbHandle/dbHardcoded";
import {useNavigate } from 'react-router-dom';
import { formValidationByElement } from './registerValidations';

function Register() {

    const navigate = useNavigate(); 

    const [inputs, setInputs] = useState({});

   
    const handleRegister=(event)=>{
        var form = document.getElementById("registerForm");
        form.classList.add('was-validated')
        //check form validility before submitting
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else{
            //successfuly enrolled- add user and move to the login page
            addUser(inputs);
            navigate("/chats");
        }
    }
    
    //handler for any change in one of the elements
    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
      
        setInputs(values => ({...values, [key]: value}))
        //check the validility of the current changing element
        formValidationByElement(key, value);
    }
   
    return (
        <div className="row align-items-center justify-content-center">
            <div className="form col-lg-10">
                <div className="headline">
                    <h1>SignUp</h1>
                </div>

                <form id="registerForm" className='needs-validation' onSubmit={handleRegister} noValidate>
                <div className="form-content">
                    <div className="row">
                        <div className="col-lg-12 center-block">
                            {/* user name element */}
                            <div className="form-group centered">
                                <div className="form-floating col-sm-7">
                                    <input type="text" id="userName" name="userName" className="form-control" placeholder="User Name" 
                                    value={inputs.userName || ""} onChange={handleChange} required/>
                                    <div id="userNameInvalid" className="invalid-feedback">User Name allready exists or the field is empty.</div>
                                    <label htmlFor="userName">Username</label>
                                </div>
                            </div>

                            <br/>
                            {/* display name element */}
                            <div className="form-group centered">
                                <div className="form-floating col-sm-7">
                                    <input type="text" id="displayName" name="displayName" className="form-control" placeholder="Display Name" 
                                    value={inputs.displayName || ""} onChange={handleChange} required/>
                                    <div id="displayNameInvalid" className="invalid-feedback">Please fill out this field.</div>
                                    <label htmlFor="displayName">Display Name</label>
                                </div>
                            </div>
                            <br/>
                            
                            {
                            /*--------TODO: need to add this elements- phone, gender and photo--------*/}

                            <div className="form-group centered">
                                <div className="form-floating col-sm-7">
                                    <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" placeholder="Phone Number" 
                                    value={inputs.phoneNumber || ""} onChange={handleChange} 
                                    pattern="0[0-9]{2}-?[0-9]{7}" required/>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <div id="phoneNumberInvalid" className="invalid-feedback">Please fill out this field with valid israeli phone number. (in format 0XX-XXXXXXX or XXXXXXXXXX)</div>
                                </div>
                            </div>
                            {/*
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineRadio1">male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                                <label className="form-check-label" htmlFor="inlineRadio2">female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
                                <label className="form-check-label" htmlFor="inlineRadio3">other</label>
                            </div>
                            */}

                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02"/>
                                    
                                </div>
                            
                            </div>
                         
                            
                            {/* password element */}
                            <div className="form-group centered">
                                <div className="form-floating col-sm-7">
                                    <input type="password" id="password" name="password" className="form-control" placeholder="Password" 
                                    value={inputs.password || ""} onChange={handleChange} 
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required/>
                                    <label htmlFor="password">Password</label>
                                    <div id="passwordInvalid" className="invalid-feedback">Please fill out this field- Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.</div>
                                </div>
                            </div>
                          
                            <br/>
                            {/* confirm password element */}
                            <div className="form-group centered">
                                <div className="form-floating col-sm-7">
                                    <input type="password" id="confirmPass" name="confirmPass" className="form-control" placeholder="Confirm Password" 
                                    value={inputs.confirmPass || ""} onChange={handleChange} required/>
                                    <label htmlFor="confirmPass">Confirm password</label>
                                    <div id="confirmPassInvalid" className="invalid-feedback">Please fill out this field same as the password field.</div>
                                </div>
                            </div>
                             

                        </div>
                        <br />
                        
                    </div>

                    <br/>
                    <button type="submit" className="btn btn-outline-primary">SignUp</button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Register;