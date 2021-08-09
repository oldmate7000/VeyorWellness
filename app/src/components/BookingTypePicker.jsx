import React from 'react'

const bookingTypeExpander = { //mocked data otherwise called from an api
    physio1: {
        title: 'Physiotherapy',
        description: '30 minutes @ $45.00'
    },
    chiro1: {
        title: 'Chiro',
        description: '30 minutes @ $100.00'
    },
    aroma1: {
        title: 'Aroma Therapy',
        description: '30 minutes @ $45.00'
    }
}

function BookingTypePicker(props) {

    const selectType = (type) => {
        props.setBookingType(type)
        props.setTypeChosen(true)
    }

    const reset = () => { //this function is 
        props.setBookingType('')
        props.setTypeChosen(false)
    }

    if(!props.typeChosen) { //if the user hasn't at some point prior chosen the session type for the session in question
        return (
            <div>
                {props.availableTypes.map((value) => { //go over the available types initially called from server
                    return( // and for each one place the information on the page
                        <div className='card' key={value} onClick={()=>{selectType(value)}}>
                            <h5>{bookingTypeExpander[value].title}</h5>
                            <p>{bookingTypeExpander[value].description}</p>
                        </div>
                    )
                })}
            </div>
        )
    } else { //if the user has already chosen session type then...
        return (//display one card with the appropriate information on the session
            <div className='card' onClick={reset}> 
                <h5>{bookingTypeExpander[props.bookingType].title}</h5>
                <p>{bookingTypeExpander[props.bookingType].description}</p>
            </div> 
        )
    }
}
export default BookingTypePicker