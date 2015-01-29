
(function() {

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
      var element = document.getElementById('color');
      if (element) element.className = colors[cursor];
      else setTimeout(update, 10);
    }

    setInterval(update, 3000);
    update();
  }

  startColorAnimation();

})();
