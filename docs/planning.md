# First draft of the system architecture, as communicated on Decemeber 6th 2016.

## Overview
* Backend serves JSON
* Frontend creates AJAX calls to backend for comments and quiz

## Endpoints

### /comments
* /php/comments/list(?limit=&page=).php GET
* /php/comments/count.php GET
* /php/comments/new.php POST

### /quiz
* /php/quiz/get(?listOfQuestionSeen=).php GET
* /php/quiz/answer?questionId=&answer=.php GET

## DB backend

* Postgres

Schema:

- Table: comments
  - id: auto
  - email: VARCHAR (optional)
  - comment: TEXT (compulsory)

- Table: quizQuestions
  - id: auto
  - question: VARCHAR (compulsory)
  - correctAnswerId: INT (compulsory)

- Table: answers
  - id: auto
  - questionId: INT(compulsory)
  - answer: VARCHAR (compulsory)
