
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
  if (document.querySelector && document.addEventListener && document.cloneNode) {

    var textShowing;
    var currentItem;
    var currentImage;
    var lastItem;
    var timer;

    function nextPage() {
      lastItem = currentItem;
      if (currentItem.nextSibling) {
        currentItem = currentItem.nextSibling;
        do {
          if (currentItem && currentItem.nodeType === 1) break;
        } while (currentItem = currentItem.nextSibling)
      } else {
        currentItem = document.querySelector('main ol li');
      }

      if (!currentItem || currentItem.nodeType !== 1) currentItem = document.querySelector('main ol li');

      updatePage();
    }

    function previousPage() {
      lastItem = currentItem;
      if (currentItem.previousSibling) {
        currentItem = currentItem.previousSibling;
        do {
          if (currentItem && currentItem.nodeType === 1) break;
        } while (currentItem = currentItem.previousSibling)
      } else {
        currentItem = document.querySelector('main ol li:last-child');
      }

      if (!currentItem || currentItem.nodeType !== 1) currentItem = document.querySelector('main ol li:last-child');

      updatePage();
    }

    function updatePage() {
      var items = document.querySelectorAll('main ol li');
      for (var index = 0; index < items.length; index++) {
        items[index].className = items[index].className.replace(/inactive/g, '');
        items[index].className += ' inactive';
      }
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
      var description = document.querySelector('.push-channel > header p span');

      link.innerHTML = current.name;
      link.href      = current.url;
      if (description) description.innerHTML = current.body;
      channel.className = channel.className.replace(last.color, '');
      channel.className += ' ' + current.color;

      document.body.className = document.body.className.replace(/push-title-only/g, '');
      document.body.className = document.body.className.replace(/ctzn-title-only/g, '');
      if (current.type === 'ctzn') {
        document.body.className += 'ctzn-title-only';
      } else if (current.type === 'push') {
        document.body.className += 'push-title-only';
      }
    }

    var numPosts = Number(document.querySelector('ol').getAttribute('data-post-count'));
    function preloadItems() {
      for (var index = 0; index < numPosts; index++) {
        if (nearCurrentSlide(index, numPosts)) {
          addItem(index);
        }
      }

      // OPTIONAL: Remove posts that aren’t near the current post, to save memory (and bandwidth when resizing the images/window)
      var posts = document.querySelectorAll('ol li');
      var toRemove = [];
      for (var index = 0; index < posts.length; index++) {
        if (!nearCurrentSlide(getItemNumber(posts[index]), numPosts)) {
          toRemove.push(posts[index]);
        }
      }
      for (var index = 0; index < toRemove.length; index++) {
        toRemove[index].parentNode.removeChild(toRemove[index]);
      }

      // OPTIONAL: Run picturefill on the new images: https://github.com/scottjehl/picturefill
      if (window.picturefill) window.picturefill();
    }

    function addItem(index) {
      if (document.getElementById('item-' + index)) return;

      var template = document.getElementById('item-' + index + '-template');
      var item = document.createElement('li');

      var html = template.innerHTML;

      // OPTIONAL: Remove the src and srcset attributes of the image, if running picturefill (to avoid a double download)
      if (window.picturefill) {
        html = html.replace(/(<\/source[^>]*>[\s]+<img)[\s]+src="[^"]*"/g,    function(match, p1) { return p1; });
        html = html.replace(/(<\/source[^>]*>[\s]+<img)[\s]+srcset="[^"]*"/g, function(match, p1) { return p1; });
      }

      item.innerHTML = html;
      item.id = 'item-' + index;
      item.className += ' inactive';

      // Looking for the next number up from the item we’re adding (so it will appear in the correct order)
      var target = closestToNumber(index, document.querySelectorAll('ol li'));
      if (target) {
        document.querySelector('ol').insertBefore(item, target);
      } else {
        document.querySelector('ol').appendChild(item);
      }
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
        duration = Math.round(text.innerHTML.length / 30);
        if (duration < 1.5) duration = 1.5;
        if (duration > 10) duration = 10;

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
        for (var index = 0; index < images.length; index++) {
          images[index].className = images[index].className.replace(/inactive/g, '');
          images[index].className += ' inactive';
        }
        images[currentImage].className = images[currentImage].className.replace(/inactive/g, '');

        // If this image was shown under the text
        if (currentImage === 0 && text && !textShowing) {

          // If there was a lot of text, show the image for a longer amount of time
          duration = Math.round(text.innerHTML.length / 60);
          if (duration < 1.5) duration = 1.5;
          if (duration > 3) duration = 3;
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

    currentItem = document.querySelector('main ol li');

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

    startPlaying();

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

    startPlaying();
  }
})();
