const body = document.body;
const app = document.getElementById("app");
const guesses = document.getElementById("guesses");

const h1 = document.createElement("h1");
h1.innerHTML = "<h3>Guess the number!</h3>";
body.prepend(h1);

const table = app.appendChild(document.createElement("table"));

for (let i = 0; i < 5; i++) {
  const tr = table.appendChild(document.createElement("tr"));
  for (let j = 1; j <= 5; j++) {
    const td = tr.appendChild(document.createElement("td"));
    td.setAttribute("id", "guess" + (i * 5 + j));
    td.textContent = i * 5 + j;
  }
}

// answer is always a random number from 1 - 25
const answer = Math.round(Math.random() * 25);
let guessesCount = 5;
guesses.textContent = guessesCount;

let userGuess;
setTimeout(() => {
  userGuess = Number(prompt("Guess a number between 1 and 25"));
  checkAns();
}, 500);

function checkAns() {
  if (
    userGuess !== null &&
    userGuess <= 25 &&
    userGuess >= 1 &&
    guessesCount > 0 &&
    userGuess !== answer
  ) {
    const option = userGuess < answer ? "higher" : "lower";
    changeBgColor(userGuess, option);
    setTimeout(nextNum, 500);
  } else {
    if (userGuess === answer) {
      changeBgColor(userGuess, null);
      alert("You guessed the number!");
    } else {
      alert(`The answer was: ${answer}`);
    }
  }
}

function nextNum() {
  const option = userGuess < answer ? "higher" : "lower";
  userGuess = Number(
    prompt(
      `Try again, it's ${option} than ${userGuess}.
        You have ${guessesCount} guesses left!`
    )
  );
  guessesCount--;
  guesses.textContent = guessesCount;
  checkAns();
}

function changeBgColor(number, option) {
  if (option === "higher") {
    for (let i = 1; i <= number; i++) {
      document.getElementById("guess" + i).style.backgroundColor = "red";
    }
  } else if (option === "lower") {
    for (let i = 25; i >= number; i--) {
      document.getElementById("guess" + i).style.backgroundColor = "red";
    }
  } else {
    document.getElementById("guess" + number).style.backgroundColor =
      "lightgreen";
  }
}
