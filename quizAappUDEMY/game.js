const  question = document.getElementById("question"); 
const choices = Array.from( document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull=document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
 {
  question: "Inside wich HTML element do we put the JavaScript?",
  choice1:"<script>",
  choice2:"<javascript>",
  choice3:"<js>",
  choice4:"<scripting>",
  answer: 1
 },
 {
  question: "What is the correct syntaxe for referring to an external script called 'xxx.js'?",
  choice1:"<script href='xxx.js'>",
  choice2:"<script name='xxx.js'>",
  choice3:"<script src='xxx.js'>",
  choice4:"<script file='xxx.js'>",
  answer: 3
 },
 {
  question: "How do we write 'hello world' in an alert box?",
  choice1:"msgBox('hello world');",
  choice2:"alertBox('hello world');",
  choice3:"msg('hello world');",
  choice4:"alert('hello world');",
  answer: 4
 }
]
// CONSTANTS 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () =>{
 questionCounter = 0;
 score = 0;
 availableQuestions = [...questions];
 console.log(availableQuestions);
 getNewQuestion ();
};

getNewQuestion = () => { 
 if(availableQuestions.length===0 || questionCounter>= MAX_QUESTIONS){
   localStorage.setItem("mostRecentScore",score);
  //go to the end page 
  return window.location.assign('end.html')
 }
 questionCounter++;
 progressText.innerText =`Question   ${questionCounter}/${MAX_QUESTIONS}`;
 
 //Update  the progress bar
 console.log((questionCounter /  MAX_QUESTIONS ) * 100)
 progressBarFull.style.width = `${ ( questionCounter /  MAX_QUESTIONS )* 100}% `;

 const questionIndex = Math.floor (Math.random() *availableQuestions.length);
 currentQuestion = availableQuestions[questionIndex];
 question.innerText = currentQuestion.question;

 choices.forEach( choice => {
  const number = choice.dataset['number'];
  choice.innerText = currentQuestion['choice' + number];
 });

  availableQuestions.splice(questionIndex,1);

  acceptingAnswers = true;
 };
  choices.forEach(
   choice => {
    choice.addEventListener('click', e => {
     if(!acceptingAnswers) return;

     acceptingAnswers = false ;
     const selectedChoice= e.target;
     const selectedAnswer = selectedChoice.dataset['number'];

     const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect' ;

     if(classToApply === 'correct') { incrementScore(CORRECT_BONUS) };
     selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(
         () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

         },500);
     
    });
   });
incrementScore = num => {
   score+=num;
   scoreText.innerText = score;
}
startGame();
