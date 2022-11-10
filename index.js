// variables
const timer = document.getElementById('timer')
const questionText = document.querySelector('#question');
const scoreCard = document.querySelector('#score-card');
const scoreText = document.querySelector('#score');
const questionCard = document.querySelector('#question-card');
const answerA = document.querySelector('#a');
const answerB = document.querySelector('#b');
const answerC = document.querySelector('#c');
const answerAText = document.querySelector('#answer-a__text');
const answerBText = document.querySelector('#answer-b__text');
const answerCText = document.querySelector('#answer-c__text');
const nextBtn = document.querySelector('#next-btn');
const reloadBtn = document.querySelector('#reload-btn');
let isChecked = false;
let answer = '';
let score = 0;
let currentIndex = 0;
let interval;
let width = 100;
let minute = 1000 * 60 * 5;
timer.style.width = `${width}%`;

// questions base
const questions = [
   {
      questionText: "O'zbekiston Respublikasi poytaxti?",
      answers: ["Toshkent", "Qashqadaryo","Samarqand"],
      isTrue: 'a'
   },
   {
      questionText: "2 x 2 = ?",
      answers: [6,3,4],
      isTrue: 'c'
   },
   {
      questionText: "O'zbekiston Respublikasi poytaxti?",
      answers: ["Qashqadaryo", "Toshkent","Samarqand"],
      isTrue: 'b'
   },
]

const time = () => {
   setInterval(() => {
      width = width - 1 
      timer.style.width = `${width}%` 
   }, minute / 100)
}

// display question
function renderQuestion() {
   questionText.textContent = questions[currentIndex]['questionText'];
   answerAText.textContent = questions[currentIndex]['answers'][0]
   answerBText.textContent = questions[currentIndex]['answers'][1]
   answerCText.textContent = questions[currentIndex]['answers'][2]
   time()
}

const nextQuestion = () => {
   const result = checkedAnswer();
   answerA.checked = false
   answerB.checked = false
   answerC.checked = false

   if(currentIndex == questions.length) {
      clearInterval(interval)
      return
   }

   if(questions[currentIndex].isTrue == result.answer) {
      score++;
   }

   currentIndex++;

   if(currentIndex == questions.length -1) {
      nextBtn.textContent = 'Tugatish'
   }

   if(currentIndex == questions.length){
      scoreCard.style.display = 'block'
      questionCard.style.display = 'none'
      scoreText.textContent = score
      return
   }

   renderQuestion()
}

interval = setInterval(nextQuestion, minute)

nextBtn.addEventListener('click', nextQuestion)

answerA.addEventListener('click', (e) => {
   isChecked = e.target.checked;
   answer = e.target.id
})

answerB.addEventListener('click', (e) => {
   isChecked = e.target.checked;
   answer = e.target.id
})

answerC.addEventListener('click', (e) => {
   isChecked = e.target.checked;
   answer = e.target.id
})

// check answer
function checkedAnswer() {
   return { isChecked, answer };
}

// reload app
reloadBtn.addEventListener('click', (e) => {
   e.preventDefault()
   currentIndex = 0;
   score = 0;
   scoreCard.style.display = 'none';
   questionCard.style.display = 'block';
   renderQuestion(questions)
   clearInterval(interval)
})

renderQuestion()