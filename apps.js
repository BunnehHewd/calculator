const buttons = document.querySelectorAll('button[type="button"]');
const currentMath = document.querySelector('.current');
const totalMath = document.querySelector('.after');
let current = "0";
let firstVal = null;
let firstOperator = null;
let secondVal = null;
let secondOperator = null;
let total = "";


function topDisplay() {
    if(current.length > 15) {
        current = current.substring(0,15);
    }
    currentMath.textContent = current;
}

function totalDisplay() {
    if(total.length > 10) {
        total = total.substring(0,10);
    }
    totalMath.textContent = total;
}

Display();

function Display() {
    topDisplay(); 
    totalDisplay();
}

function posiNegi(x) {
    current = x * -1;
}

function operator(sign) {
    if(!current.includes(sign)) {
        if (firstOperator != null) {
            firstVal = current;
            if(sign === '\u00f7') {
               firstOperator = "\u00f7"; 
            } else if (sign === '\u00d7') {
                firstOperator = "\u00d7";
            } else {
                firstOperator = sign;
            }
            current = current.replace(/[\u00f7\u00d7+-]/g, `${sign}`);
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
    } else if(current.charAt(current.length - 1) === sign) {
        current = current.replace(sign, "");
        firstOperator = null;
    }
}

function calculate (a, sign, b) {
    a = parseInt(a);
    b = parseInt(b);
    
   // console.log(a);
  //  console.log(b);

    if(sign === '+') {
        total = a + b;
    } else if (sign === '-') {
        total = a - b;
    } else if (sign === '\u00f7') {
        total = (a / b);
    } else if (sign === '\u00d7') {
        total = a * b;
     //   console.log('50 * 2');
     //   console.log(50 * 2);
     //   console.log("why");
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(firstVal);
        console.log(secondVal);
        if(button.classList.contains('AC')) {
            total = "";
            current = "0";
            firstVal = null;
            firstOperator = null;
            secondVal = null;
            secondOperator = null;
            Display();
        }
        if(button.classList.contains('C')) {
            current = current.slice(0, -1);
            Display();
        }
        if(button.classList.contains('Neg')) {
            if(secondVal != null) {
                posiNegi(secondVal);
            } else {
                posiNegi(current);
            }
            Display();
        }
        if(button.classList.contains('div')) {
            firstVal = current;
            operator('\u00f7');
            Display();
        }
        if(button.classList.contains('Mul')) {
            firstVal = current;
            operator('\u00d7');
            Display();
        }  
        if(button.classList.contains('Sub')) {
            firstVal = current;
            operator('-');
            Display();
        }
        if(button.classList.contains('Add')) {
            firstVal = current;
            operator('+');
            Display();
        }
        if(button.classList.contains('Dot')) {
            console.log(current);
            if(!current.includes('.')) {
                if(current === "0") {
                    current = "0.";
                    console.log(current);
                } else {
                    current += ".";
                }
            }
            Display();
        }
        if(button.classList.contains('num')) {
            if(current === "0") {
                current = "";
            }
            current += button.value;
            Display();
        }
        if(button.classList.contains('Equ')) {
            secondVal = current.substring(current.indexOf(`${firstOperator}`) + 1);
            calculate(firstVal, firstOperator, secondVal);
            console.log(secondVal);
          //  console.log(total);
            Display();
        }
    })
})


