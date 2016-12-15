# First draft of the system architecture, as communicated on Decemeber 6th 2016.

## Overview
* Backend serves JSON
* Frontend creates AJAX calls to backend for comments and quiz

## Endpoints

### /comments
* /comments(/:page) GET
* /comments/new POST

### /quiz
* /quiz/questions/:listOfQuestionSeen GET
* /quiz/questions/:questionId/answer GET

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
