const nonNumeric = /[^0-9.]/;

const currentLine = document.getElementById("current") as HTMLElement;
const previousLine = document.getElementById("ans") as HTMLElement;
let pendingOperation: mathOperation | undefined;

// Digits
const digit0Btn = document.getElementById("digit0") as HTMLButtonElement;
const digit1Btn = document.getElementById("digit1") as HTMLButtonElement;
const digit2Btn = document.getElementById("digit2") as HTMLButtonElement;
const digit3Btn = document.getElementById("digit3") as HTMLButtonElement;
const digit4Btn = document.getElementById("digit4") as HTMLButtonElement;
const digit5Btn = document.getElementById("digit5") as HTMLButtonElement;
const digit6Btn = document.getElementById("digit6") as HTMLButtonElement;
const digit7Btn = document.getElementById("digit7") as HTMLButtonElement;
const digit8Btn = document.getElementById("digit8") as HTMLButtonElement;
const digit9Btn = document.getElementById("digit9") as HTMLButtonElement;
const periodBtn = document.getElementById("period") as HTMLButtonElement;

digit0Btn.onclick = () => {
    insertDigit("0");
};
digit1Btn.onclick = () => {
    insertDigit("1");
};
digit2Btn.onclick = () => {
    insertDigit("2");
};
digit3Btn.onclick = () => {
    insertDigit("3");
};
digit4Btn.onclick = () => {
    insertDigit("4");
};
digit5Btn.onclick = () => {
    insertDigit("5");
};
digit6Btn.onclick = () => {
    insertDigit("6");
};
digit7Btn.onclick = () => {
    insertDigit("7");
};
digit8Btn.onclick = () => {
    insertDigit("8");
};
digit9Btn.onclick = () => {
    insertDigit("9");
};
periodBtn.onclick = () => {
    insertDigit(".");
};

// Functions
const clearBtn = document.getElementById("btn-clear") as HTMLButtonElement;
const backspaceBtn = document.getElementById("backspace") as HTMLButtonElement;
// events
clearBtn.onclick = () => {
    currentLine.textContent = "0";
    previousLine.textContent = "";
    unsetCal();
};
backspaceBtn.onclick = () => {
    removeDigit();
};

// Math operations
const additionBtn = document.getElementById("plus") as HTMLElement;
const subtractionBtn = document.getElementById("minus") as HTMLElement;
const multiplicationBtn = document.getElementById("times") as HTMLElement;
const divisionBtn = document.getElementById("divide") as HTMLElement;
const equalBtn = document.getElementById("equals") as HTMLElement;
const squareBtn = document.getElementById("square") as HTMLElement;
const squareRootBtn = document.getElementById("root") as HTMLElement;

// events
additionBtn.onclick = () => {
    cacheOperation(mathOperation.addition);
};
subtractionBtn.onclick = () => {
    cacheOperation(mathOperation.subtraction);
};
multiplicationBtn.onclick = () => {
    cacheOperation(mathOperation.multiplication);
};
divisionBtn.onclick = () => {
    cacheOperation(mathOperation.division);
};
squareBtn.onclick = () => {
    cacheOperation(mathOperation.square);
    doTheMath();
};
squareRootBtn.onclick = () => {
    cacheOperation(mathOperation.squareRoot);
    doTheMath();
};
equalBtn.onclick = () => {
    doTheMath();
};

// Others
const displayCachedOpe = document.getElementById(
    "currentOperation"
) as HTMLElement;

function insertDigit(digit: string) {
    let newText = currentLine.textContent + digit;
    if (digit === ".") {
        if (currentLine.textContent.includes(".")) {
            console.warn(`Ignoring period`);
        } else {
            currentLine.textContent = String(newText);
        }
    } else {
        currentLine.textContent = String(Number(newText));
    }
}

function removeDigit() {
    console.log(`Removing last digit`);
    currentLine.textContent = currentLine.textContent.slice(0, -1);
    if (currentLine.textContent === "" || currentLine.textContent === "-") {
        currentLine.textContent = "0";
    } else if (!currentLine.textContent.endsWith(".")) {
        currentLine.textContent = String(Number(currentLine.textContent));
    }
}

function cacheOperation(toDo: mathOperation) {
    console.log(`Sending operation to cache`);
    previousLine.textContent = currentLine.textContent;
    currentLine.textContent = String(Number(0));
    pendingOperation = toDo;
    displayCachedOpe.textContent = toDo;
}

function doTheMath() {
    console.log(`Doing the math`);
    let firstNumber = Number(previousLine.textContent);
    let secondNumber = Number(currentLine.textContent);
    let answer = 0;
    switch (pendingOperation) {
        case mathOperation.addition:
            answer = firstNumber + secondNumber;
            previousLine.textContent = "";
            currentLine.textContent = String(answer);
            unsetCal();
            break;
        case mathOperation.subtraction:
            answer = firstNumber - secondNumber;
            previousLine.textContent = "";
            currentLine.textContent = String(answer);
            unsetCal();
            break;
        case mathOperation.multiplication:
            answer = firstNumber * secondNumber;
            previousLine.textContent = "";
            currentLine.textContent = String(answer);
            unsetCal();
            break;
        case mathOperation.division:
            if (secondNumber === 0) {
                console.error(`Attempt of division by zero`);
                break;
            }
            answer = firstNumber / secondNumber;
            previousLine.textContent = "";
            currentLine.textContent = String(answer);
            unsetCal();
            break;
        case mathOperation.square:
            answer = firstNumber ** 2;
            previousLine.textContent = "";
            currentLine.textContent = String(answer);
            unsetCal();
            break;
        case mathOperation.squareRoot:
            answer = Math.sqrt(firstNumber);
            previousLine.textContent = "";
            currentLine.textContent = String(answer);
            unsetCal();
            break;
        case undefined:
            break;
        default:
            currentLine.textContent = "Operation not supported";
            previousLine.textContent = "";
            pendingOperation = undefined;
            unsetCal();
            break;
    }
}

enum mathOperation {
    addition = "+",
    subtraction = "-",
    multiplication = "*",
    division = "/",
    square = "^2",
    squareRoot = "square",
}

function unsetCal() {
    pendingOperation = undefined;
    displayCachedOpe.textContent = "";
}

currentLine.oninput = (e) => {
    if (e instanceof InputEvent) {
        if (e.data === "+") {
            cleanNumbers();
            cacheOperation(mathOperation.addition);
        } else if (e.data === "-") {
            cleanNumbers();
            cacheOperation(mathOperation.subtraction);
        } else if (e.data === "*") {
            cleanNumbers();
            cacheOperation(mathOperation.multiplication);
        } else if (e.data === "/") {
            cleanNumbers();
            cacheOperation(mathOperation.multiplication);
        } else if (e.data === ".") {
            if (currentLine.textContent.includes(".")) {
            }
        } else if (e.inputType === "insertParagraph") {
            console.log("enter detected");
            cleanNumbers();
            doTheMath();
        } else {
            console.log(e);
            cleanNumbers();
        }
    }
};

function cleanNumbers() {
    console.log(`Cleaning the things`);

    let onlyText = currentLine.textContent.replace(nonNumeric, "");
    onlyText = onlyText.trim();
    currentLine.textContent = String(Number(onlyText));
}
