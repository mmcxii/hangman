// Section 0: Variables //
let current;
let answer;
let hint;
let winCounter;
let numGuesses;
let usedLetters;

const answers = [
    {
        name: 'bourbon',
        hint: 'Sweet Kentucky Whiskey',
    },
    {
        name: 'rye',
        hint: 'Spicy single gain whiskey',
    },
    {
        name: 'scotch',
        hint: 'Neat or on the rocks?',
    },
    {
        name: 'cabernet',
        hint: 'Sauv or Franc?',
    },
    {
        name: 'merlot',
        hint: "I'm not drinking f**king ____!",
    },
    {
        name: 'gin',
        hint: 'Mixes well with tonic and lime',
    },
    {
        name: 'sangiovese',
        hint: 'Fruit forward Italian red',
    },
    {
        name: 'tequila',
        hint: 'Spring break!',
    },
];

const currentWordField = document.getElementById('current-word-field');
const answerField = document.getElementById('answer-field');
const winCounterField = document.getElementById('win-counter-field');
const numGuessesField = document.getElementById('num-guesses-field');
const usedLettersField = document.getElementById('used-letters-field');

// Section 1: Initialize Document //
current = answers[r(0, answers.length)];
answer = current.name;
hint = current.hint;
maskAnswer();
winCounter = 0;
numGuesses = 15;
usedLetters = [];
numGuessesField.innerHTML = numGuesses;
winCounterField.innerHTML = winCounter;

// Section X: Functions //
// Listen for Keyboard events
let addFunctionHere;

// Create Masked Answer
function maskAnswer() {
    maskedAnswer = document.createElement('ul');

    for (let i = 0; i < answer.length; i++) {
        maskedAnswer.setAttribute('id', 'current');
        letter = document.createElement('li');
        letter.setAttribute('class', 'letter');
        if (answer[i] === ' ') {
            maskedAnswer.innerHTML = ' ';
        } else {
            letter.innerHTML = '_';
        }

        currentWordField.appendChild(maskedAnswer);
        maskedAnswer.appendChild(letter);
    }
}

// Generates Random Number
//// Source MDN
function r(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

console.log(answer);
console.log(hint);
