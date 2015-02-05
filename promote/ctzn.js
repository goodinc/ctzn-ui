
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

})();
