-- http://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
CREATE TABLE comments (
  id serial primary key,
  email varchar(254),
  comment text not null
);

CREATE TABLE quizQuestions (
  id serial primary key,
  question varchar(255) not null,
  correctAnswerId int not null
);

CREATE TABLE quizAnswers (
  id serial primary key,
  questionId int not null,
  answer varchar(255) not null
);
