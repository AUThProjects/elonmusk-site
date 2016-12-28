/**
 * Function acquiring one question and its answers from the backend through AJAX call.
 * @param url: The API endpoint.
 * @param callback: The function to call on completion of the request.
 */
function getQuestion(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status == 200) {
        questionObj = JSON.parse(this.responseText);
        currentQuestionObject = questionObj;
        questionsSeen.push(questionObj.question.id);
        callback(questionObj.question.question, questionObj.answers);
      }
      else {
        console.log('Some error happened while getting questions');
      }
    }
  };
  if (questionsSeen.length > 0)
    xhttp.open("GET", url+'?questionsSeen='+questionsSeen.join(','), true);
  else
    xhttp.open("GET", url, true);
  xhttp.send();
}

/**
 * Function acquiring the correct answer for a given question.
 * @param question_id: The id of the question for which the answer we are asking.
 * @param url: The API endpoint.
 * @param callback: The function to call on completion of the request.
 */
function getCorrectAnswer(questionId, userQuizResponse, url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status == 200) {
        response = JSON.parse(this.responseText);
        callback(response.result);
      }
      else {
        console.log('Some error happened while getting questions');
      }
    }
  };
  xhttp.open("GET", url+'?questionId='+questionId+'&answer='+userQuizResponse, true);
  xhttp.send();
}

/**
 * Function populating the page with the question and its answers.
 * @param question: The question.
 * @param answers: The available anwsers to the question.
 */
function populateQuestion(question, answers) {
    var form = document.getElementById('quiz-form');
    var questionContainer = document.createElement('div');
    questionContainer.id = 'question-container';
    questionContainer.innerHTML = '<h3>' + question + '</h3>';
    var answersContainer = document.createElement('div');
    answersContainer.id = 'answers-container';
    var answerList = document.createElement('ul');
    answersContainer.appendChild(answerList);
    for (a of answers) {
        var li = document.createElement('li');
        var inputElmnt = document.createElement('input');
        inputElmnt.type = 'radio';
        inputElmnt.name = 'answer';
        inputElmnt.value = a.id;
        li.appendChild(inputElmnt);
        li.appendChild(document.createTextNode(a.answer));
        answerList.appendChild(li);
    }
    form.appendChild(questionContainer);
    form.appendChild(answersContainer);

}

function answerCallback(isCorrect) {
  if(isCorrect) {
    ++noCorrectAnswers;
  }
  showAnswerFeedback(isCorrect);
  // goto nextquestion
  getQuestion('/php/quiz/get.php', populateQuestion);
}

function showAnswerFeedback(isCorrect) {
  var feedbackContainer = document.getElementById('feedback-container') || document.createElement('div');
  feedbackContainer.id = 'feedback-container';
  var feedbackText = '';
  if (isCorrect)
    feedbackText = "You answered correctly.";
  else
    feedbackText = "Wrong answer.";
  feedbackContainer.innerHTML = '<p>' + feedbackText + '</p>';
  var form = document.getElementById('quiz-form');
  if (!document.getElementById('feedback-container'))
    form.insertBefore(feedbackContainer, form.childNodes[0]);
}

var questionsSeen = [];
var currentQuestionObject = null;
var noCorrectAnswers = 0;

removeJSDisabledMessages();
getQuestion('/php/quiz/get.php', function(question, answers) {
    populateQuestion(question, answers);
    var form = document.getElementById('quiz-form');
    var submitContainer = document.createElement('div');
    form.appendChild(submitContainer);
    var submitBtn = document.createElement('input');
    submitBtn.id= 'submit-btn';
    submitBtn.type = 'submit';
    submitBtn.class = 'form-submit';
    submitContainer.appendChild(submitBtn);
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var userQuizResponse = form.answer.value;
      getCorrectAnswer(currentQuestionObject.question.id, userQuizResponse, '/php/quiz/answer.php', answerCallback);
    });

}
);
