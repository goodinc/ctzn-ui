
(function() {
  // OPTIONAL: Add an extra class for styling, in browsers that support the placeholder attribute on fields.
  // http://stackoverflow.com/questions/8263891/simple-way-to-check-if-placeholder-is-supported
  if ('placeholder' in document.createElement('input') && 'placeholder' in document.createElement('textarea')) {
    var html = document.getElementsByTagName("html")[0]; html.className += " supports-placeholder";
  }
})();

(function() {
  // OPTIONAL: Add an extra class for styling, in browsers that support the type="date" value on fields.
  // http://stackoverflow.com/questions/18020950/how-to-make-input-type-date-supported-on-all-browsers-any-alternatives#answer-18021130
  var test = document.createElement('input');
  test.setAttribute('type', 'date');
  if (test.type === 'date') {
    var html = document.getElementsByTagName("html")[0]; html.className += " supports-date";
  }
})();
