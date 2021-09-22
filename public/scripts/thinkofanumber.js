// Declare variables in global scope
let actualNumber;
let countGuesses;
let startMsg = "Please enter a number between 1-100";
let numberFound = false; // Used to track whether number has been correctly guessed

let guess   = document.getElementById("guess");
let restart = document.getElementById("restart");
let number  = document.getElementById("number");
let message = document.getElementById("message");

restartGame();          // Start the game

function restartGame() {
    // Generate the first random number between 1-100
    actualNumber = Math.floor(Math.random() * 101);

    message.innerHTML = "Starting game . . .";

    changeBackground("white");
    changeText("black");

    // Reset guesses to 0
    countGuesses = 0;

    // Clear user input
    number.value = "";

    // Ensure user inputs are enabled
    guess.disabled  = false;
    number.disabled = false;

    setTimeout(function() {
        message.innerHTML = startMsg;
    }, 500);
}

function changeBackground(to) {
    message.style.background = to;
}

function changeText(to) {
    message.style.color = to;
}

// User submits a guess
guess.addEventListener("click", function() {

    let userGuess = number.value;
    let msg = ""; // Prepare string that will be displayed

    // Check user input is numeric and within range
    if ( isNaN(userGuess) || userGuess < 1 || userGuess > 100 ) {
        // This is a bad input, let the user know
        message.innerHTML = startMsg;
        changeBackground("white");
        changeText("black");

        // Exit function and allow user to re-enter value

        return;
    }

    if ( userGuess == actualNumber ) {  // User guessed correctly
        numberFound = true;

        // Update user visuals
        changeBackground("green");
        changeText("white");

        // Build string to be displayed
        msg += "<section class='messagePart'>Your guess is correct!</section>";

        // Stop user from continuing to guess
        guess.disabled  = true;
        number.disabled = true;
    } else if ( userGuess > actualNumber ) {  // Guess higher than actual
        msg += "<section class='messagePart'>Your guess is too high</section>";

        if ( (userGuess-30) > actualNumber ) {
            changeBackground("white");
            changeText("black");
        } else {
            changeText("white");

            if ( (userGuess-10) > actualNumber ) {
                changeBackground("blue");
            } else {
                changeBackground("red");
            }
        }
    } else {    // Guess lower than actual
        msg += "<section class='messagePart'>Your guess is too low</section>";

        if ( (parseInt(userGuess)+30) < actualNumber ) {
            changeBackground("white");
            changeText("black");
        } else {
            changeText("white");

            if ( (parseInt(userGuess)+10) < actualNumber ) {
                changeBackground("blue");
            } else {
                changeBackground("red");
            }
        }
    }

    // Keep count of how many guesses made
    countGuesses++;
    let grammar = countGuesses == 1 ? "guess" : "guesses";
    msg += "<section class='messagePart'>You have used " + countGuesses + " " + grammar + "</section>";

    // If number has not been found
    if ( !numberFound ) {
        msg += "<section class='messagePart'>Please guess again</section>";
    }

    // Update the user with visuals
    message.innerHTML = msg;
});

// User clicks reset
restart.addEventListener("click", function() {
    restartGame();
});
