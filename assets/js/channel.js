

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// OPTIONAL: Test layout before using animation (see note below about flexible box layout)

/*! modernizr 3.0.0-alpha.4 (Custom Build) | MIT *
 * http://modernizr.com/download/#-flexbox !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,l;for(var f in v){if(e=[],n=v[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],l=s.split("."),1===l.length?Modernizr[l[0]]=o:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=o),C.push((o?"":"no-")+l.join("-"))}}function i(e,n){return function(){return e.apply(n,arguments)}}function s(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?i(o,t||n):o);return!1}function l(e,n){return!!~(""+e).indexOf(n)}function f(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function u(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):b?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function d(){var e=n.body;return e||(e=a(b?"svg":"body"),e.fake=!0),e}function p(e,t,r,o){var i,s,l,f,u="modernizr",p=a("div"),c=d();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:u+(r+1),p.appendChild(l);return i=a("style"),i.type="text/css",i.id="s"+u,(c.fake?c:p).appendChild(i),c.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=_.style.overflow,_.style.overflow="hidden",_.appendChild(c)),s=t(p,e),c.fake?(c.parentNode.removeChild(c),_.style.overflow=f,_.offsetHeight):p.parentNode.removeChild(p),!!s}function c(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(u(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+u(n[o])+":"+r+")");return i=i.join(" or "),p("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function m(e,n,o,i){function s(){d&&(delete E.style,delete E.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=c(e,o);if(!r(u,"undefined"))return u}for(var d,p,m,h,y,v=["modernizr","tspan"];!E.style;)d=!0,E.modElem=a(v.shift()),E.style=E.modElem.style;for(m=e.length,p=0;m>p;p++)if(h=e[p],y=E.style[h],l(h,"-")&&(h=f(h)),E.style[h]!==t){if(i||r(o,"undefined"))return s(),"pfx"==n?h:!0;try{E.style[h]=o}catch(g){}if(E.style[h]!=y)return s(),"pfx"==n?h:!0}return s(),!1}function h(e,n,t,o,i){var l=e.charAt(0).toUpperCase()+e.slice(1),f=(e+" "+S.join(l+" ")+l).split(" ");return r(n,"string")||r(n,"undefined")?m(f,n,o,i):(f=(e+" "+x.join(l+" ")+l).split(" "),s(f,n,t))}function y(e,n,r){return h(e,t,t,n,r)}var v=[],g={_version:"3.0.0-alpha.4",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){v.push({name:e,fn:n,options:t})},addAsyncTest:function(e){v.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=g,Modernizr=new Modernizr;var C=[],w="Moz O ms Webkit",x=g._config.usePrefixes?w.toLowerCase().split(" "):[];g._domPrefixes=x;var S=g._config.usePrefixes?w.split(" "):[];g._cssomPrefixes=S;var _=n.documentElement,b="svg"===_.nodeName.toLowerCase(),z={elem:a("modernizr")};Modernizr._q.push(function(){delete z.elem});var E={style:z.elem.style};Modernizr._q.unshift(function(){delete E.style}),g.testAllProps=h,g.testAllProps=y,Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),o(),delete g.addTest,delete g.addAsyncTest;for(var P=0;P<Modernizr._q.length;P++)Modernizr._q[P]();e.Modernizr=Modernizr}(window,document);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Respond to a few special keys on the keyboard

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


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Add a fullscreen button

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


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Turn the page into an autoplaying slideshow

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

    function getFigure(image) {
      var ancestor = image;
      while ((ancestor = ancestor.parentElement) && ancestor.nodeName && ancestor.nodeName.toLowerCase() !== 'figure');
      if (ancestor && ancestor.nodeName && ancestor.nodeName.toLowerCase() === 'figure') {
        return ancestor;
      }
    }

    function animateImage(image, duration) {
      if (!Modernizr.flexbox) return; // The animation depends on the image being centered via flexible box layout.

      // Only animate the image if it has finished loading and has an aspect ratio class name (which will make the animation look sharp)
      var figure = getFigure(image);

      // The 'data-aspect-ratio' attribute is added by “onChannelImageLoad”
      if (!figure || !figure.getAttribute('data-aspect-ratio')) return;

      var width  = image.naturalWidth;
      var height = image.naturalHeight;
      var animationSpeed = 1/4; // A larger number will show more of the image at a faster pace

      var imageAspectRatio = width / height;
      var viewportAspectRatio = window.innerWidth / window.innerHeight;
      var availableDistance = (Math.abs(imageAspectRatio - viewportAspectRatio) / 2) * 100;

      // Wider aspect than viewport
      if (imageAspectRatio > viewportAspectRatio) {
        var translateAxis = "translateX";
        availableDistance = availableDistance / imageAspectRatio;

      // Taller aspect than viewport
      } else {
        var translateAxis = "translateY";
        availableDistance = availableDistance / viewportAspectRatio;
      }

      var translateValue = (duration > availableDistance) ? availableDistance : duration;
      translateValue = translateValue * animationSpeed;

      // Choose a random direction (up or down, left or right)
      var translateDirection = getRandomInt(0, 2) ? 1 : -1;
      translateValue = translateValue * translateDirection;

      // Randomly decide to zoom in instead of out
      var scaleDirection = getRandomInt(0, 2);

      // Move the image to the start position
      var backward = translateAxis + "(" + translateValue + "%) scale(" + (scaleDirection ? 1.025 : 1) + ")";
      rewindTransition(image, backward);

      // And then move it to the final position
      var forward = translateAxis + "(" + (translateValue * -1) + "%) scale(" + (scaleDirection ? 1 : 1.025) + ")";
      setTimeout(function() {
        playTransition(image, forward, duration);
      }, 1);

      /*
      console.log('********************');
      console.log('image.naturalWidth: ' + image.naturalWidth);
      console.log('image.naturalHeight: ' + image.naturalHeight);
      console.log('window.innerWidth: ' + window.innerWidth);
      console.log('window.innerHeight: ' + window.innerHeight);
      console.log('imageAspectRatio: ' + imageAspectRatio);
      console.log('viewportAspectRatio: ' + viewportAspectRatio);
      console.log('imageAspectRatio > viewportAspectRatio: ' + (imageAspectRatio > viewportAspectRatio));
      console.log('translateAxis: ' + translateAxis);
      console.log('availableDistance: ' + availableDistance);
      console.log('duration: ' + duration);
      console.log('translateValue: ' + translateValue);
      console.log('backward: ' + backward);
      console.log('forward: ' + forward);
      */

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

        // If we haven’t already started animating this image
        // (If this is not the first image, or if there isn’t any text, or if the text is showing)
        if (currentImage > 0 || !text || textShowing) {
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

