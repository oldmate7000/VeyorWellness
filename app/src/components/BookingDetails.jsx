import React, { useState } from "react";
import DatePicker from "react-datepicker";
const filterAllowedTimes = require("../helpers/filterAllowedTime");

import BookingTypePicker from "./BookingTypePicker";

function BookingDetails(props) {
    const [typeChosen, setTypeChosen] = useState(props.sessionDetails.typeChosen)
    const [bookingType, setBookingType] = useState(props.sessionDetails.bookingType)
    const [bookingDateTime, setBookingDateTime] = useState(props.sessionDetails.bookingDateTime);
    
    const nextScreen = () => {
        props.setSessionDetails({
            typeChosen: typeChosen,
            bookingType: bookingType,
            bookingDateTime: bookingDateTime
        })
        props.nextPage()
    }

    if(!typeChosen) {
        return ( // if a type hasn't been chosen by the user then we don't want to show the calendar...
            <BookingTypePicker 
                typeChosen={typeChosen} // needs to know if a type has already been chosen
                setTypeChosen = {setTypeChosen} // needs to be able to tell this parent component if a type is chosen
                bookingType={bookingType} // in case a type has been chosen - which one is to be displayed?
                setBookingType={setBookingType} //to set the chosen booking type
                availableTypes={props.availableTypes} // need to know the available types to list off
            />
        )
    } else {
        return (//... but if a type has been chosen then the types need to collapse and the caendar must be shown
            <div className="bookingDetails">
                <BookingTypePicker
                    typeChosen={typeChosen} 
                    setTypeChosen = {setTypeChosen}
                    bookingType={bookingType}
                    setBookingType={setBookingType}
                    availableTypes={props.availableTypes}
                />
                <DatePicker 
                    selected={bookingDateTime}
                    onChange={(date) => setBookingDateTime(date)}
                    placeholderText="Click to select a date" 
                    minDate={new Date()} // don't show any day already past.
                    filterTime = {(date) => {
                        return filterAllowedTimes(date, Object.keys(props.userBookedSlots).map((value => { //below array is what the filter uses to ensure exclusivity of booked slot
                            return (props.userBookedSlots[value].sessionDetails.bookingDateTime) //produces an array from each item in the previously booked slots object...
                        })));
                    }}
                    showTimeSelect
                    dateFormat="Pp"
                />
                <div onClick={nextScreen} className ="btn btn-dark">Continue</div>
            </div>
        )
    }
}

export default BookingDetails