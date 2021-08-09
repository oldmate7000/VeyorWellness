function filterAllowedTimes (time, bookedSlots) {
    const hour = time.getHours()
    const minute = time.getMinutes()
    const regularHours = (time > (new Date())) && ((10 <= hour && hour <= 15) || (hour == 16 && minute == 0))
    let notExistingBooking = true

    // console.log(bookedSlots)
    
    bookedSlots.forEach((value) => {
        // following logs to track errors
        // console.log("comparing " + value + " to " + time)
        // console.log(value.getTime() +' = '+ time.getTime())
        // console.log(value.getTime()===time.getTime())


        if (Math.round(value.getTime()/1000)===time.getTime()/1000) { //had to remove milliseconds from result as some random number were being added upon booking
            // console.log("comparison match")
            notExistingBooking = false
        }
    })

    return (regularHours && notExistingBooking)
}
module.exports = filterAllowedTimes