import React, {useState} from 'react';
const ReactDOM = require('react-dom');

import BookingDetails from './components/BookingDetails'
import UserDetails from './components/UserDetails';
import Confirmation from './components/Confirmation';

import './index.css';

const availableTypes = ['physio1','chiro1','aroma1'] //mocked from a server

function App(){
    const [sessionDetails, setSessionDetails] = useState({
        typeChosen: false,
        bookingType: '',
        bookingDateTime: null
    })
    const [userDetails, setUserDetails] = useState({
        Fname: '',
        Lname: '',
        phoneNumber: '',
        email: ''
    })
    const [displayComponent, setDisplayComponent] = useState('bookingdetails')
    const [userBookedSlots, setUserBookedSlots] =  useState({})
    // const [availableTypes, setAvailableTypes] = useState(availableTypes) //might change if user is connected to a server?

    function reset() {
        setSessionDetails({
            typeChosen: false,
            bookingType: '',
            bookingDateTime: new Date()
        })
        setUserDetails({
            Fname: '',
            Lname: '',
            phoneNumber: '',
            email: '',
        })
        setDisplayComponent('bookingdetails')
    }

    function confirmAppointment() {
        const nextKey = ((Object.keys(userBookedSlots).length)+1).toString()
        const newBookings = {...userBookedSlots,
            [nextKey] : {sessionDetails: sessionDetails,userDetails: userDetails}
        }
        setUserBookedSlots(newBookings)
        setSessionDetails({
            typeChosen: false,
            bookingType: '',
            bookingDateTime: new Date()
        })
        setUserDetails({
            Fname: '',
            Lname: '',
            phoneNumber: '',
            email: '',
        })
        setDisplayComponent('bookingdetails')
    }

    switch (displayComponent) {
        case 'bookingdetails':
                return (
                <BookingDetails
                    availableTypes = {availableTypes} //needs to know what types of booking are available
                    userBookedSlots = {userBookedSlots} //which slots have already been booked
                    sessionDetails = {sessionDetails} //need to able to load in anything previously set
                    setSessionDetails = {setSessionDetails} //need to be able to set these details for the session being booked
                    nextPage = {() => setDisplayComponent('userdetails')}
                />)

        case 'userdetails':
                return (<UserDetails
                    userDetails = {userDetails} //to load in anything previously set
                    setUserDetails={setUserDetails} // to be able to confirm the details as part of the overall booking
                    nextPage = {() => setDisplayComponent('confirmation')}
                />)

        case 'confirmation':
                return (<Confirmation
                    sessionDetails = {sessionDetails} //to read off the details to the user
                    setDisplayComponent = {setDisplayComponent} //to be able to choose which of the other two screens to go to directly
                    reset = {reset} //to be able to reset and start this booking again
                    confirmAppointment = {confirmAppointment} //needs to be able to lock the slot in a a 'previously booked slot'
                />)
    }
}

ReactDOM.render(<App />, document.getElementById('app'));