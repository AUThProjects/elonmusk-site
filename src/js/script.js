/**
 * Remove messages to show when JS is disabled.
 */
function removeJSDisabledMessages() {
  for (el of document.getElementsByClassName('js-disabled-msg')) {
    el.remove();
  }
}
