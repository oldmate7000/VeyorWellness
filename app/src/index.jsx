import React from 'react';
const ReactDOM = require('react-dom');

import BookingDetails from './components/BookingDetails'
import UserDetails from './components/UserDetails';
import Confirmation from './components/Confirmation';

import './index.css';

const availableTypes = ['physio1','chiro1','aroma1'] //mocked from a server

// const serverBookedSlots = {
//     physio1: [new Date(2021,8,11,11), new Date(2021,8,11,13,30)],
//     chiro1: [new Date(2021,8,11,12), new Date(2021,8,11,10,30)],
//     aroma1: [new Date(2021,8,11,2), new Date(2021,8,11,2,30)]
// } //potentially useful for future flow

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeChosen: false,
            bookingType: '',
            bookingDateTime: new Date(),
            Fname: '',
            Lname: '',
            phoneNumber: '',
            email: '',
            displayComponent: 'bookingdetails',
            availableTypes: availableTypes, //mocked data
            userBookedSlots: [],
            // serverBookedSlots: serverBookedSlots //future flow
        }
        this.setter = this.setter.bind(this)
        this.reset = this.reset.bind(this)
        this.confirmAppointment = this.confirmAppointment.bind(this)
    }

    reset(){
        this.setState({
            bookingType: '',
            bookingDateTime: new Date(),
            Fname: '',
            Lname: '',
            phoneNumber: 0,
            email: '',
            displayComponent: 'bookingdetails',
        })
    }

    setter(stateLabel, Value){ 
        //this is a method to send to children as a prop such that they can set state in this component
        //would be better refactored as accepting a single object
        this.setState({
            [stateLabel]: Value
        })
    }

    confirmAppointment(){
        const newBookings = this.state.userBookedSlots.concat(this.state.bookingDateTime)
        this.setState({
            typeChosen: false,
            bookingType: '',
            bookingDateTime: new Date(),
            Fname: '',
            Lname: '',
            phoneNumber: '',
            email: '',
            displayComponent: 'bookingdetails',
            availableTypes: availableTypes,
            userBookedSlots: newBookings
        })
    }

    render() {
        switch (this.state.displayComponent) {
            case 'bookingdetails':
                    return (
                    <BookingDetails
                        setter = {this.setter}
                        availableTypes = {this.state.availableTypes} //needs to know what types of booking are available
                        typeChosen = {this.state.typeChosen} //if user has already chosen a type of booking for the session in question
                        bookingType={this.state.bookingType} //what the chosen session type is
                        bookingDateTime={this.state.bookingDateTime} //what time the session starts
                        userBookedSlots = {this.state.userBookedSlots} //which slots have already been booked
                    />)
    
            case 'userdetails':
                    return (<UserDetails
                        setter = {this.setter}
                        givenNumber = {this.state.phoneNumber} //needs to know what number has already been provided
                        givenEmail = {this.state.email} // ... and what email has already been provided
                    />)
    
            case 'confirmation':
                    return (<Confirmation
                        bookingType = {this.state.bookingType} //needs to know which booking type was selected...
                        bookingDateTime = {this.state.bookingDateTime}//... and what time it is
                        setter = {this.setter}
                        reset = {this.reset}
                        confirmAppointment = {this.confirmAppointment} //needs to be able to lock the slot in a a 'previously booked slot'
                    />)
        }
    }
}

ReactDOM.render(<App />, document.getElementById('app'));