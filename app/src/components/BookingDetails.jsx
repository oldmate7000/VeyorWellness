import React, { useState } from "react";
import DatePicker from "react-datepicker";
const filterAllowedTimes = require("../helpers/filterAllowedTime");

import BookingTypePicker from "./BookingTypePicker";

function BookingDetails(props) {
    const [startDate, setStartDate] = useState();
    
    const nextScreen = () => {
        props.setter('bookingDateTime', startDate)
        props.setter('displayComponent', 'userdetails')
    }

    if(!props.typeChosen) {
        return (
            <BookingTypePicker 
                bookingType={props.bookingType}
                setter={props.setter}
                availableTypes = {props.availableTypes}
                typeChosen = {props.typeChosen}
            />
        )
    } else {
        return (
            <div className="bookingDetails">
                <BookingTypePicker
                    bookingType={props.bookingType}
                    setter={props.setter}
                    availableTypes = {props.availableTypes}
                    typeChosen = {props.typeChosen}
                />
                <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Click to select a date" 
                    minDate={new Date()}
                    filterTime = {(date) => {
                        return filterAllowedTimes(date, props.userBookedSlots);
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