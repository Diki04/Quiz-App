const question = [
  {
    question: "Which is largest animal in the world ?",
    answer: [
      {text: "Shark", correct: false},
      {text: "Blue Whale", correct: true},
      {text: "Elephent", correct: false},
      {text: "Giraffe", correct: false}
    ]
  },
  {
    question: "Which is the Biggest continent in the world ?",
    answer: [
      {text: "Europe", correct: false},
      {text: "Australia", correct: false},
      {text: "Asia", correct: true},
      {text: "America", correct: false}
    ]
  },
  {
    question: "Which is the smallest animal in the world ?",
    answer: [
      {text: "Ant", correct: false},
      {text: "Fleas", correct: false},
      {text: "Fly", correct: false},
      {text: "Amoeba", correct: true}
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct ;
    }
    button.addEventListener("click" , selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if(button .dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play Again!";
  nextButton.style.display = "block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < question.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click" , () =>{
  if(currentQuestionIndex < question.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})

startQuiz();
