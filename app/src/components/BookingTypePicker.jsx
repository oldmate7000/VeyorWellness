import React from 'react'

const bookingTypeExpander = { // using this to expound upond the different types of possible session type
    physio1: 
        (<div>
            <h5>Physiotherapy</h5>
            <p>30 minutes @ $45.00</p>
        </div>),
    chiro1:
        (<div>
            <h5>Chiro</h5>
            <p>30 minutes @ $100.00</p>
        </div>),
    aroma1:
        <div>
            <h5>Aroma Therapy</h5>
            <p>30 minutes @ $45.00</p>
        </div>
}

function BookingTypePicker(props) {

    const selectType = (type) => {
        props.setter('bookingType', type)
        props.setter('typeChosen', true)
    }

    const reset = () => {
        props.setter('bookingType', '')
        props.setter('typeChosen', false)
    }

    if(!props.typeChosen) { //if the user hasn't at some point prior chosen the session type for the session in question
        return (
            <div>
                {props.availableTypes.map((value) => { // for each available type...
                return <div className='card' key={value} onClick={()=>{selectType(value)}}>{bookingTypeExpander[value]}</div> //create a card and fill it with the appropriate info found in bookingTypeExpander
                })}
            </div>
        )
    } else { //if the user has already chosen session type then...
        return (
            <div className='card' onClick={reset}> {bookingTypeExpander[props.bookingType]}</div> //display one card with the appropriate information on the session
        )
    }
}
export default BookingTypePicker