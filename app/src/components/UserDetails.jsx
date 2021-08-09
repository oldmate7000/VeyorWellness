import React from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
const emailValidator = require("email-validator");

class UserDetails extends React.Component{
   constructor(props) {
        super(props)
        this.state = {
            validNumber: true,
            validEmail: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setter = this.setter.bind(this)

   }
    handleSubmit(e) {
        e.preventDefault(); //stop the submit button from refreshing the page
        const phoneValidity = isValidPhoneNumber(this.props.givenNumber, 'AU') //is the provided phone number valid?
        const emailValidity = emailValidator.validate(this.props.givenEmail) //is the provided email valid?
        if (!phoneValidity || !emailValidity) { // if either is invalid then...
            this.setState({ //declare which ones are which
                validNumber: phoneValidity,
                validEmail: emailValidity
            })
        } else { // if neither are invalid then keep existing state and move to next screen
            this.props.setter('displayComponent', 'confirmation')
        }
    }
    
    setter(label, value) {
        this.props.setter(label, value);
    }

    render() {
        return (
            <form className="userDetails" onSubmit={this.handleSubmit}>
                <div className="labelledInput">
                    <label>Name:</label>
                    <div name='name'>
                        <input type="text" name="fname" placeholder='First Name' onChange={(e) => this.setter('Fname', e.target.value)}></input> {/*the setter function is used to set parent state and is described in index.jsx*/}
                        <input type="text" name="lname" placeholder='Last Name' onChange={(e) => this.setter('Lname', e.target.value)}></input>
                    </div>
                </div>
                <div className={(this.state.validNumber?'validPhoneInput':'invalidPhoneInput') + " labelledInput"}>
                    <label htmlFor='phone'>Phone:</label>
                    <input type='text' name='phone' placeholder='Phone Number' defaultValue={this.props.givenNumber} onChange={(e) => this.setter('phoneNumber',e.target.value)}></input>
                    <p id='usrPrompt' display='none'>Your phone number is invalid</p>
                </div>
                <div className={(this.state.validEmail?'validEmailInput':'invalidEmailInput') + " labelledInput"}>
                    <label htmlFor='email'>Email:</label>
                    <input type='text' name='email' placeholder='Email' defaultValue={this.props.givenEmail} onChange={(e) => this.setter('email',e.target.value)}></input>
                    <p id='usrPrompt' display='none'>Your Email address is invalid</p>
                </div>
                <input type="submit" className ="btn btn-dark" value="Submit"></input>
            </form>
        )
    }
    
    
}

export default UserDetails