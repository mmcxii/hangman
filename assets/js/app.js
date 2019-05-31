// Possible Answers
const answers = [
    {
        name: 'bourbon',
    },
    {
        name: 'rye',
    },
    {
        name: 'scotch',
    },
];

// Linking to Document
const currentWordField = document.getElementById('current-word-field');
const answerField = document.getElementById('answer-field');
let maskedAnswer = '';
let answer = answers[r(0, answers.length)].name;

const winCounterField = document.getElementById('win-counter-field');
let winCounter = 0;

const numGuessesField = document.getElementById('num-guesses-field');
let numGuesses = 15;

const usedLettersField = document.getElementById('used-letters-field');
let usedLetters = [];

// Initialize Document
numGuessesField.innerHTML = numGuesses;
winCounterField.innerHTML = winCounter;

//// Creates a String of '_' for each letter of answer
for (let i = 0; i < answer.length; i++) {
    maskedAnswer += '_ ';
}
currentWordField.innerHTML = maskedAnswer;

// Generates Random Number
// Source MDN
function r(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
