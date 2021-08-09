const filterAllowedTimes = require("../filterAllowedTime");

// if time is in future, ALWAYS TRUE
test('future valid time', ()=> {
    expect(filterAllowedTimes(new Date(2099, 9, 11, 10,0), [])).toBe(true)
})


// if time is in past, ALWAYS FALSE
test('past valid time', () => {
    expect(filterAllowedTimes(new Date(2001, 9, 11, 10,0), [])).toBe(false)
})


// booking ends on time to be filtered, TRUE
test('proposed booking ends on existing booking start', () => {
    expect(filterAllowedTimes(new Date(2091, 9, 11, 10,0), [new Date(2091, 9, 11, 9,30)])).toBe(true)
})

// booking starts on time to be filtered, FALSE
test('proposed booking disallowed if booking exists at same time', () => {
    expect(filterAllowedTimes(new Date(2091, 9, 11, 10,0), [new Date(2091, 9, 11, 10,0)])).toBe(false)
})