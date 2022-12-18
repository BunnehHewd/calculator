/** GRABBERS AND VARIABLEA **/
const buttons = document.querySelectorAll('button[type="button"]');
const currentMath = document.querySelector('.current');
const totalMath = document.querySelector('.after');
let current = "0";
let firstVal = null;
let firstOperator = null;
let secondVal = null;
let secondOperator = null;
let total = "";
let holder = 0;
let key = null;


/** HANDLES DISPLAY **/
function topDisplay() {
    if(current.length > 15) {
        current = current.substring(0,15);
    }
    currentMath.textContent = current;
}

function totalDisplay() {
    if(total.toString().length > 10) {
        total = total.toString().substring(0,10);
    }
    totalMath.textContent = total;
}

function clearDisplay() {
    current = "0";
    firstVal = null;
    firstOperator = null;
    secondVal = null;
    secondOperator = null;
    total = "";
}

function Display() {
    topDisplay(); 
    totalDisplay();
}

/** SPECIAL CHAR FUNCTIONS */
function positiveNegative(x) {
    if(String(x).slice(-1) === '-') {
        current = current.substring(0, current.length - 1);
    } else if(firstVal != null) {
            if(x.length === 0){
                holder = '-';
            } else {
                holder = x * -1;  
            }
            current = firstVal + firstOperator + holder;
        } else if(current == 0) {
            current = '-';
        }
        else {
            current = x * -1;
        }
}

function dot() {
    if(!current.includes('.')) {
        if(current === "0") {
            current = "0.";
        } else {
            current += ".";
        }
    }
}

/** CALC **/
function operator(sign) {
    firstVal = current;
    if(current.toString().charAt(current.length - 1).match(/[0-9]/)) {
        if(firstVal.toString().includes('-')) {
            holder = current.substring(1);
            secondVal = holder.substring(holder.indexOf(`${firstOperator}`) + 1);
        } else {
            secondVal = current.substring(current.indexOf(`${firstOperator}`) + 1);
        }
        calculate(firstVal, firstOperator, secondVal);
    }

    if (total != "") {
        current = total.toString(); 
        totalDisplay();
        total = "";
        firstOperator = null;
    }

    if(String(current).slice(-1) !== sign) { //Adds sign
        if (firstOperator != null) {
            firstVal = current.substring(0, current.length - 1);
            if(sign === '\u00f7') {
               firstOperator = "\u00f7"; 
            } else if (sign === '\u00d7') {
                firstOperator = "\u00d7";
            } else {
                firstOperator = sign;
            }
            current = current.substring(0, current.length - 1);
            current += `${sign}`;
        } else {
            firstVal = current;
            if(sign === '\u00f7') {
                firstOperator = "\u00f7"; 
             } else if (sign === '\u00d7') {
                 firstOperator = "\u00d7";
             } else {
                 firstOperator = sign;
             }
            current += `${sign}`;
        }
    } else if(String(current).slice(-1) === sign) { // Removes sign
        current = current.substring(0, current.length - 1);
        firstVal = null;
        firstOperator = null;
    }
}

function calculate (a, sign, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    console.log(a);
    console.log(b);

    if(sign === '+') {
        total = a + b;
    } else if (sign === '-') {
        total = a - b;
    } else if (sign === '\u00f7') {
        if(b === 0) {
            total = "Nah, son";
        } else {
          total = (a / b);  
        }
        
    } else if (sign === '\u00d7') {
        total = a * b;
    }
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('AC')) {
            clearDisplay();
            Display();
        }
        if(button.classList.contains('C')) {
            current = current.slice(0, -1);
            topDisplay();
            //Display();
        }
        if(button.classList.contains('Neg')) {
            if(firstVal != null) {
                positiveNegative(current.substring(current.indexOf(`${firstOperator}`) + 1));
            } else {
                positiveNegative(current);
            }
            topDisplay();
           // Display();
        }
        if(button.classList.contains('div')) {
            operator('\u00f7');
            topDisplay();
            //Display();
        }
        if(button.classList.contains('Mul')) {
            operator('\u00d7');
            topDisplay();
            //Display();
        }  
        if(button.classList.contains('Sub')) {
            
            operator('-');
            topDisplay();
            //Display();
        }
        if(button.classList.contains('Add')) {
            operator('+');
            topDisplay();
            //Display();
        }
        if(button.classList.contains('Dot')) {
            dot();  
            topDisplay();
            //Display();
        }
        if(button.classList.contains('num')) {
            if(current === "0" || total !== "") {
                clearDisplay();
                current = "";
            }
            if (key != null){
                current += parseInt(key);
            }
            current += button.value;
            Display();
        }
        if(button.classList.contains('Equ')) {
            if(firstVal.toString().includes('-')) {
                holder = current.substring(1);
                secondVal = holder.substring(holder.indexOf(`${firstOperator}`) + 1);
            } else {
                secondVal = current.substring(current.indexOf(`${firstOperator}`) + 1);
            }
            calculate(firstVal, firstOperator, secondVal);
            Display();
        }
    })
})



Display();
