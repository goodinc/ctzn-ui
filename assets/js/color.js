
// For the promotional site (getctzn.com)

(function() {

  function startColorAnimation() {
    var colors = [
      'apple',
      'blueberry',
      'strawberry',
      'cucumber',
      'plum',
      'orange',
      'boysenberry',
      'lime',
      'tangerine',
      'periwinkle'
    ];

    var min = 0;
    var max = colors.length - 1;

    var random = Math.floor(Math.random() * (max - min + 1) + min);
    var cursor = random;

    var color;

    // Handle the case where the element has a default color
    (function() {
      var element = document.getElementById('color');
      if (element) {
        for (var index = 0; index < colors.length; index++) {
          if (element.className.indexOf(colors[index]) >= 0) {
            color = colors[index];
          }
        }
      }
    })();

    function update() {
      cursor++;
      if (cursor > colors.length - 1) cursor = 0;
      var element = document.getElementById('color');
      if (element) {
        if (element.className.indexOf('animated') < 0) element.className += ' animated';

        // Remove the old color
        if (color) element.className = element.className.replace(color, '');

        // Add the new color
        color = colors[cursor];
        element.className += ' ' + color;
      }
      else setTimeout(update, 10);
    }

    setInterval(update, 3000);
    update();
  }

  startColorAnimation();

})();
