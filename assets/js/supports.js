
(function() {

  // OPTIONAL: Hide redundant labels in browsers that support the placeholder attribute.
  // http://stackoverflow.com/questions/8263891/simple-way-to-check-if-placeholder-is-supported
  // http://stackoverflow.com/questions/22780534/placeholder-attribute-detected-in-opera-mini-but-not-used
  function supportsPlaceholder() {
    return ('placeholder' in document.createElement('input') && 'placeholder' in document.createElement('textarea'));
  }
  if (supportsPlaceholder()) {
    var html = document.getElementsByTagName("html")[0];
    html.className += " supports-placeholder";
  }

})();
