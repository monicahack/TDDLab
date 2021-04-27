let { ChangeHandler } = require("../src/changehandler");

describe("tests for Change Handler", function() {
test("amountDue is set based on an argument", function(){
  const changeHandler = new ChangeHandler(10)
  expect(changeHandler.amountDue).toEqual(10)
  })

  test("cashTendered is set to zero", function(){
    const changeHandler = new ChangeHandler(0)
    expect(changeHandler.cashTendered).toEqual(0)
  })

  test("Inserting a quarter adds 25", function(){
    const changeHandler = new ChangeHandler()
    changeHandler.insertCoin("quarter")
    expect(changeHandler.cashTendered).toEqual(25)
  })

  test("Inserting a dime adds 10", function(){
    const changeHandler = new ChangeHandler()
    changeHandler.insertCoin("dime")
    expect(changeHandler.cashTendered).toEqual(10)  
  })

  test("Inserting a nickel adds 5", function(){
    const changeHandler = new ChangeHandler()
    changeHandler.insertCoin("quarter")
    expect(changeHandler.cashTendered).toEqual(25)  
  })

  test("Inserting a penny adds 1", function(){
    const changeHandler = new ChangeHandler()
    changeHandler.insertCoin("penny")
    expect(changeHandler.cashTendered).toEqual(1)  
  })

  test("Calling function multiple times continues to add on to the amount", function(){
    const changeHandler = new ChangeHandler()
    changeHandler.insertCoin("quarter")
    expect(changeHandler.cashTendered).toEqual(25)
    changeHandler.insertCoin("nickel")
    expect(changeHandler.cashTendered).toEqual(30)
    changeHandler.insertCoin("penny")
    expect(changeHandler.cashTendered).toEqual(31)
    changeHandler.insertCoin("dime")
    expect(changeHandler.cashTendered).toEqual(41)
  })

  test("Returns true if cashTendered more than amountDue", function(){
    const changeHandler = new ChangeHandler(85)
    changeHandler.cashTendered = 90
    expect(changeHandler.cashTendered >= changeHandler.amountDue).toBe(true)
  })

  test("Returns false if cashTendered less than amountDue", function(){
    const changeHandler = new ChangeHandler(100)
    changeHandler.cashTendered = 80
    expect(changeHandler.cashTendered >changeHandler.amountDue).toBe(false)
  })

  test("Returns true if cashTendered equal to amountDue", function(){
    const changeHandler = new ChangeHandler(50)
    changeHandler.cashTendered = 50
    expect(changeHandler.amountDue === changeHandler.cashTendered).toBe(true)
  })

  test("32 change produces: quarters: 1, dimes: 0, nickels: 1, pennies: 2", function(){
    const changeHandler = new ChangeHandler(80)
    changeHandler.cashTendered = 112
    expect(changeHandler.giveChange(32)).toEqual({quarters: 1, dimes: 0, nickels: 1, pennies: 2})
  })

  test("10 change produces: quarters: 0, dimes: 1, nickels: 0, pennies: 0", function(){
    const changeHandler = new ChangeHandler(80)
    changeHandler.cashTendered = 90
    expect(changeHandler.giveChange(10)).toEqual({quarters: 0, dimes: 1, nickels: 0, pennies: 0})
  })

  test("27 change produces: quarters: 1, dimes: 0, nickels: 0, pennies: 2", function(){
    const changeHandler = new ChangeHandler(80)
    changeHandler.cashTendered = 107
    expect(changeHandler.giveChange(27)).toEqual({quarters: 1, dimes: 0, nickels: 0, pennies: 2})
  })

  test("68 change produces: quarters: 2, dimes: 1, nickels: 2, pennies: 3", function(){
    const changeHandler = new ChangeHandler(80)
    changeHandler.cashTendered = 148
    expect(changeHandler.giveChange(68)).toEqual({quarters: 2, dimes: 1, nickels: 1, pennies: 3})
  })
})
