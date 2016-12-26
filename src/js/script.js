/**
 * Validates e-mail address.
 * @param email: The email address to validate.
 * @return true if valid, false if not.
 */
function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return (true)
  return (false)
}

/**
 * Callback called on text change of email inputs.
 * @param e: The event object.
 */
function emailCheckCallback(e) {
  let emailToCheck = this.value;
  if (!validateEmail(emailToCheck)) {
    var msg = document.createTextNode("Invalid e-mail");
    var msgColor = "red";
  }
  else {
    var msg = document.createTextNode("√");
    var msgColor = "green";
  }
  var chkTextDiv = document.getElementById("email-check");
  var span = document.createElement("span");
  span.id = "email-check";
  span.style.color = msgColor;
  span.appendChild(msg);
  if (!chkTextDiv)
    this.parentElement.appendChild(span);
  else
    this.parentElement.replaceChild(span, chkTextDiv);
}

/**
 * Function getting the comments from the backend through AJAX call.
 * @param url: The url to which results are queried from.
 * @param offset: Offset of the results.
 * @param perPage: Results per page.
 * @return The comments returned from the backend.
 */
function getComments(url, offset, perPage) {

  var comments = [
    // {emailAddress: "dummy@example.com", comment: "Some Comment"},
    // {emailAddress: "dummy2@example.com", comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
  ]

  // get the paginated comments with AJAX
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status == 200) {
        comments = JSON.parse(this.responseText);
      }
      else {
        comments = [];
      }
    }
  };
  // xhttp.open("GET", url+"?"+perPage+'?'+offset, true);
  xhttp.open("GET", url, true);
  xhttp.send();

  return comments;
}

/**
 * Function creating and populating the comments table.
 * @param comments: An array of comment objects to show.
 * @return The populated table element.
 */
function createCommentsTable(comments) {
  var commentsTable = document.createElement("table")
  commentsTable.id = "comments-table";
  var titleLine = document.createElement('tr');
  var emailTitle = document.createElement('th');
  emailTitle.appendChild(document.createTextNode('E-mail'));
  titleLine.appendChild(emailTitle);
  var commentTitle=  document.createElement('th')
  commentTitle.appendChild(document.createTextNode('Comment'));
  titleLine.appendChild(commentTitle);
  commentsTable.appendChild(titleLine);
  for (comment of comments) {
    var tableLine = document.createElement('tr');
    var tableEmailColumn = document.createElement('td');
    tableEmailColumn.appendChild(document.createTextNode(comment.emailAddress));
    tableLine.appendChild(tableEmailColumn);
    var tableCommentColumn = document.createElement('td');
    tableCommentColumn.appendChild(document.createTextNode(comment.comment));
    tableLine.appendChild(tableCommentColumn);
    commentsTable.appendChild(tableLine);
  }
  return commentsTable;
}

/**
 * Function displaying the comments or equivalent message if no comments available.
 * @param comments: An array of comment objects to show.
 */
function displayComments(comments) {
  // document.getElementById('comments-js-disabled').remove();
  if (comments.length) {
    commentsTable = createCommentsTable(comments);
    document.getElementById('comments-list-container').appendChild(commentsTable);
  }
  else {
    var emptyListParagraph = document.createElement("p");
    emptyListParagraph.id = 'empty-list'
    emptyListParagraph.appendChild(document.createTextNode("There are no comments currently."));
    var listContainer = document.getElementById('comments-list-container');
    listContainer.appendChild(emptyListParagraph);
  }
}

/**
 * Remove messages to show when JS is disabled.
 */
function removeJSDisabledMessages() {
  for (el of document.getElementsByClassName('js-disabled-msg')) {
    el.remove();
  }
}

// Remove JS disabled messages.
removeJSDisabledMessages();

// Register email validator listener
var emailInputs = document.getElementsByClassName('email-input');
for (emailInput of emailInputs) {
  emailInput.addEventListener('input', emailCheckCallback, false);
}

// Populate the comments section
displayComments(getComments('/php/comments/list.php', null, null));
