function filterAllowedTimes (time, bookedSlots) {
    const hour = time.getHours()
    const minute = time.getMinutes()
    //next line performs the logic to check for regular hours prescribed in design breif (later than NOW '&&' between 10am and 4pm)
    const regularHours = (time > (new Date())) && ((10 <= hour && hour <= 15) || (hour == 16 && minute == 0))
    let notExistingBooking = true

    //this line goes through the array of user's previously set timeslots (bookedSlots) and flags any time in that array to not be shown on the calendar
    bookedSlots.forEach((value) => {
        if (Math.round(value.getTime()/1000)===time.getTime()/1000) { //had to remove milliseconds from result as some random number were being added upon booking
            // console.log("comparison match")
            notExistingBooking = false
        }
    })

    return (regularHours && notExistingBooking) //end result is a calendar which allows selection only withing regular hours '&&' not previously booked
}

module.exports = filterAllowedTimes