import React, { useState } from "react";
import qrcode from '../assets/qrcode.png'


const bookingTypeExpander = { //mocked data otherwise called from api
    physio1: {
        title: "Physiotherapy",
        price: 45.00
    },
    aroma1: {
        title: "Aroma Therapy",
        price: 45.00
    },
    chiro1: {
        title: "Chiro",
        price: 100.00
    }
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return strTime;
  }

function Confirmation(props) {

    const handleReschedule = () => {
        props.setDisplayComponent('bookingdetails')
    }

    return ( //reads off the proposed session details from properties and refelcts them to the user for confirmation
        <div id='confirmation'>
            <div id='bookingDetails'>
                <h2>{bookingTypeExpander[props.sessionDetails.bookingType].title}</h2>
                <h2 >{days[props.sessionDetails.bookingDateTime.getDay()]}, {months[props.sessionDetails.bookingDateTime.getMonth()]} {props.sessionDetails.bookingDateTime.getDate()}, {props.sessionDetails.bookingDateTime.getFullYear()}</h2>
                <h2>{formatAMPM(props.sessionDetails.bookingDateTime)}</h2>
                <div>Veyor Wellness ${bookingTypeExpander[props.sessionDetails.bookingType].price.toFixed(2)}</div>
                <div className='input-group'>
                    <div className='btn btn-dark' onClick={props.reset}>Cancel</div> 
                    <div className='btn btn-dark' onClick={handleReschedule}>Reschedule</div>
                </div>
                <div className='btn btn-light' onClick={props.confirmAppointment}>Schedule another appointment»</div>
            </div>
            <div id='mobileAppCTA'>
                <p>Easily book and manage appointments with Veyor Wellness on your phone.</p>
                <p>Get the mobile app by opening the camera on your phone and scanning this QR code:</p>
                <img src={qrcode}></img>
            </div>
        </div>
    )
}

export default Confirmation