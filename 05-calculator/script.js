class Calculator {
  
    /**
     * @param {Node} previousOperandElement DOM element to display previous calculation
     * @param {Node} currentOperandElement DOM element to display current operand
     */
    constructor(previousOperandElement, currentOperandElement) {
      this.previousOperandElement = previousOperandElement;
      this.currentOperandElement = currentOperandElement;
      this.MAX_DIGITS = 16;
      this.clearAll();
    }
  
    /* Clear everything */
    clearAll() {
      this.currentOperand = "";
      this.previousOperand = "";
      this.currentResult = undefined;
      this.operation = undefined;
      this.displayingResult = false;
      this.isFirstCalculation = true;
    }
  
    // Clear last character
    clear() {
      // Dont clear result or empty
      if (
        this.currentOperand === undefined ||
        this.currentOperand === this.currentResult
      ) {
        return;
      }
  
      this.currentOperand = this.currentOperand.slice(0, -1);
  
      // Sets display to "0" when user clears all charaters from display
      if (this.currentOperand === "") {
        this.currentOperand = "0";
      }
    }
  
    /**
     * @param {string} inputNumber
     */
    appendNumber(inputNumber) {
      // Dont add additional numbers after the equals signs
      if (this.previousOperand.includes("=")) {
        return;
      }
      // Resets current operand after first calculation
      if (this.displayingResult) {
        this.currentOperand = "";
        this.displayingResult = false;
      }
  
      // Prevents user entering additional decimals
      if (inputNumber === "." && this.currentOperand.includes(".")) {
        return;
      }
  
      // Prevents multiple "0"
      if (this.currentOperand === "0") {
        this.currentOperand = "";
      }
  
      // Adds "0" before a number starting with a decimal
      if (inputNumber === "." && this.currentOperand === "") {
        this.currentOperand = "0.";
      } else {
        // Clamping
        if (this.currentOperand.length > 0) {
          let numberPattern = /\d+/g;
          let digits = this.currentOperand.match(numberPattern).join("");
          if (digits.length < this.MAX_DIGITS) {
            this.currentOperand += inputNumber;
          }
        } else {
          this.currentOperand += inputNumber;
        }
      }
    }
  
    /**
     * @param {string} operation
     */
    selectOperation(operation) {
      // Prevents user entering equals signs with no calculation or after the result is calculated
      if (this.currentOperand && !this.displayingResult) {
        if (operation === "=" && this.previousOperand === "") {
          return;
        } else if (this.previousOperand.includes("=")) {
          return;
        }
  
        // Prevents trailing decimals in display
        if (this.currentOperand.slice(-1) === ".") {
          this.currentOperand = this.currentOperand.slice(0, -1);
          this.updateDisplay();
        }
  
        this.calculate();
        this.operation = operation;
        this.previousOperand += `${this.currentOperandElement.innerText} ${operation} `;
  
        // Clears current operand display the first time an operation is selected
        if (this.isFirstCalculation) {
          this.currentOperand = "";
          this.isFirstCalculation = false;
        } else {
          this.currentOperand = this.currentResult.toString();
          this.displayingResult = true;
        }
      } else {
         // Resets after the equals operation is selected 
        if (this.displayingResult) {
          if (operation !== "=" && this.previousOperand.includes("=")) {
            this.previousOperand = "";
            this.calculate();
            this.operation = operation;
            this.previousOperand += `${this.currentOperandElement.innerText} ${operation} `;
            this.currentOperand = "";
            this.updateDisplay();
          } 
        }
      }
    }
  
    // Adds or removes the minus sign from the current operand
    reverseSign() {
      if (parseFloat(this.currentOperand) > 0) {
        this.currentOperand = parseFloat(this.currentOperand) * -1;
        this.currentOperand = this.currentOperand.toString();
      } else if (this.currentOperand.includes("-")) {
        this.currentOperand = this.currentOperand.substring(1);
      }
    }
  
    // Return result
    calculate() {
      if (this.currentResult === undefined) {
        this.currentResult = parseFloat(this.currentOperand);
      } else {
        let currentCalculation = parseFloat(this.currentOperand);
        switch (this.operation) {
          case "+":
            this.currentResult = this.currentResult + currentCalculation;
            break;
          case "-":
            this.currentResult = this.currentResult - currentCalculation;
            break;
          case "x":
            this.currentResult = this.currentResult * currentCalculation;
            break;
          case "÷":
            // Prevents errors with zero divison
            if (currentCalculation === 0) {
              this.currentResult = "NaN";
            } else {
              this.currentResult = this.currentResult / currentCalculation;
            }
            break;
          default:
            return;
        }
      }
    }
    /**
     * Reformats the result to be displayed in a comma puncuated format
     * @param {number} number
     */
    formatDisplay(number) {
      const stringNumber = number.toString();
      // Splits the current operand into two strings at the decimal point.
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];
      let intergerDisplay;
      // Checks for zero division
      if (isNaN(integerDigits) && this.currentResult !== "NaN") {
        intergerDisplay = "";
      } else {
        // Comma seperated format for interger digits only
        intergerDisplay = integerDigits.toLocaleString("en", {
          maximumFractionDigits: 0,
        });
      }
      // checks for decimal numbers
      if (decimalDigits != null) {
        return `${intergerDisplay}.${decimalDigits}`;
      } else {
        return intergerDisplay;
      }
    }
  
    //Updates the calculater display
    updateDisplay() {
      this.currentOperandElement.innerText = this.formatDisplay(
        this.currentOperand
      );
      this.previousOperandElement.innerText = this.previousOperand;
    }
  }
  
  // Dom element selectors
  
  const numButtons = document.querySelectorAll("[data-number]");
  const operatorButtons = document.querySelectorAll("[data-operator]");
  const plusMinusButton = document.querySelector("[data-negative-positive]");
  const clearButton = document.querySelector("[data-clear-last]");
  const allClearButton = document.querySelector("[data-all-clear]");
  const previousOperand = document.querySelector("[data-previous-operand]");
  const currentOperand = document.querySelector("[data-current-operand]");
  
  const calc = new Calculator(previousOperand, currentOperand);
  
  numButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calc.appendNumber(button.innerText);
      calc.updateDisplay();
    });
  });
  
  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calc.selectOperation(button.innerText);
      calc.updateDisplay();
    });
  });
  
  allClearButton.addEventListener("click", () => {
    calc.clearAll();
    calc.updateDisplay();
  });
  
  clearButton.addEventListener("click", () => {
    calc.clear();
    calc.updateDisplay();
  });
  
  plusMinusButton.addEventListener("click", () => {
    calc.reverseSign();
    calc.updateDisplay();
  });
  
  document.addEventListener("keydown", keyboardControls);
  