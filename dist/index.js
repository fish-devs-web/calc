"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(`hello`);
const currentLine = document.getElementById('current');
// Digits
const digit0 = document.getElementById('digit0');
const digit1 = document.getElementById('digit1');
const digit2 = document.getElementById('digit2');
const digit3 = document.getElementById('digit3');
const digit4 = document.getElementById('digit4');
const digit5 = document.getElementById('digit5');
const digit6 = document.getElementById('digit6');
const digit7 = document.getElementById('digit7');
const digit8 = document.getElementById('digit8');
const digit9 = document.getElementById('digit9');
const period = document.getElementById('period');
// Clear
const clear = document.getElementById('btn-clear');
digit0.onclick = function () {
    insertDigit('0');
};
digit1.onclick = function () {
    insertDigit('1');
};
digit2.onclick = function () {
    insertDigit('2');
};
digit3.onclick = function () {
    insertDigit('3');
};
digit4.onclick = function () {
    insertDigit('4');
};
digit5.onclick = function () {
    insertDigit('5');
};
digit6.onclick = function () {
    insertDigit('6');
};
digit7.onclick = function () {
    insertDigit('7');
};
digit8.onclick = function () {
    insertDigit('8');
};
digit9.onclick = function () {
    insertDigit('9');
};
clear.onclick = function () {
    currentLine.textContent = '0';
};
function insertDigit(digit) {
    console.log(`You clicked ${digit}`);
    let newText = currentLine.textContent + digit;
    currentLine.textContent = String(Number(newText));
}
//# sourceMappingURL=index.js.map