import { useState } from "react";
import './register.css'
import {addUser} from "../dbHandle/dbHardcoded";

function Register() {
    
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [key]: value}))
    }
    const handleRegister=(event)=>{
        event.preventDefault();
        addUser(inputs);
    }


    return (
        <div className="row align-items-center justify-content-center">
            <div className="form col-lg-6">
                <div className="headline">
                <h1>SignUp</h1>
                </div>
                <form onSubmit={handleRegister}>
                <div className="form-content">
                    <div className="row">
                        <div className="col-lg-12 center-block">
                            <div className="form-group centered">
                                <div className="col-sm-6">
                                    <input type="text" name="userName" className="form-control" placeholder="User Name *" value={inputs.userName || ""} onChange={handleChange}/>
                                </div>
                            </div>
                            <br/>

                            {
                            /* 
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Phone Number *" value=""/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Display Name *" value=""/>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineRadio1">male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                                <label className="form-check-label" htmlFor="inlineRadio2">female</label>
                            </div>
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
                                </div>
                            
                            </div>
                            */
                            }

                            <div className="form-group centered">
                                <div className="col-sm-6">
                                    <input type="text" name="password" className="form-control" placeholder="Password *" value={inputs.password || ""} onChange={handleChange}/>
                                </div>
                            </div>
                            {/*
                            <br/>
                            <div className="form-group centered">
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" placeholder="Confirm Password *" value=""/>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">SignUp</button>
                </div>
                </form>
            </div>
        </div>
    );
  }
  
  export default Register;