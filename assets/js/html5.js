(function() {
  // Make new HTML elements styleable in older browsers
  var elements = ['main', 'section', 'article', 'aside', 'nav', 'header', 'footer', 'figure', 'picture'];
  for (var index = 0; index < elements.length; index++) { document.createElement(elements[index]); }
})();
