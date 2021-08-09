import React, {useState} from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
const emailValidator = require("email-validator");

function UserDetails(props){
    const [validNumber, setValidNumber] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [Fname, setFname] = useState(props.userDetails.Fname)
    const [Lname, setLname] = useState(props.userDetails.Lname)
    const [phoneNumber, setPhoneNumber] = useState(props.userDetails.phoneNumber)
    const [email, setEmail] = useState(props.userDetails.email)

    const handleSubmit = (e) => {
        e.preventDefault(); //stop the submit button from refreshing the page
        const phoneValidity = isValidPhoneNumber(phoneNumber, 'AU') //is the provided phone number valid?
        const emailValidity = emailValidator.validate(email) //is the provided email valid?
        if (!phoneValidity || !emailValidity) { // if either is invalid then...
            setValidEmail(emailValidity)
            setValidNumber(phoneValidity)
        } else { // if neither are invalid then keep existing state and move to next screen
            props.setUserDetails({
                Fname: Fname,
                Lname: Lname,
                phoneNumber: phoneNumber,
                email: email
            })
            props.nextPage()
        }
    }

    return ( // produces a form for the user to fill in their details and fills default values with anything previously set
        <form onSubmit={handleSubmit} className="userDetails">
            <div className="labelledInput">
                <label>Name:</label>
                <div name='name'>
                    <input type="text" name="fname" placeholder='First Name' defaultValue={Fname} onChange={(e) => setFname(e.target.value)}></input>
                    <input type="text" name="lname" placeholder='Last Name' defaultValue={Lname} onChange={(e) => setLname(e.target.value)}></input>
                </div>
            </div>
            <div className={(validNumber?'validPhoneInput':'invalidPhoneInput') + " labelledInput"}>
                <label htmlFor='phone'>Phone:</label>
                <input type='text' name='phone' placeholder='Phone Number' defaultValue={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                <p id='usrPrompt' display='none'>Your phone number is invalid</p>
            </div>
            <div className={(validEmail?'validEmailInput':'invalidEmailInput') + " labelledInput"}>
                <label htmlFor='email'>Email:</label>
                <input type='text' name='email' placeholder='Email' defaultValue={email} onChange={(e) => setEmail(e.target.value)}></input>
                <p id='usrPrompt' display='none'>Your Email address is invalid</p>
            </div>
            <input type='submit' className ="btn btn-dark" value="Continue»"></input>
        </form>
    )
}

export default UserDetails