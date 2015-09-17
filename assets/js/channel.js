
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

      // Show the current item
      currentItem.className = currentItem.className.replace(/transition-out/g, '');
      currentItem.className = currentItem.className.replace(/inactive/g, '');

      // Hide the previously active item, after a short delay (so it can transition out)
      if (lastItem) {
        lastItem.className += ' transition-out';

        setTimeout(function() {
          if (lastItem) {
            lastItem.className = lastItem.className.replace(/transition-out/g, '');
            if (lastItem !== currentItem) lastItem.className += ' inactive';
          }
        }, 100);
      }

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

    function animateImage(image, duration) {
      console.log('animateImage');

      var width = image.naturalWidth;
      var height = image.naturalHeight;

      console.log('image.offsetWidth: ' + image.offsetWidth);
      console.log('image.offsetHeight: ' + image.offsetHeight);
      console.log('image.naturalWidth: ' + image.naturalWidth);
      console.log('image.naturalHeight: ' + image.naturalHeight);
      console.log('window.innerWidth: ' + window.innerWidth);
      console.log('window.innerHeight: ' + window.innerHeight);

      // Wider aspect than viewport
      if ((width / height) > (window.innerWidth / window.innerHeight)) {
        translateAxis = "translateX";
        var availableImageWidth = window.innerHeight * (width / height);
        console.log('availableImageWidth: ' + availableImageWidth);
        translateValue = Math.round((availableImageWidth - window.innerWidth) / 2);

        console.log('wider than viewport');
        console.log('translateValue: ' + translateValue);

      // Taller aspect than viewport
      } else {
        translateAxis = "translateY";
        var availableImageHeight = window.innerWidth * (height / width);
        console.log('availableImageHeight: ' + availableImageHeight);
        translateValue = Math.round((availableImageHeight - window.innerHeight) / 2);

        console.log('taller than viewport');
        console.log('translateValue: ' + translateValue);
      }

      translateDestination = translateValue * -1;

      image.style.transition = "";
      image.style.webkitTransform = translateAxis + "(" + translateValue + "px)";
      image.style.MozTransform    = translateAxis + "(" + translateValue + "px)";
      image.style.msTransform     = translateAxis + "(" + translateValue + "px)";
      image.style.transform       = translateAxis + "(" + translateValue + "px)";
      setTimeout(function() {
        image.style.transition = "all " + duration + "s linear"; // TRICKY: Safari expects “-webkit-transition” or simply “all”
        image.style.webkitTransform = translateAxis + "(" + (translateValue * -1) + "px)";
        image.style.MozTransform    = translateAxis + "(" + (translateValue * -1) + "px)";
        image.style.msTransform     = translateAxis + "(" + (translateValue * -1) + "px)";
        image.style.transform       = translateAxis + "(" + (translateValue * -1) + "px)";
      }, 1);

      /* TODO: Handle the case where the window gets smaller
      var throttle;
      window.addEventListener('resize', function() {
        if (throttle) clearTimeout(throttle);
        throttle = setTimeout(function() {
          image.style.transition = "";
        }, 100);
      }, false);
      */
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

