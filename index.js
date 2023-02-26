 class Calculator {
    constructor(displayText, entryText) {
        this.entryText = entryText
        this.displayText = displayText
        this.clear()

    }
    clear() {
        this.entry = ''
        this.display = 'Basic-Calculator'
        this.operation = undefined
        
    }
    delete() {
        this.entry = this.entry.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.entry.includes('.'))
            return
        this.entry = this.entry.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.entry === '') return
        if (this.display !== '') {
            this.compute()
        }
        this.operation = operation
        this.display = this.entry
        this.entry = ''

    }
    power() {
        let x
        const current=parseFloat(this.entry)
        if (this.entry === '') return
        if (this.entry !== '') {
            x=Math.pow(current,2)
        }
        this.entry=x
    }

    root(){
        let x
        const current=parseFloat(this.entry)
        if (this.entry === '') return
        if (this.entry !== '') {
            x=Math.sqrt(current)
        }
        this.entry=x
    }
    compute() {
        let computation
        const prev = parseFloat(this.display)
        const current = parseFloat(this.entry)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case 'x':
                computation = prev * current
                break
            default:
                return

        }
        this.entry = computation
        this.operation = undefined
        this.display = ''

    }

    

    getDisplay(number) {
        const StringNumber = number.toString()
        const integerNumber = parseFloat(StringNumber.split('.')[0])
        const decimalNumber = (StringNumber.split('.')[1])
        let intDisplay
        if (isNaN(integerNumber)) {
            intDisplay = ''
        }
        else {
            intDisplay = integerNumber.toLocaleString('en-IN', {
                maximumFractionDigits: 0
            })
        }
        if (decimalNumber != null) {
            return `${intDisplay}.${decimalNumber}`
        }
        else {
            return intDisplay
        }
    }
    updateDisplay() {
        this.entryText.innerText = this.getDisplay(this.entry)
        
        if (this.operation != null) {
            this.displayText.innerText = `${this.getDisplay(this.display)} ${this.operation}`
        }
        else {
            this.displayText.innerText = 'Basic-Calculator'
        }

    }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operations = document.querySelectorAll('[data-operation]')
const power = document.querySelector('[data-power]')
const equals = document.querySelector('[data-equals]')
const del = document.querySelector('[data-delete]')
const clear = document.querySelector('[data-clear]')
const root = document.querySelector('[data-root]')
const entryText = document.querySelector('[data-entry]')
const displayText = document.querySelector('[data-display]')

const calculator = new Calculator(displayText, entryText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

power.addEventListener('click', ()=>{
    let x=calculator.power()
    calculator.updateDisplay()
    
})

root.addEventListener('click',()=>{
    let x=calculator.root()
    calculator.updateDisplay()
})
operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
    displayText.innerText='Basic-Calculator'

})

clear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
del.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
