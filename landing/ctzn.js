
(function() {

  // OPTIONAL: Hide redundant labels in browsers that support the placeholder attribute.
  // http://stackoverflow.com/questions/8263891/simple-way-to-check-if-placeholder-is-supported
  function supportsPlaceholder() {
    var test = document.createElement("input");
    return ("placeholder" in test);
  }
  if (supportsPlaceholder()) {
    var html = document.getElementsByTagName("html")[0];
    html.className += " supports-placeholder";
  }


  // OPTIONAL: Use SVG images if the brower supports them.
  // http://toddmotto.com/revisiting-svg-workflow-for-performance-and-progressive-development-with-transparent-data-uris
  // http://css-tricks.com/test-support-svg-img/
  function supportsSvg() {
    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
  }
  if (supportsSvg()) {
    var html = document.getElementsByTagName("html")[0];
    html.className += " supports-svg";
  }

  function startColorAnimation() {
    var colors = [
      'apple',
      'blueberry',
      'strawberry',
      'cucumber',
      'plumb',
      'orange',
      'boysenberry',
      'lime',
      'tangerine'
    ];

    var min = 0;
    var max = colors.length - 1;

    var random = Math.floor(Math.random() * (max - min + 1) + min);
    var cursor = random;

    function update() {
      cursor++;
      if (cursor > colors.length - 1) cursor = 0;
      var main = document.getElementsByTagName('main');
      if (main[0]) main[0].className = colors[cursor];
      else setTimeout(startColorAnimation, 10);
    }

    setInterval(update, 3000);
    update();
  }

  startColorAnimation();

})();
