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
        // TODO: Register the question object here.
        callback(question.question, question.answers);
      }
      else {
        console.log('Some error happened while getting questions');
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/**
 * Function acquiring the correct answer for a given question.
 * @param question_id: The id of the question for which the answer we are asking.
 * @param url: The API endpoint.
 * @param callback: The function to call on completion of the request.
 */
function getCorrectAnswer(question_id, url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status == 200) {
        correctAnswer = JSON.parse(this.responseText);
        // TODO: Insert callback here
      }
      else {
        console.log('Some error happened while getting questions');
      }
    }
  };
  xhttp.open("POST", url, true);
  xhttp.send(question_id);
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
        inputElmnt.value = a;
        li.appendChild(inputElmnt);
        li.appendChild(document.createTextNode(a));
        answerList.appendChild(li);
    }
    form.appendChild(questionContainer);
    form.appendChild(answersContainer);
}

removeJSDisabledMessages();
populateQuestion("One question", ['answer1', 'answer2', 'answer3', 'answer4']);
