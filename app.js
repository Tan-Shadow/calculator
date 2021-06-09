const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator-display')
const keys = calculator.querySelector('.calculator-keys')


keys.addEventListener('click', event => { 
    if (!event.target.closest('button')) return

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const type = key.dataset.type
    const previousKeyType = calculator.dataset.previousKeyType

    // is this a number key
    // if the data type of the key is number  
    if (type === 'number') {

        // and if the text content of the display is '0'  
        if (displayValue === '0') {
            // then change the text content of the display to the text content of the key that will be pressed
            display.textContent = keyValue
        }
        // and if the data type of the previously typed key is an operator 
        else if (previousKeyType === 'operator') {
            // then replace the text content which has been typed with the text content of the key that will be pressed
            display.textContent = keyValue
        } else {
            // if the text content in the display is not '0' and not an operator then add the next key that is typed besides it 
            display.textContent = displayValue + keyValue
        }

    }
    // is this a operator key
    if (type === 'operator') {
        const operatorKeys = keys.querySelectorAll("[data-type='operator']")
        operatorKeys.forEach(el => el.dataset.state = '')

        key.dataset.state = 'selected'

        calculator.dataset.firstNumber = displayValue 
        calculator.dataset.operator = key.dataset.key 
    }

    if (type === 'equal') {
        // perform a calculation
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        
        display.textContent = calculate(firstNumber, operator, secondNumber)
    }
    if (type === 'clear') display.textContent = 0


    calculator.dataset.previousKeyType = type
})

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseFloat(firstNumber)
    secondNumber = parseFloat(secondNumber)
    
    if (operator === 'divide' && secondNumber === 0) return 'Ask einstein about it!'
    if (operator === 'plus') return firstNumber + secondNumber
    if (operator === 'minus') return firstNumber - secondNumber
    if (operator === 'times') return firstNumber * secondNumber
    if (operator === 'divide') return firstNumber / secondNumber

}
