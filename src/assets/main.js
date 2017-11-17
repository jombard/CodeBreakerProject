let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let code = document.getElementById('code');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(!answer.value) {
        setHiddenFields();
    }

    if(!validateInput(input.value)) {
        return false;
    }

    attempt.value++;

    if(getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (attempt.value > 9) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
    let randomNum = (Math.floor(Math.random() * 9999) + 1).toString();

    while (randomNum.length < 4) {
        randomNum = "0" + randomNum;
    }

    answer.value = randomNum;
    attempt.value = "0";
}

function setMessage(msg) {
    message.innerHTML = msg;
}

function validateInput(p) {
    setMessage("");

    if(p.length === 4) return true;

    setMessage("Guesses must be exactly 4 characters long.");
    return false;
}

function getResults(input) {
    var result = "<div class='row'><div class='col-sm-6'>" + input + "</div><div class='col-sm-6'>";

    var guesses = 0;
    for(var i = 0; i < input.length; i++) {
        if(input[i] === answer.value[i]) {
            guesses++;
            result += "<i class='glyphicon glyphicon-ok'></i>";
        } else if (answer.value.indexOf(input[i]) >= 0) {
            result += "<i class='glyphicon glyphicon-transfer'></i>";
        } else {
            result += "<i class='glyphicon glyphicon-remove'></i>";
        }
    }
    
    result += "</div></div>";
    results.innerHTML += result;

    return guesses === 4;
}

function showAnswer(isWin) {
    code.innerHTML = answer.value;
    code.className += isWin ? " success" : " failure";
}

function showReplay() {
    let guessForm = document.getElementById('guessing-div');
    let replay = document.getElementById('replay-div');

    guessForm.style.display = "none";
    replay.style.display = "block";
}