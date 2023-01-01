// Selectors
let container = document.querySelector(".container");
let gameDifficulty = document.querySelector(".game-info span");
let upcomingWords = document.querySelector(".upcoming-words");
let currentWord = document.querySelector(".current-word");
let inputArea = document.querySelector(".input-area");
let start = document.querySelector(".start");
let timeLeft = document.querySelector(".score div span");
let score = document.querySelector(".got span");
let totalQnumbers = document.querySelector(".totalqnumbers");

// Variables

let gDiff = {
  Normal: 6,
  Mid: 4,
  Advanced: 3,
};

let WordsArr = [
  "Code",
  "programming",
  "Testimonials",
  "Hello",
  "Good",
  "Python",
  "day",
  "Congratulations",
  "superb",
  "unconditional",
  "care",
  "weather",
  "angle",
  "motherboard",
  "mouse",
  "engineering",
  "chemical",
  "powerful",
  "simulation",
];

//setting the time left
let defaultLevel = "Normal";
timeLeft.innerHTML = gDiff[defaultLevel];

//setting total question number at score
totalQnumbers.innerHTML = WordsArr.length;

//prevent paste in the field
inputArea.onpaste = function () {
  return false;
};

// starting the code
start.onclick = function () {
  this.remove();
  inputArea.focus();
  mainFun();
};

//functions
function mainFun() {
  upcomingWords.innerHTML = "";

  //choosing the random word
  let randomWordIndex = Math.floor(Math.random() * WordsArr.length);
  let randomWord = WordsArr[randomWordIndex];

  //setting the current word
  currentWord.innerHTML = randomWord;

  if (WordsArr.length > 0) {
    goNextQuestion();
  } else {
    let result = document.createElement("div");
    result.setAttribute("class", "result");
    let goodSpan = document.createElement("span");
    goodSpan.setAttribute("class", "perfect");
    goodSpan.appendChild(
      document.createTextNode("Perfect, you have nailed it!")
    );
    result.appendChild(goodSpan);
    container.appendChild(result);
  }

  //remove the word from the array
  WordsArr.splice(randomWordIndex, 1);

  // set the upcoming words
  for (let i = 0; i < WordsArr.length; i++) {
    let upcomingSpan = document.createElement("span");
    let upcomingWord = document.createTextNode(WordsArr[i]);
    upcomingSpan.appendChild(upcomingWord);
    upcomingWords.appendChild(upcomingSpan);
  }
  return WordsArr;
}

function goNextQuestion() {
  let interval = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      clearInterval(interval);

      //check the written word
      if (
        inputArea.value.toLowerCase() === currentWord.textContent.toLowerCase()
      ) {
        score.innerHTML++;
        inputArea.value = "";
        timeLeft.innerHTML = gDiff[defaultLevel];
        mainFun();
      } else {
        inputArea.value = "";
        let result = document.createElement("div");
        result.setAttribute("class", "result");
        let badSpan = document.createElement("span");
        badSpan.setAttribute("class", "bad");
        badSpan.appendChild(document.createTextNode("You Lost, Try Again!"));
        result.appendChild(badSpan);
        container.appendChild(result);
      }
    }
  }, 1000);
}
