// Section 0: Variables //
let answer;
let current;
let gameOver;
let hint;
let numGuesses;
let prevAnswer;
let prevAnswer2;
let remaining;
let usedCorrect;
let usedLetters;
let winCounter;

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
        hint: "I'm not drinking f**king ______!",
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
const hintField = document.getElementById('hint-field');
const numGuessesField = document.getElementById('num-guesses-field');
const usedLettersField = document.getElementById('used-letters-field');
const winCounterField = document.getElementById('win-counter-field');

// Section 1: App //
initialSet();

// Listen for Keyboard events
window.addEventListener('keydown', function(e) {
    // Limit actions to letters of the alphabet
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const guess = e.key;
        guessCheck(guess);
    }
});

// Section 2: Functions //

// Main Functions

// Initialize game
function initialSet() {
    // Initialize values
    winCounter = 0;
    current = answers[r(answers.length)];
    answer = current.name;
    hint = current.hint;
    remaining = answer.length;
    numGuesses = Math.round(remaining * 1.5); // Gives more guesses for long words, and fewer guesses for short words
    usedLetters = [];
    usedCorrect = [];
    gameOver = false;

    // Hide aanswer
    maskAnswer();

    // Set HTML
    winCounterField.innerHTML = winCounter;
    numGuessesField.innerHTML = numGuesses;
    usedLettersField.innerHTML = usedLetters;
}

// On-Click Functions

// Shows the hint
function showHint() {
    hintField.innerHTML = hint;
}

function reset() {
    // Ensures a different answer each time
    prevAnswer2 = prevAnswer;
    prevAnswer = current;
    while (
        answers.indexOf(prevAnswer) === answers.indexOf(current) ||
        answers.indexOf(prevAnswer2) === answers.indexOf(current)
    ) {
        current = answers[r(answers.length)];
    }

    // Reset values (not win counter)
    usedLetters = [];
    usedCorrect = [];
    answer = current.name;
    hint = current.hint;
    remaining = answer.length;
    numGuesses = Math.round(remaining * 1.5);
    answerPic.removeAttribute('src');

    // Resets win counter if the game is over
    if (gameOver) {
        gameOver = false;
        winCounter = 0;
        winCounterField.innerHTML = winCounter;
    }

    // Reset HTML
    numGuessesField.innerHTML = numGuesses;
    usedLettersField.innerHTML = usedLetters;
    currentWordField.innerHTML = '';
    hintField.innerHTML = '';
    answerField.innerHTML = 'Next Question!';

    // Hide new answer
    maskAnswer();
}

// Background Functions

// Check Guess
function guessCheck(g) {
    // If the guess is correct...
    if (answer.includes(g)) {
        // Reveals correct letter(s)
        for (let i = 0; i < answer.length; i++) {
            // Update page
            if (answer[i] === g) {
                document.getElementById('current').children[i].innerHTML = g;
            }
        }

        // Stores correct guesses, and decriments remaining letters by the number of occurences
        // (only first time per letter)
        if (!usedCorrect.includes(g)) {
            usedCorrect.push(g);
            remaining -= answer.split(g).length - 1;
        }

        // Reveals picture, hint, and name when all letters are guessed
        if (remaining === 0) {
            victoryScreen();
        }

        // If the guess is incorrect...
    } else {
        if (!usedLetters.includes(g)) {
            // Update page
            usedLetters.push(g);
            usedLettersField.innerHTML = usedLetters;

            // Decriment remaining guesses
            if (numGuesses > 1) {
                numGuesses--;
                numGuessesField.innerHTML = numGuesses;

                // If user is out of guesses end the game
            } else {
                loserScreen();
            }
        }
    }
}

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

// Displays information on victory
function victoryScreen() {
    winCounter++;
    winCounterField.innerHTML = winCounter;
    answerField.innerHTML = answer;
    hintField.innerHTML = hint;
    answerPic.setAttribute('src', `assets/img/${answer}.jpg`);
}

// Displays information on loss
function loserScreen() {
    numGuessesField.innerHTML = 'You Lose! Very Sad!';
    answerField.innerHTML = answer;
    hintField.innerHTML = hint;
    answerPic.setAttribute('src', `assets/img/${answer}.jpg`);
    gameOver = true;
}

// Generates Random Number
function r(max) {
    return Math.floor(Math.random() * max);
}
