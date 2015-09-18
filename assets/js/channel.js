
(function() {
  if (document.querySelector && document.addEventListener) {

    var SPACE_KEY = 32;
    var LEFT_ARROW_KEY = 37;
    var RIGHT_ARROW_KEY = 39;

    document.body.addEventListener('keydown', function(e) {

      // If the user is pressing a modifier key, let the browser handle it
      if (e && (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) return;

      var button;
      switch (e.which) {
        case SPACE_KEY:
          button = document.querySelector('.toggle-playback button');
          break;
        case LEFT_ARROW_KEY:
          button = document.querySelector('nav .previous a');
          break;
        case RIGHT_ARROW_KEY:
          button = document.querySelector('nav .next a');
          break;
      }

      if (button) button.click();

    }, false);

  }
})();


(function() {

  function showFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);

    // If fullscreen mode isn’t supported and we’re inside an iframe, open a new window instead.
    } else if (top.location != self.location) {
      window.open(self.location.href, 'ctzn');
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  function fullscreenAvailable() {      
    return (document.documentElement.requestFullscreen ||
            document.documentElement.msRequestFullscreen ||
            document.documentElement.mozRequestFullScreen ||
            document.documentElement.webkitRequestFullscreen ||
            top.location != self.location); // If fullscreen mode isn’t supported and we’re inside an iframe, we’ll open a new window instead.
  }

  function fullscreenActive() {      
    return (document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullscreenElement ||
            document.webkitFullscreenElement);
  }

  var template = document.getElementById('fullscreen-template');
  var exitTemplate = document.getElementById('exit-fullscreen-template');

  // If we have all of the features we need…
  if (fullscreenAvailable() && document.addEventListener && template && exitTemplate) {

    // Show the button
    var button = document.createElement('div');
    button.innerHTML = template.innerHTML;
    template.parentNode.insertBefore(button, template);

    var fullscreen = false; //fullscreenActive();

    function update() {
      if (fullscreen) {
        showFullscreen();
        button.innerHTML = exitTemplate.innerHTML;
      } else {
        exitFullscreen();
        button.innerHTML = template.innerHTML;
      }
    }

    function toggle() {
      fullscreen = !fullscreen;
      update();
    }

    update();

    button.addEventListener('click', function(e) {
      toggle();
      e.preventDefault();
    }, false);
  }

})();


(function() {
  if (document.querySelector && document.addEventListener) {

    var textShowing;
    var currentItem;
    var currentImage;
    var lastItem;
    var timer;

    function getNextItem() {
      var candidate = currentItem;
      if (candidate.nextSibling) {
        candidate = candidate.nextSibling;
        do {
          if (candidate && candidate.nodeType === 1) break;
        } while (candidate = candidate.nextSibling);
      } else {
        candidate = document.querySelector('main ol li');
      }

      if (!candidate || candidate.nodeType !== 1) candidate = document.querySelector('main ol li');
      return candidate;
    }

    function getPreviousItem() {
      var candidate = currentItem;
      if (candidate.previousSibling) {
        candidate = candidate.previousSibling;
        do {
          if (candidate && candidate.nodeType === 1) break;
        } while (candidate = candidate.previousSibling);
      } else {
        candidate = document.querySelector('main ol li:last-child');
      }

      if (!candidate || candidate.nodeType !== 1) candidate = document.querySelector('main ol li:last-child');
      return candidate;
    }

    function nextPage() {
      lastItem = currentItem;
      currentItem = getNextItem();
      updatePage();
    }

    function previousPage() {
      lastItem = currentItem;
      currentItem = getPreviousItem();
      updatePage();
    }

    function updatePage() {
      var items = document.querySelectorAll('main ol li');

      // Show the current item
      if (lastItem) lastItem.className += ' inactive';
      currentItem.className = currentItem.className.replace(/inactive/g, '');

      textShowing = false;
      currentImage = 0;
      next();

      if (lastItem) {
        var current = getPushData(currentItem);
        var last    = getPushData(lastItem);

        for (var prop in current) {
          if (current[prop] !== last[prop]) {
            updatePushData(current, last);
            break;
          }
        }
      }

      preloadItems();

      updateNavigation();
    }

    function getPushData(item) {
      var article = item.querySelector('article');
      return {
        name  : article.getAttribute('data-push-name'),
        body  : article.getAttribute('data-push-body'),
        url   : article.getAttribute('data-push-url'),
        color : article.getAttribute('data-push-color'),
        type  : article.getAttribute('data-slide-type')
      };
    }

    function updatePushData(current, last) {
      var channel = document.querySelector('.push-channel');
      var link = document.querySelector('.push-channel h1 a');
      var description = document.querySelector('.push-channel > header .details p');

      link.innerHTML = current.name;
      link.href      = current.url;
      if (description) description.innerHTML = current.body;
      channel.className = channel.className.replace(last.color, '');
      channel.className += ' ' + current.color;

      if (current.type === 'ctzn') {
        document.body.className = document.body.className.replace(/push-title-only/g, '');
        document.body.className += 'ctzn-title-only';
      } else if (current.type === 'push') {
        document.body.className = document.body.className.replace(/ctzn-title-only/g, '');
        document.body.className += 'push-title-only';
      } else {
        document.body.className = document.body.className.replace(/push-title-only/g, '');
        document.body.className = document.body.className.replace(/ctzn-title-only/g, '');
      }
    }

    function updateNavigation() {
      var next = document.querySelector('nav .next a');
      if (next) next.href = next.href.replace(/page=[0-9]+/, 'page=' + (getItemNumber(getNextItem()) + 1));

      var previous = document.querySelector('nav .previous a');
      if (previous) previous.href = previous.href.replace(/page=[0-9]+/, 'page=' + (getItemNumber(getPreviousItem()) + 1));
    }

    function preloadItems() {
      if (!window.dataItemsCount) window.dataItemsCount = Number(document.querySelector('ol').getAttribute('data-post-count'));

      for (var index = 0; index < window.dataItemsCount; index++) {
        if (nearCurrentSlide(index, window.dataItemsCount)) {
          addItem(index);
        }
      }

      // OPTIONAL: Remove posts that aren’t near the current post, to save memory (and bandwidth when resizing the images/window)
      var posts = document.querySelectorAll('ol li');
      var toRemove = [];
      for (var index = 0; index < posts.length; index++) {
        if (!nearCurrentSlide(getItemNumber(posts[index]), window.dataItemsCount)) {
          toRemove.push(posts[index]);
        }
      }
      for (var index = 0; index < toRemove.length; index++) {
        toRemove[index].parentNode.removeChild(toRemove[index]);
      }
    }

    function addItem(index) {
      if (document.getElementById('item-' + index)) return;

      var template = document.getElementById('item-' + index + '-template');
      var item = document.createElement('li');

      var html = (window.dataItems && window.dataItems[index]) ? dataItems[index] : template.innerHTML;

      // OPTIONAL: Remove the src attribute of the <img> element, if running picturefill (to avoid a double download)
      if (window.picturefill) {
        html = html.replace(/(<\/source[^>]*>[\s]+<img)[\s]+src="[^"]*"/g, function(match, p1) { return p1; });
      }

      item.innerHTML = html;
      item.id = 'item-' + index;
      item.className += ' inactive';

      // Look for the next number up from the item we’re adding (so it will appear in the correct order)
      var target = closestToNumber(index, document.querySelectorAll('ol li'));
      if (target) {
        document.querySelector('ol').insertBefore(item, target);
      } else {
        document.querySelector('ol').appendChild(item);
      }

      // OPTIONAL: Run picturefill on the new images: https://scottjehl.github.io/picturefill/#api
      if (window.picturefill) window.picturefill({ elements: item.getElementsByTagName('img') });
    }

    function getItemNumber(item) {
      return Number(item.id.replace('item-', ''));
    }

    function closestToNumber(needle, haystack) {
      var candidate;
      var candidateNumber;

      for (var index = 0; index < haystack.length; index++) {
        var number = getItemNumber(haystack[index]);
        if (number > needle && (!candidateNumber || number < candidateNumber)) {
          candidateNumber = number;
          candidate = haystack[index];
        }
      }
      return candidate;
    }

    function nearCurrentSlide(index, length) {
      var RANGE = 2;

      var currentIndex = getItemNumber(currentItem);

      // SHIM: Handle the case where one slide is near the end of the array and the other is near the beginning (since the slides run in a loop)
      if (index < RANGE && currentIndex > RANGE) index += length;
      if (currentIndex < RANGE && index > RANGE) index -= length;

      return (Math.abs(index - currentIndex) <= RANGE);
    }

    // Returns a random integer between min (included) and max (excluded)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function rewindTransition(image, style) {
      image.style.transition = "";
      image.style.webkitTransform = style;
      image.style.MozTransform    = style;
      image.style.msTransform     = style;
      image.style.transform       = style;
    }

    function playTransition(image, style, duration) {
      image.style.transition = "all " + duration + "s linear"; // TRICKY: Safari expects “-webkit-transition” or simply “all”
      image.style.webkitTransform = style;
      image.style.MozTransform    = style;
      image.style.msTransform     = style;
      image.style.transform       = style;
    }

    function stopTransition(image) {
      image.style.transition = "";
      image.style.webkitTransform = "";
      image.style.MozTransform    = "";
      image.style.msTransform     = "";
      image.style.transform       = "";
    }

    function animateImage(image, duration) {

      // Only animate the image if it has finished loading
      var ancestor = image;
      while ((ancestor = ancestor.parentElement) && ancestor.nodeName && ancestor.nodeName.toLowerCase() !== 'figure');
      if (ancestor && ancestor.nodeName && ancestor.nodeName.toLowerCase() === 'figure') {

        // An aspect ratio class name is added by the image “onload” handler (setDataAspectRatio)
        if (!(ancestor.className.indexOf( 'wider-aspect-than-viewport') >= 0 ||
              ancestor.className.indexOf('taller-aspect-than-viewport') >= 0)) return;
      }

      var width  = image.naturalWidth;
      var height = image.naturalHeight;
      var animationSpeed = 9; // A larger number will show more of the image at a faster pace
      
      // Wider aspect than viewport
      if ((width / height) > (window.innerWidth / window.innerHeight)) {
        var translateAxis = "translateX";
        var availableImageWidth = window.innerHeight * (width / height);

        // Find how far we can move the image while still covering the screen
        var translateMax = Math.round((availableImageWidth - window.innerWidth) / 2);

        // Start with a value that gets larger the longer the duration and the wider the viewport
        var translateValue = duration * window.innerWidth;
        translateValue = Math.round(translateValue * (animationSpeed / 1000));

        if (translateValue > translateMax) translateValue = translateMax;

      // Taller aspect than viewport
      } else {
        var translateAxis = "translateY";
        var availableImageHeight = window.innerWidth * (height / width);

        // Find how far we can move the image while still covering the screen
        var translateMax = Math.round((availableImageHeight - window.innerHeight) / 2);

        // Start with a value that gets larger the longer the duration and the taller the viewport
        var translateValue = duration * window.innerHeight;
        translateValue = Math.round(translateValue * (animationSpeed / 1000));

        if (translateValue > translateMax) translateValue = translateMax;
      }

      // Choose a random direction (up or down, left or right)
      var translateDirection = getRandomInt(0, 2) ? 1 : -1;
      translateValue = translateValue * translateDirection;

      // Randomly decide to zoom in instead of out
      var scaleDirection = getRandomInt(0, 2);

      // Move the image to the start position
      rewindTransition(image, translateAxis + "(" + translateValue + "px) scale(" + (scaleDirection ? 1.025 : 1) + ")");

      // And then move it to the final position
      setTimeout(function() {
        playTransition(image, translateAxis + "(" + (translateValue * -1) + "px) scale(" + (scaleDirection ? 1 : 1.025) + ")", duration);
      }, 1);

      // Stop the transition if the window changes size
      var throttle;
      function onWindowResize() {
        if (throttle) clearTimeout(throttle);
        throttle = setTimeout(function() {
          stopTransition(image);
        }, 100);
      }
      window.addEventListener('resize', onWindowResize, false);

      // Clean up
      setTimeout(function() {
        window.removeEventListener('resize', onWindowResize, false);
      }, duration * 1000);
    }

    function textDuration(text) {
      var duration = Math.round(text.innerHTML.length / 30);
      if (duration < 1.5) duration = 1.5;
      if (duration > 10) duration = 10;
      return duration;
    }

    function textImageDuration(text) {
      var duration = Math.round(text.innerHTML.length / 60);
      if (duration < 1.5) duration = 1.5;
      if (duration > 3) duration = 3;
      return duration;
    }

    function next() {
      if (timer) window.clearTimeout(timer);

      var duration = 3;
      var nextStep = nextPage;

      var article = currentItem.querySelector('article');
      var text = currentItem.querySelector('.body');
      var images = currentItem.querySelectorAll('figure');

      // If this is the first slide, show the text.
      if (text && !textShowing && currentImage === 0) {
        text.className = text.className.replace(/inactive/g, '');
        textShowing = true;
        if (images.length > 0) nextStep = next;

        // Show the text long enough to be readable
        duration = textDuration(text);

      // …Or if the text is already showing, hide it.
      } else {
        if (text) {
          text.className = text.className.replace(/inactive/g, '');
          text.className += ' inactive';
        }
        textShowing = false;
      }

      // If there are images to show
      if (images.length > 0) {

        // Hide all of the images, except the current one
        // TBD: Make this more efficient, by only doing it on the first loop?
        for (var index = 0; index < images.length; index++) {
          if (images[index] !== images[currentImage]) {
            images[index].className = images[index].className.replace(/inactive/g, '');
            images[index].className += ' inactive';
          }
        }

        // Show the current image
        images[currentImage].className = images[currentImage].className.replace(/inactive/g, '');

        var animationDuration = duration;

        // If this is the first image, and text is showing
        if (currentImage === 0 && text && textShowing) {
          animationDuration = textDuration(text) + textImageDuration(text);
        }

        if (currentImage === 0 && text && !textShowing) {
        } else {
          animateImage(images[currentImage].querySelector('img'), animationDuration);
        }

        // If this image was shown under the text
        if (currentImage === 0 && text && !textShowing) {

          // If there was a lot of text, show the image for a longer amount of time
          duration = textImageDuration(text);
        }

        // If there are more images to show
        if (currentImage + 1 < images.length) {
          nextStep = next;

          // If the text isn’t showing
          if (!textShowing) {

            // Display the next image
            currentImage++;
          }
        }
      }

      if (!paused) {
        timer = setTimeout(nextStep, duration * 1000);
        document.querySelector('.push-channel').className = document.querySelector('.push-channel').className.replace(/paused/g, '');
        document.querySelector('.push-channel').className = document.querySelector('.push-channel').className.replace(/autoplaying/g, '');
        document.querySelector('.push-channel').className += ' autoplaying';
      }
    }

    function closest(element, nodeName) {

      // Special case for SVG <use> elements.
      if (element.nodeName === undefined && element.correspondingUseElement !== undefined) {
        element = element.correspondingUseElement;
      }

      if (element.nodeName.toLowerCase() === nodeName) {
        return element;
      } else if (element.parentNode) {
        return closest(element.parentNode, nodeName);
      }
    }

    document.querySelector('nav').addEventListener('click', function(e) {

      // If the user is pressing a modifier key, let the browser handle it
      if (e && (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) return;

      var item = closest(e.target, 'li');
      if (item) {
        if (timer) clearTimeout(timer);
        if (item.className === 'next') {
          nextPage();
        } else {
          previousPage();
        }

        e.preventDefault();
      }
    }, false);

    var paused;
    function startPlaying() {
      paused = false;
      updatePage();
    }

    function stopPlaying() {
      paused = true;
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      document.querySelector('.push-channel').className += ' paused';
    }

    function togglePlaying() {
      if (paused) {
        startPlaying();
      } else {
        stopPlaying();
      }
    }

    (function() {
      var template = document.getElementById('play-template');
      var button = document.createElement('div');
      button.innerHTML = template.innerHTML;
      template.parentNode.insertBefore(button, template);

      button.addEventListener('click', function(e) {
        togglePlaying();
        e.preventDefault();
      }, false);
    })();

    // Tell the style sheet that the slideshow is running, so it can fit the content to the viewport.
    document.querySelector('html').className += ' fit-viewport';

    (function() {

      // Start with the first item
      var items = document.querySelectorAll('main ol li');
      currentItem = items[0];

      // Hide all of the items
      for (var index = 0; index < items.length; index++) {

        // …except the active item
        if (items[index] !== currentItem) {
          items[index].className += ' inactive';
        }
      }
    })();

    startPlaying();
  }
})();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Periodically retrieve updated list of posts

(function() {
  var updateEvery = 5 * 60; // 5 minutes

  function updateItemsData() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {

      try {
        var count = 0;
        var items = {};
        var regex = /<script type="text\/template" id="item-([0-9]+)-template">((.|\n)*?)<\/script>/g;
        var matches;
        while ((matches = regex.exec(xhr.responseText)) !== null) {
          var id   = matches[1];
          var html = matches[2];
          items[id] = html;
          count++;
        }
        window.dataItems = items;
        window.dataItemsCount = count;
      }
      catch (e) {
        // Fail silently and just let the current push data remain (don't want to interrupt the UX)
        if (console && console.error) console.error('ERROR getting posts via XHR', e);
      }
    });
    xhr.open('GET', window.location.href);
    xhr.send();
  }

  setInterval(updateItemsData, updateEvery * 1000);

  window.updateItemsData = updateItemsData;
})();

