// Section 0: Variables //
let current;
let answer;
let hint;
let winCounter;
let numGuesses;
let remaining;
let usedLetters;
let usedCorrect;

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

const answerField = document.getElementById('answer-field');
const answerPic = document.getElementById('answer-pic');
const currentWordField = document.getElementById('current-word-field');
const numGuessesField = document.getElementById('num-guesses-field');
const usedLettersField = document.getElementById('used-letters-field');
const winCounterField = document.getElementById('win-counter-field');

// Section 1: Initialize Document //
current = answers[r(0, answers.length)];
answer = current.name;
hint = current.hint;
maskAnswer();
winCounter = 0;
numGuesses = 15;
remaining = answer.length;
usedLetters = [];
usedCorrect = [];
numGuessesField.innerHTML = numGuesses;
winCounterField.innerHTML = winCounter;
usedLettersField.innerHTML = usedLetters;

// Section 2: Functions //
// Listen for Keyboard events
window.addEventListener('keydown', function(e) {
    const guess = e.key;

    if (answer.includes(guess)) {
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] === guess) {
                document.getElementById('current').children[i].innerHTML = guess;
                usedCorrect.push(guess);

                // if (condition) {
                //     remaining--;
                // }

                // console.log(answer.split(guess).length - 1);
                // console.log(getFrequency(answer));
                // console.log(usedCorrect);

                console.clear;
                console.log(guess);
                console.log(countLetters(usedCorrect));

                if (remaining === 0) {
                    victoryScreen();
                    answerPic.setAttribute('src', `/assets/img/${answer}.jpg`);
                }
            }
        }
    } else {
        if (!usedLetters.includes(guess)) {
            usedLetters.push(guess);
            usedLettersField.innerHTML = usedLetters;

            if (numGuesses > 1) {
                numGuesses--;
                numGuessesField.innerHTML = numGuesses;
            } else {
                numGuessesField.innerHTML = 'You Lose! Very Sad!';
            }
        }
    }
});

// Create Masked Answer
function maskAnswer() {
    const maskedAnswer = document.createElement('ul');
    maskedAnswer.setAttribute('id', 'current');

    for (let i = 0; i < answer.length; i++) {
        const letter = document.createElement('li');
        letter.setAttribute('class', 'letter');
        letter.innerHTML = '_';

        currentWordField.appendChild(maskedAnswer);
        maskedAnswer.appendChild(letter);
    }
}

function victoryScreen() {
    answerField.innerHTML = answer;
}

// Generates Random Number
//// Source MDN
function r(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Counts Frequency of a letter in an array
function countLetters(arr) {
    let counts = {};

    for (let i = 0; i < arr.length; i++) {
        let letter = arr[i];
        counts[letter] = counts[letter] ? counts[letter] + 1 : 1;
    }

    return counts;
}

console.log(answer);
console.log(hint);
