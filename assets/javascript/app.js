// Questions

var questions = [{
  question: "Which Las Vegas Hotel has been accepting Bitcoin for rooms, food, and drinks since 2014?",
  answers: ["Westgate Las Vegas Resort & Casino", "Palace Station Hotel & Casino", "the D Las Vegas Casino Hotel", "Golden Nugget Las Vegas Hotel & Casino"],
  correctAnswer: "the D Las Vegas Casino Hotel",
  image:"assets/images/dlasvegas.jpg"
}, {
  question: "What is the maximum number of bitcoins that can be mined?",
  answers: ["25 Million", "21 Million", "18 Million", "31 Million"],
  correctAnswer: "21 Million",
  image:"assets/images/mining.jpg"
}, {
  question: "Laszlo Hanyecz made the first real-world transaction by buying what with 10,000 bitcoins?",
  answers: ["a Mont Blanc pen", "cigarettes", "airfare", "pizza"],
  correctAnswer: "pizza",
  image:"assets/images/pizza.jpg"
}, {
  question: 'The worlds first Bitcoin ATM was launched in which city?',
  answers: ["Vancouver", "New York", "Boston", "Toronto"],
  correctAnswer: "Vancouver",
  image:"assets/images/atm.jpg"
}, {
  question: 'When was the Bitcoin whitepaper released?',
  answers: ["June 9th 2004", "May 12st 2006", "October 31st 2008", "August 4th 2009"],
  correctAnswer: "October 31st 2008",
  image:"assets/images/paper.jpg"
}, {
  question: 'What was the starting price for one bitcoin in 2009?',
  answers: [".0001", ".001", ".0008", ".008"],
  correctAnswer: ".008",
  image:"assets/images/chart.jpg"
}, {
  question: "Which was the first handheld device made to run the bitcoin server?",
  answers: ["LG C710", "Motorola Xoom", "Nokia N900", "Sony Xperia E3"],
  correctAnswer: "Nokia N900",
  image:"assets/images/nokia.jpg"
}, {
  question: "The alleged creator of bitcoin, Satoshi Nakamoto is believed to have mined how many bitcoins?",
  answers: ["1,000,000", "3,000,000", "500,000", "2,000,000"],
  correctAnswer: "1,000,000",
  image:"assets/images/satoshi.jpg"
}];


// Define variables for the quiz area and time per question


var QA = $('#quiz-area');
var AmtTime = 30;


// Create click functions 

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


// Define game function

var game = {
  questions:questions,
  currentQuestion:0,
  counter:AmtTime,
  correct:0,
  incorrect:0,

  // to decrement from 30 

  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },

  // In quiz-area we are showing the timer, question, and possible answers in order top to bottom
  // loads question within one Second

  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);

  // runs a loop for displaying the each question and the four possible answers in button layout

    QA.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      QA.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = AmtTime;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    QA.html('<h2>You are out of time!</h2>');
    QA.append('<h3>The Correct Answer is: ' + questions[this.currentQuestion].correctAnswer);
    QA.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    QA.html('<h2>All done, here is how you did!</h2>');
    $('#counter-number').html(game.counter);
    QA.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    QA.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    QA.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    QA.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

// when an answer is clicked this checks if the data-name defined in line 100 above is equal to the correct answer 

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    QA.html('<h2>Nope!</h2>');
    QA.append('<h3>The Correct Answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    QA.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    QA.html('<h2>Correct!</h2>');
    QA.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },

  // to restart game we must reset all the counters to 0

  reset: function(){
    this.currentQuestion = 0;
    this.counter = AmtTime;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};