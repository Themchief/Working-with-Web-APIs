let currentQuestionIndex = 0 ;
let time =questions.length * 15;
let timerID;


let questionsElement = document.getElementById("questions");
let timerElement =document.getElementById("time");
let choicesElement = document.getElementById("choices");
let submitButton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialElement = document.getElementById("initials");
let feedBackElement = document.getElementById("feedback");

function questionClick(){
   if(this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if(time < 0) {
        time = 0;
    }
    timerElement.textContent = time;
    feedBackElement.textContent = "incorrect"
   } else {

    feedBackElement.textContent = "correct"
   }

   feedBackElement.setAttribute("class","feedback");
   setTimeout(function(){
    feedBackElement.setAttribute("class", "feedback hide")
   }, 1000);


   currentQuestionIndex++;
   if(currentQuestionIndex === questions.length) {
    quizEnd
   } else
   getQuestion();
}



function getQuestion(){
let currentQuestion = questions[currentQuestionIndex];
let titleElement = document.getElementById("question-title");
titleElement.textContent = currentQuestion.title;
choicesElement.innerHTML ="";
currentQuestion.choices.forEach(function(choice, index){
    let choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);
    choiceButton.textContent = `${index + 1}. ${choice}`

    choiceButton.addEventListener("click", questionClick);
    choicesElement.append(choiceButton);
})
}


function clocTick(){
time--;
timerElement.textContent = time;

if(time <= 0){
    quizEnd();
}

}



function startQuiz(){
  let startScreenElement = document.getElementById("start-screen");
  startScreenElement.setAttribute("class", "hide");

  questionsElement.removeAttribute("class");

  timerID =setInterval(clocTick, 1000);

  timerElement.textContent = time;
  getQuestion();
}

function quizEnd(){
clearInterval(timerID)
let endscreenElement = document.getElementById("end-screen");
endscreenElement.removeAttribute("class");
let finalScoreElement = document.getElementById("final-score");
finalScoreElement.textContent = time;
questionsElement.setAttribute("class" , "hide");
}



function saveHighScore(){


}

function checkForEnter(event){


}

startButton.addEventListener("click", startQuiz);


submitButton.addEventListener("click",saveHighScore);

initialElement.addEventListener("keyup", checkForEnter);