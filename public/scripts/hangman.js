let blocker         = document.getElementById("blocker");
let popup           = document.getElementById("popup");
let gameStageSource = document.getElementById("gameStageSource");
let gameStageImg    = document.getElementById("gameStageImg");
let gameAlerts      = document.getElementById("gameAlerts");

let cycleNum = 0;
let cycleTimer; // Used to demo the game and handle cancelling the cycle on game start

let phrases;
let phrase;

let goodLetters = [];
let badLetters  = [];

function showRules() {
    blocker.style.visibility = "visible";
    popup.style.visibility   = "visible";
}

function hideRules() {
    blocker.style.visibility = "hidden";
    popup.style.visibility   = "hidden";
}

function changeImage(num) {
    gameStageSource.srcset = "images/hangman/" + num + ".jpg";
    gameStageImg.src = "images/hangman/" + num + ".jpg";
}

function cycle() {
    cycleTimer = setTimeout(function() {

        cycleNum = cycleNum < 12 ? cycleNum + 1 : 0;    // Find next image

        changeImage(cycleNum);  // Update image for user
        cycle();                // Go to next image
    }, 1000);
}

function endCycle() {
    clearTimeout(cycleTimer);   // Stop cycling through images
    cycleNum = 0;               // Reset number of guesses at start of game
}

function displayDashedPhrase() {

    let i;
    let j;

    let toDisplay = "";

    for ( i = 0, j = phrase.length; i<j; i++ ) {

        if ( phrase[i] === " " ) { // Is a space
            // Display " "
            toDisplay += "<span class='space'> </span>";
        } else if ( goodLetters.indexOf(phrase[i]) !== -1 ) { // Has been guessed
            // Display "? ", where ? is the letter
            toDisplay += phrase[i] + " ";
        } else {    // Has not been guessed
            // Display "_ "
            toDisplay += "_ "
        }
    }

    document.getElementById("dashes").innerHTML = toDisplay;
}

function alertUser(msg) {
    gameAlerts.innerHTML = msg;
}

function attemptGuess(charCode) {

    let letter = String.fromCharCode(charCode).toLowerCase();

    if ( goodLetters.indexOf(letter) !== -1 || badLetters.indexOf(letter) !== -1 ) { // If letter is already good or bad
        alertUser("You already guessed this letter!");  // Letter already guessed!
    } else {
        if ( phrase.indexOf(letter) !== -1 ) {

            goodLetters.push(letter);
            displayDashedPhrase(); // Show the remaining dashes in the phrase to the user

            // Check if all letters are revealed
            if ( document.getElementById("dashes").innerHTML.indexOf("_") === -1 ) { // No dashes remain
                // User has won
                winCondition();
            }

        } else {
            badLetters.push(letter);
            document.getElementById("letters").innerHTML += " " + letter + ",";
            alertUser("Letter " + letter + " is not in phrase!");
            cycleNum++;
            changeImage(cycleNum);

            // Check if man is hanged
            if ( cycleNum === 12 ) { // lose condition
                // User has lost
                loseCondition();
            }
        }
    }
}

function checkKey(event) {

    if ( event.keyCode >= 65 && event.keyCode <= 122 ) {
        // Valid key pressed
        alertUser(""); // Clear the user alerts
        attemptGuess( event.keyCode );
    } else {
        // Non A-z value entered
        alertUser("Please only enter alphabetic characters!");
        event.preventDefault();

        // Fix issue where user having "Restart game" focussed, then pressing space will restart the game
        document.getElementById("rulesButton").focus();

        return false;
    }
}

function winCondition() {
    document.removeEventListener("keypress", checkKey); // Stop future inputs
    document.getElementById("gameStageImg").removeEventListener("mouseover", showTwist);
    alertUser("Congratulations, you win!<p>You had " + cycleNum + " wrong guesses.</p>");
    addHighscore( 12 - cycleNum ); // Add this round to the highscores (12 is max score, minus wrong guesses)
    displayHighscores(); // Show the high scores table to the user
}

function loseCondition() {
    document.removeEventListener("keypress", checkKey); // Stop future inputs
    document.getElementById("gameStageImg").removeEventListener("mouseover", showTwist);
    alertUser("You have been hanged! The correct phrase was: " + phrase + ".<p>You used " + cycleNum + " guesses.</p>");
}

function showTwist() {  // Find a un-guessed but correct letter

    let remainingLetters = phrase.split("");

    let i;
    let j;
    let letter;
    let index;

    for (i=0, j=goodLetters.length; i<j; i++) {
        letter = goodLetters[i];

        index = remainingLetters.indexOf(letter);

        if ( index !== -1 ) {
            remainingLetters = remainingLetters.filter(a => a !== letter); // Remove all instances of this letter
        }
    }

    let randomNumber = Math.floor(Math.random() * remainingLetters.length);

    goodLetters.push(remainingLetters[randomNumber]); // Choose a random remaining letter to give as a twist
    displayDashedPhrase(); // Show the remaining dashes in the phrase to the user

    if ( remainingLetters.length === 1 ) {  // User has won
        winCondition();
    }
}

function gameStart() {
    endCycle();               // Stop demoing the game
    changeImage(0);     // Reset image to start of game

    // Reset previous guesses
    goodLetters = [];
    badLetters  = [];

    document.getElementById("restart").innerHTML = "Restart game"; // Update button text

    // Generate a random number between the number of phrases available
    let randomNumber = Math.floor(Math.random() * phrases.length);

    phrase = phrases[randomNumber];

    displayDashedPhrase(); // Show phrase "dashed out"
    document.getElementById("letters").innerHTML = "Guessed letters: ";

    document.addEventListener("keypress", checkKey);
    document.getElementById("gameStageImg").addEventListener("mouseover", showTwist);
}

function displayHighscores() {

    let highscores = JSON.parse(localStorage.getItem("highscores"));

    let hs1 = typeof highscores[0] !== 'undefined' ? highscores[0] : "";
    let hs2 = typeof highscores[1] !== 'undefined' ? highscores[1] : "";
    let hs3 = typeof highscores[2] !== 'undefined' ? highscores[2] : "";
    let hs4 = typeof highscores[3] !== 'undefined' ? highscores[3] : "";
    let hs5 = typeof highscores[4] !== 'undefined' ? highscores[4] : "";

    document.getElementById("hs1").innerText = hs1;
    document.getElementById("hs2").innerText = hs2;
    document.getElementById("hs3").innerText = hs3;
    document.getElementById("hs4").innerText = hs4;
    document.getElementById("hs5").innerText = hs5;

    document.getElementById("highscores").style.display = "block";
}

function addHighscore(newHighscore) {

    console.log(localStorage.getItem("highscores"));

    let highscores;

    if ( localStorage.getItem("highscores") !== null ) {
        highscores = JSON.parse(localStorage.getItem("highscores")); // Convert from string to array
    } else {
        highscores = [];
    }

    highscores.push(newHighscore);                  // Add new score to list
    highscores.sort(function(a, b){ return b-a });    // Sort highscores by value in descending order

    localStorage.setItem("highscores", JSON.stringify(highscores)); // Convert from array to string for localStorage
}

// Prepare phrase list to allow selection of one at random
fetch('https://webprincipals-2fdb3.web.app/phrases.json', { mode: 'no-cors'})
    .then(response => response.json())
    .then(phraseList => phrases = phraseList);

// Fallback in case external JSON cant be read
if ( phrases == null ) { // Undefined when in Chrome
    phrases = [
        "costs an arm and a leg"
        ,"cross that bridge when you come to it"
        ,"cry over spilt milk"
        ,"curiosity killed the cat"
        ,"cut corners"
        ,"devils advocate"
        ,"dont count your chickens before the eggs have hatched"
        ,"dont give up the day job"
        ,"dont put all your eggs in one basket"
        ,"drastic times call for drastic measures"
    ];
}

// Start cycling images to demo the game on page load
cycle();


displayHighscores();
