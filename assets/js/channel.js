
// This is the JavaScript entry point for the "live channel" page (the actual defined live channels and the individual push channels).


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// OPTIONAL: Make images look nice in browsers that don’t yet support the <picture> element.

// require ('bower_components/picturefill/dist/picturefill');

/*! Picturefill - v2.3.1 - 2015-04-09
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}()),function(a,b,c){"use strict";function d(b){"object"==typeof module&&"object"==typeof module.exports?module.exports=b:"function"==typeof define&&define.amd&&define("picturefill",function(){return b}),"object"==typeof a&&(a.picturefill=b)}function e(a){var b,c,d,e,f,i=a||{};b=i.elements||g.getAllElements();for(var j=0,k=b.length;k>j;j++)if(c=b[j],d=c.parentNode,e=void 0,f=void 0,"IMG"===c.nodeName.toUpperCase()&&(c[g.ns]||(c[g.ns]={}),i.reevaluate||!c[g.ns].evaluated)){if(d&&"PICTURE"===d.nodeName.toUpperCase()){if(g.removeVideoShim(d),e=g.getMatch(c,d),e===!1)continue}else e=void 0;(d&&"PICTURE"===d.nodeName.toUpperCase()||!g.sizesSupported&&c.srcset&&h.test(c.srcset))&&g.dodgeSrcset(c),e?(f=g.processSourceSet(e),g.applyBestCandidate(f,c)):(f=g.processSourceSet(c),(void 0===c.srcset||c[g.ns].srcset)&&g.applyBestCandidate(f,c)),c[g.ns].evaluated=!0}}function f(){function c(){clearTimeout(d),d=setTimeout(h,60)}g.initTypeDetects(),e();var d,f=setInterval(function(){return e(),/^loaded|^i|^c/.test(b.readyState)?void clearInterval(f):void 0},250),h=function(){e({reevaluate:!0})};a.addEventListener?a.addEventListener("resize",c,!1):a.attachEvent&&a.attachEvent("onresize",c)}if(a.HTMLPictureElement)return void d(function(){});b.createElement("picture");var g=a.picturefill||{},h=/\s+\+?\d+(e\d+)?w/;g.ns="picturefill",function(){g.srcsetSupported="srcset"in c,g.sizesSupported="sizes"in c,g.curSrcSupported="currentSrc"in c}(),g.trim=function(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")},g.makeUrl=function(){var a=b.createElement("a");return function(b){return a.href=b,a.href}}(),g.restrictsMixedContent=function(){return"https:"===a.location.protocol},g.matchesMedia=function(b){return a.matchMedia&&a.matchMedia(b).matches},g.getDpr=function(){return a.devicePixelRatio||1},g.getWidthFromLength=function(a){var c;if(!a||a.indexOf("%")>-1!=!1||!(parseFloat(a)>0||a.indexOf("calc(")>-1))return!1;a=a.replace("vw","%"),g.lengthEl||(g.lengthEl=b.createElement("div"),g.lengthEl.style.cssText="border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden",g.lengthEl.className="helper-from-picturefill-js"),g.lengthEl.style.width="0px";try{g.lengthEl.style.width=a}catch(d){}return b.body.appendChild(g.lengthEl),c=g.lengthEl.offsetWidth,0>=c&&(c=!1),b.body.removeChild(g.lengthEl),c},g.detectTypeSupport=function(b,c){var d=new a.Image;return d.onerror=function(){g.types[b]=!1,e()},d.onload=function(){g.types[b]=1===d.width,e()},d.src=c,"pending"},g.types=g.types||{},g.initTypeDetects=function(){g.types["image/jpeg"]=!0,g.types["image/gif"]=!0,g.types["image/png"]=!0,g.types["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),g.types["image/webp"]=g.detectTypeSupport("image/webp","data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")},g.verifyTypeSupport=function(a){var b=a.getAttribute("type");if(null===b||""===b)return!0;var c=g.types[b];return"string"==typeof c&&"pending"!==c?(g.types[b]=g.detectTypeSupport(b,c),"pending"):"function"==typeof c?(c(),"pending"):c},g.parseSize=function(a){var b=/(\([^)]+\))?\s*(.+)/g.exec(a);return{media:b&&b[1],length:b&&b[2]}},g.findWidthFromSourceSize=function(c){for(var d,e=g.trim(c).split(/\s*,\s*/),f=0,h=e.length;h>f;f++){var i=e[f],j=g.parseSize(i),k=j.length,l=j.media;if(k&&(!l||g.matchesMedia(l))&&(d=g.getWidthFromLength(k)))break}return d||Math.max(a.innerWidth||0,b.documentElement.clientWidth)},g.parseSrcset=function(a){for(var b=[];""!==a;){a=a.replace(/^\s+/g,"");var c,d=a.search(/\s/g),e=null;if(-1!==d){c=a.slice(0,d);var f=c.slice(-1);if((","===f||""===c)&&(c=c.replace(/,+$/,""),e=""),a=a.slice(d+1),null===e){var g=a.indexOf(",");-1!==g?(e=a.slice(0,g),a=a.slice(g+1)):(e=a,a="")}}else c=a,a="";(c||e)&&b.push({url:c,descriptor:e})}return b},g.parseDescriptor=function(a,b){var c,d=b||"100vw",e=a&&a.replace(/(^\s+|\s+$)/g,""),f=g.findWidthFromSourceSize(d);if(e)for(var h=e.split(" "),i=h.length-1;i>=0;i--){var j=h[i],k=j&&j.slice(j.length-1);if("h"!==k&&"w"!==k||g.sizesSupported){if("x"===k){var l=j&&parseFloat(j,10);c=l&&!isNaN(l)?l:1}}else c=parseFloat(parseInt(j,10)/f)}return c||1},g.getCandidatesFromSourceSet=function(a,b){for(var c=g.parseSrcset(a),d=[],e=0,f=c.length;f>e;e++){var h=c[e];d.push({url:h.url,resolution:g.parseDescriptor(h.descriptor,b)})}return d},g.dodgeSrcset=function(a){a.srcset&&(a[g.ns].srcset=a.srcset,a.srcset="",a.setAttribute("data-pfsrcset",a[g.ns].srcset))},g.processSourceSet=function(a){var b=a.getAttribute("srcset"),c=a.getAttribute("sizes"),d=[];return"IMG"===a.nodeName.toUpperCase()&&a[g.ns]&&a[g.ns].srcset&&(b=a[g.ns].srcset),b&&(d=g.getCandidatesFromSourceSet(b,c)),d},g.backfaceVisibilityFix=function(a){var b=a.style||{},c="webkitBackfaceVisibility"in b,d=b.zoom;c&&(b.zoom=".999",c=a.offsetWidth,b.zoom=d)},g.setIntrinsicSize=function(){var c={},d=function(a,b,c){b&&a.setAttribute("width",parseInt(b/c,10))};return function(e,f){var h;e[g.ns]&&!a.pfStopIntrinsicSize&&(void 0===e[g.ns].dims&&(e[g.ns].dims=e.getAttribute("width")||e.getAttribute("height")),e[g.ns].dims||(f.url in c?d(e,c[f.url],f.resolution):(h=b.createElement("img"),h.onload=function(){if(c[f.url]=h.width,!c[f.url])try{b.body.appendChild(h),c[f.url]=h.width||h.offsetWidth,b.body.removeChild(h)}catch(a){}e.src===f.url&&d(e,c[f.url],f.resolution),e=null,h.onload=null,h=null},h.src=f.url)))}}(),g.applyBestCandidate=function(a,b){var c,d,e;a.sort(g.ascendingSort),d=a.length,e=a[d-1];for(var f=0;d>f;f++)if(c=a[f],c.resolution>=g.getDpr()){e=c;break}e&&(e.url=g.makeUrl(e.url),b.src!==e.url&&(g.restrictsMixedContent()&&"http:"===e.url.substr(0,"http:".length).toLowerCase()?void 0!==window.console&&console.warn("Blocked mixed content image "+e.url):(b.src=e.url,g.curSrcSupported||(b.currentSrc=b.src),g.backfaceVisibilityFix(b))),g.setIntrinsicSize(b,e))},g.ascendingSort=function(a,b){return a.resolution-b.resolution},g.removeVideoShim=function(a){var b=a.getElementsByTagName("video");if(b.length){for(var c=b[0],d=c.getElementsByTagName("source");d.length;)a.insertBefore(d[0],c);c.parentNode.removeChild(c)}},g.getAllElements=function(){for(var a=[],c=b.getElementsByTagName("img"),d=0,e=c.length;e>d;d++){var f=c[d];("PICTURE"===f.parentNode.nodeName.toUpperCase()||null!==f.getAttribute("srcset")||f[g.ns]&&null!==f[g.ns].srcset)&&a.push(f)}return a},g.getMatch=function(a,b){for(var c,d=b.childNodes,e=0,f=d.length;f>e;e++){var h=d[e];if(1===h.nodeType){if(h===a)return c;if("SOURCE"===h.nodeName.toUpperCase()){null!==h.getAttribute("src")&&void 0!==typeof console&&console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");var i=h.getAttribute("media");if(h.getAttribute("srcset")&&(!i||g.matchesMedia(i))){var j=g.verifyTypeSupport(h);if(j===!0){c=h;break}if("pending"===j)return!1}}}}return c},f(),e._=g,d(e)}(window,window.document,new window.Image);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// OPTIONAL: Test layout before using animation (see “animateImage”).

/*! modernizr 3.0.0-alpha.4 (Custom Build) | MIT *
 * http://modernizr.com/download/#-flexbox !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,l;for(var f in v){if(e=[],n=v[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],l=s.split("."),1===l.length?Modernizr[l[0]]=o:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=o),C.push((o?"":"no-")+l.join("-"))}}function i(e,n){return function(){return e.apply(n,arguments)}}function s(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?i(o,t||n):o);return!1}function l(e,n){return!!~(""+e).indexOf(n)}function f(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function u(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):b?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function d(){var e=n.body;return e||(e=a(b?"svg":"body"),e.fake=!0),e}function p(e,t,r,o){var i,s,l,f,u="modernizr",p=a("div"),c=d();if(parseInt(r,10))for(;r--;)l=a("div"),l.id=o?o[r]:u+(r+1),p.appendChild(l);return i=a("style"),i.type="text/css",i.id="s"+u,(c.fake?c:p).appendChild(i),c.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=_.style.overflow,_.style.overflow="hidden",_.appendChild(c)),s=t(p,e),c.fake?(c.parentNode.removeChild(c),_.style.overflow=f,_.offsetHeight):p.parentNode.removeChild(p),!!s}function c(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(u(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+u(n[o])+":"+r+")");return i=i.join(" or "),p("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function m(e,n,o,i){function s(){d&&(delete E.style,delete E.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=c(e,o);if(!r(u,"undefined"))return u}for(var d,p,m,h,y,v=["modernizr","tspan"];!E.style;)d=!0,E.modElem=a(v.shift()),E.style=E.modElem.style;for(m=e.length,p=0;m>p;p++)if(h=e[p],y=E.style[h],l(h,"-")&&(h=f(h)),E.style[h]!==t){if(i||r(o,"undefined"))return s(),"pfx"==n?h:!0;try{E.style[h]=o}catch(g){}if(E.style[h]!=y)return s(),"pfx"==n?h:!0}return s(),!1}function h(e,n,t,o,i){var l=e.charAt(0).toUpperCase()+e.slice(1),f=(e+" "+S.join(l+" ")+l).split(" ");return r(n,"string")||r(n,"undefined")?m(f,n,o,i):(f=(e+" "+x.join(l+" ")+l).split(" "),s(f,n,t))}function y(e,n,r){return h(e,t,t,n,r)}var v=[],g={_version:"3.0.0-alpha.4",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){v.push({name:e,fn:n,options:t})},addAsyncTest:function(e){v.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=g,Modernizr=new Modernizr;var C=[],w="Moz O ms Webkit",x=g._config.usePrefixes?w.toLowerCase().split(" "):[];g._domPrefixes=x;var S=g._config.usePrefixes?w.split(" "):[];g._cssomPrefixes=S;var _=n.documentElement,b="svg"===_.nodeName.toLowerCase(),z={elem:a("modernizr")};Modernizr._q.push(function(){delete z.elem});var E={style:z.elem.style};Modernizr._q.unshift(function(){delete E.style}),g.testAllProps=h,g.testAllProps=y,Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),o(),delete g.addTest,delete g.addAsyncTest;for(var P=0;P<Modernizr._q.length;P++)Modernizr._q[P]();e.Modernizr=Modernizr}(window,document);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Respond to a few special keys on the keyboard.

(function() {
    if (!document.querySelector || !document.addEventListener) return;

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

})();


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Add a fullscreen button

var fullscreenActive;
(function() {

  function showFullscreen(e) {
    console.log('showFullscreen');
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      fullscreenActive = true;
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
      fullscreenActive = true;
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
      fullscreenActive = true;
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      fullscreenActive = true;
    }

    // If fullscreen mode isn’t supported and we’re inside an iframe, let the default browser action continue.
    var isIframe = (top.location !== self.location);

    if (e && (fullscreenActive || !isIframe)) {
      e.preventDefault();
    }
  }

  function exitFullscreen(e) {
    console.log('exitFullscreen');
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullscreenActive = false;
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      fullscreenActive = false;
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      fullscreenActive = false;
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      fullscreenActive = false;
    }

    if (e) e.preventDefault();
  }

  function fullscreenAvailable() {      
    return (document.documentElement.requestFullscreen ||
            document.documentElement.msRequestFullscreen ||
            document.documentElement.mozRequestFullScreen ||
            document.documentElement.webkitRequestFullscreen ||
            top.location !== self.location); // If fullscreen mode isn’t supported and we’re inside an iframe, we’ll open a new window instead.
  }


  function fullscreenElementActive() {      
    return (document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullscreenElement ||
            document.webkitFullscreenElement);
  }

  function update(e) {
    console.log('update');
    if (!fullscreenActive) {
      showFullscreen(e);
      button.innerHTML = exitTemplate.innerHTML;
    } else {
      exitFullscreen(e);
      button.innerHTML = template.innerHTML;
    }
  }

  function toggle(e) {

    // If the user is pressing a modifier key, let the browser handle it
    if (e && (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) return;

    update(e);
  }

  var template     = document.getElementById('fullscreen-template');
  var exitTemplate = document.getElementById('exit-fullscreen-template');

  // If we have all of the features we need…
  if (fullscreenAvailable() && (document.addEventListener || document.body.attachEvent) && template && exitTemplate) {

    // Show the button
    var button = document.createElement('div');
    button.innerHTML = template.innerHTML;
    template.parentNode.insertBefore(button, template);

    fullscreenActive = false; //fullscreenElementActive();

    if (button.addEventListener) {
      button.addEventListener('click', toggle, false);
    } else if (button.attachEvent) {
      button.attachEvent('click', toggle);
    }
  }

})();


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Turn the page into an autoplaying slideshow

(function() {

    if (!document.querySelector || !document.addEventListener) return;

    var textShowing;
    var currentItem;
    var currentImage;
    var lastItem;
    var lastImage;
    var timer;

    function hasClassName(element, className) {
      if (!element || !className) return;
      return element.className.indexOf(className) >= 0;
    }

    function addClassName(element, className) {
      if (!element || !className) return;
      if (hasClassName(element, className)) return;
      element.className += ' ' + className;
    }

    function removeClassName(element, className) {
      if (!element || !className) return;
      var regex = eval('/[\s]*' + className + '/g');
      element.className = element.className.replace(regex, '');
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

    function getNextItem() {
      var candidate = currentItem;
      if (candidate.nextSibling) {
        candidate = candidate.nextSibling;
        do {
          if (candidate && candidate.nodeType === 1) break;
        } while (candidate = candidate.nextSibling);
      } else {
        candidate = document.querySelector('main .list .item');
      }

      if (!candidate || candidate.nodeType !== 1) candidate = document.querySelector('main .list .item');
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
        candidate = document.querySelector('main .list .item:last-child');
      }

      if (!candidate || candidate.nodeType !== 1) candidate = document.querySelector('main .list .item:last-child');
      return candidate;
    }

    function nextPage(instant) {
      lastItem = currentItem;
      currentItem = getNextItem();
      updatePage(instant);
    }

    function previousPage(instant) {
      lastItem = currentItem;
      currentItem = getPreviousItem();
      updatePage(instant);
    }

    function updatePage(instant) {
      var items = document.querySelectorAll('main .list .item');

      /*
      //currentItem.style.zIndex = 0;
      if (lastItem) {
        //lastItem.style.zIndex = 1;
        if (!instant) addClassName(lastItem, 'transition');
        if (lastItem.querySelectorAll('figure').length < 1) {
          if (!instant) addClassName(currentItem, 'transition');
        } else {
          removeClassName(currentItem, 'transition');
        }
        addClassName(lastItem, 'inactive');
      } else {
        removeClassName(currentItem, 'transition');
      }
      */

      if (lastItem) addClassName(lastItem, 'inactive');
      removeClassName(currentItem, 'inactive');

      textShowing = false;
      currentImage = 0;
      lastImage = undefined;
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
      var dataElement = item.querySelector('*[data-slide-type]');
      return {
        name  : dataElement.getAttribute('data-push-name'),
        body  : dataElement.getAttribute('data-push-body'),
        url   : dataElement.getAttribute('data-push-url'),
        color : dataElement.getAttribute('data-push-color'),
        type  : dataElement.getAttribute('data-slide-type')
      };
    }

    function updatePushData(current, last) {
      var channel     = document.querySelector('.push-channel');
      var link        = document.querySelector('.push-channel h1 a');
      var description = document.querySelector('.push-channel > header .details p');

      link.innerHTML = current.name;
      link.href      = current.url;
      if (description) description.innerHTML = current.body;
      removeClassName(channel, last.color);
      addClassName(channel, current.color);

      if (current.type === 'ctzn') {
        removeClassName(document.body, 'push-title-only');
           addClassName(document.body, 'ctzn-title-only');
      } else if (current.type === 'push') {
        removeClassName(document.body, 'ctzn-title-only');
           addClassName(document.body, 'push-title-only');
      } else {
        removeClassName(document.body, 'push-title-only');
        removeClassName(document.body, 'ctzn-title-only');
      }
    }

    function updateNavigation() {
      var next = document.querySelector('nav .next a');
      if (next) next.href = next.href.replace(/page=[0-9]+/, 'page=' + (getItemNumber(getNextItem()) + 1));

      var previous = document.querySelector('nav .previous a');
      if (previous) previous.href = previous.href.replace(/page=[0-9]+/, 'page=' + (getItemNumber(getPreviousItem()) + 1));
    }

    function preloadItems() {
      if (!window.dataItemsCount) window.dataItemsCount = Number(document.querySelector('.list').getAttribute('data-post-count'));

      for (var index = 0; index < window.dataItemsCount; index++) {
        if (nearCurrentSlide(index, window.dataItemsCount)) {
          addItem(index);
        }
      }

      // OPTIONAL: Remove posts that aren’t near the current post, to save memory (and bandwidth when resizing the images/window)
      var posts = document.querySelectorAll('.list .item');
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

      var html = (window.dataItems && window.dataItems[index]) ? dataItems[index] : template ? template.innerHTML : null;

      if (html == null) {
        return;
      }

      var item = document.createElement('div');

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // OPTIONAL: Picturefill (part 1)
      //
      //           Move the “src” attribute of the <img> element to a data attribute, if running picturefill (to avoid a double download)
      //           (Later, we’ll manually move it back, if picturefill has trouble choosing an image.)
      //
      // TRICKY:   Internet Explorer 9 needs a “src” or “srcset” on the <img>, due to a bug with <source> elements:
      //           http://scottjehl.github.io/picturefill/examples/demo-02.html
      //
      // KUDOS: http://stackoverflow.com/questions/10964966/detect-ie-version-prior-to-v9-in-javascript#answer-10965203
      function isIE9() {
        var div = document.createElement("div");
        div.innerHTML = "<!--[if IE 9]><i></i><![endif]-->";
        return div.getElementsByTagName("i").length === 1;
      }

      if (window.picturefill && !isIE9()) {
        html = html.replace(/(<img class="figure")[\s]+src="([^"]*)"/g, function(match, p1, p2) { return p1 + 'data-channel-src="' + p2 + '"'; });
      }
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      item.className = 'item inactive';
      item.innerHTML = html;
      item.id = 'item-' + index;

      // Look for the next number up from the item we’re adding (so it will appear in the correct order)
      var target = closestToNumber(index, document.querySelectorAll('.list .item'));
      if (target) {
        document.querySelector('.list').insertBefore(item, target);
      } else {
        document.querySelector('.list').appendChild(item);
      }

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // OPTIONAL: Picturefill (part 2)
      //
      // (Highly recommended if running part 1)
      //
      if (window.picturefill) {
        var images = item.querySelectorAll('img');

        // Run picturefill on the new images: https://scottjehl.github.io/picturefill/#api
        window.picturefill({ elements: images });

        // Handle the case where picturefill doesn’t choose an image.
        for (var index = 0; index < images.length; index++) {
          var image = images[index];
          if (!image.getAttribute('src') || image.getAttribute('src') === '') {
            var originalSource = image.getAttribute('data-channel-src');
            if (originalSource) {
              image.setAttribute('src', originalSource);
            } else {
              if (console && console.error) console.error('Something went wrong while using picturefill. The “src” attribute of an image is missing.');
            }
          }
        }
      }
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

      // SHIM: Handle the case where one slide is near the end of the list and the other is near the beginning (since the slides run in a loop)
      if (index < RANGE && currentIndex > RANGE) index += length; // [current slide] [end of list] [target slide]
      if (currentIndex < RANGE && index > RANGE) index -= length; // [target slide] [end of list] [current slide]

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


    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

    var cancelAnimationFrame  = window.cancelAnimationFrame ||
                                window.mozCancelAnimationFrame ||
                                window.webkitCancelAnimationFrame ||
                                window.msCancelAnimationFrame;

    function animateImage(image, duration) {
      if (!Modernizr.flexbox || !requestAnimationFrame) return; // The animation depends on the image being centered via flexible box layout.

      // Only animate the image if it has finished loading and has an aspect ratio class name (which will make the animation look sharp)
      var figure = getFigure(image);

      // The 'data-aspect-ratio' attribute is added by “onChannelImageLoad”
      if (!figure || !figure.getAttribute('data-aspect-ratio') || imageLoaded(figure) === false) return;

      var width  = image.naturalWidth;
      var height = image.naturalHeight;
      var animationSpeed = 1; // A larger number will show more of the image at a faster pace

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

      var translateValue = (duration / 2 > availableDistance) ? availableDistance : duration / 2;
      translateValue = translateValue * animationSpeed;

      // Choose a random direction (up or down, left or right)
      var translateDirection = getRandomInt(0, 2) ? 1 : -1;
      translateValue = translateValue * translateDirection;

      // Randomly decide to zoom in instead of out
      var scaleDirection = getRandomInt(0, 2);

      var scaleValue = 1.025;

      // OPTIONAL: Scale more if we’re only translating a little
      /*
      if (translateValue < duration / 2) {
        scaleValue = 1 + ((duration / 2) / 50);
      }
      */

      // Move the image to the start position
      var backward = translateAxis + "(" + translateValue + "%) scale(" + (scaleDirection ? scaleValue : 1) + ")";

      // And then move it to the final position
      var forward = translateAxis + "(" + (translateValue * -1) + "%) scale(" + (scaleDirection ? 1 : scaleValue) + ")";

      var animation;
      function animate() {
        if (requestAnimationFrame) {
          rewindTransition(image, backward);

          // TRICKY: Wait one frame before animating (to give “rewindTransition” time to render).
          //animation = requestAnimationFrame(function() {
            playTransition(image, forward, duration);
          //});
        }
      }
      animate();

      // Stop the transition if the window changes size
      var throttle;
      function onWindowResize() {
        if (throttle) clearTimeout(throttle);
        throttle = setTimeout(function() {
          if (animation && cancelAnimationFrame) cancelAnimationFrame(animation);
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

    // Return “true” if the image data has started arriving.
    var testImage = new Image();
    var naturalWidthSupported = ('naturalWidth' in testImage);
    function imageLoaded(figure) {
      var image = figure.querySelector('img');
      if (naturalWidthSupported) {

        // If the image has dimensions
        if (image.naturalWidth > 0 && image.naturalHeight > 0) {

          // Calculate the aspect ratio
          if (window.onChannelImageLoad) window.onChannelImageLoad(image);

          // And assume it has loaded
          return true;

        // If the image didn’t fail to load
        } else if (!figure.getAttribute('data-no-dimensions')) {

          // Assume it’s still loading
          return false;
        }
      }

      // Return nothing if we don’t know.
      return;
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
        removeClassName(text, 'inactive');
        textShowing = true;
        if (images.length > 0) nextStep = next;

        // Show the text long enough to be readable
        duration = textDuration(text);

      // …Or if the text is already showing, hide it.
      } else {

        // If the current image has finished loading
        if (images[currentImage] && imageLoaded(images[currentImage]) !== false) {
          if (text) {
            //addClassName(text, 'transition');
            addClassName(text, 'inactive');
          }
          textShowing = false;
        }
      }

      // If there are images to show
      if (images.length > 0) {

        // Hide all of the images
        if (!lastImage) {
          for (var index = 0; index < images.length; index++) {
            if (index !== currentImage) {
              addClassName(images[index], 'inactive');
            }
          }
        }

        if (lastImage && lastImage !== currentImage) addClassName(images[lastImage], 'inactive');
        //addClassName(images[currentImage], 'transition');
        removeClassName(images[currentImage], 'inactive');

        var animationDuration = duration;

        // If this is the first image, and text is showing
        if (currentImage === 0 && text && textShowing) {
          animationDuration = textDuration(text) + textImageDuration(text);
        }

        var slideTransitionDelay = 1;
        animationDuration += slideTransitionDelay;

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

          // If the current image has finished loading
          if (images[currentImage] && imageLoaded(images[currentImage]) !== false) {
            nextStep = next;

            // If the text isn’t showing
            if (!textShowing) {

              // Display the next image
              lastImage = currentImage;
              currentImage++;
            }
          }
        }
      }

      // If the current image hasn’t finished loading
      if (images[currentImage] && imageLoaded(images[currentImage]) === false) {
        nextStep = next;
        addClassName(document.body, 'loading');

      } else if (hasClassName(document.body, 'loading')) {
        removeClassName(document.body, 'loading');

        // If the current image just finished loading, show it for double the usual duration.
        if (images[currentImage] && imageLoaded(images[currentImage]) === true) {
          duration = 6;
        }
      }

      if (!paused) {
        timer = setTimeout(nextStep, duration * 1000);
        removeClassName(document.body, 'paused');
           addClassName(document.body, 'autoplaying');
      }
    }

    var paused = true;
    function startPlaying() {
      if (!paused) return;
      paused = false;
      updatePage();
    }

    function stopPlaying() {
      paused = true;
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      addClassName(document.body, 'paused');
    }

    function togglePlaying() {
      if (paused) {
        startPlaying();
      } else {
        stopPlaying();
      }
    }

    function startOver() {
      addItem(0);
      lastItem = currentItem;
      currentItem = document.getElementById('item-0');
      updatePage();
    }
    window.dataItemsStartOver = startOver;

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


    (function() {

      // Start with the first item
      var items = document.querySelectorAll('main .list .item');
      currentItem = items[0];

      // Hide all of the items
      for (var index = 0; index < items.length; index++) {

        // …except the active item
        if (items[index] !== currentItem) {
          addClassName(items[index], 'inactive');
        }
      }
    })();

    document.querySelector('nav').addEventListener('click', function(e) {

      // If the user is pressing a modifier key, let the browser handle it
      if (e && (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) return;

      var item = closest(e.target, 'li');
      var instant = true;
      if (item) {
        if (timer) clearTimeout(timer);
        if (item.className === 'next') {
          nextPage(instant);
        } else {
          previousPage(instant);
        }

        e.preventDefault();
      }
    }, false);

    if (window.location.href.match(/[?|&]paused=/)) {
      stopPlaying();
    } else {
      startPlaying();
    }

    // Listen for “pause” requests from the parent page (if we’re inside an iframe)
    window.addEventListener("message", function(e) {
      if (fullscreenActive === true) return;
      if (e.data === 'pause') {
        stopPlaying();
      } else if (e.data === 'play') {
        startPlaying();
      }
    }, false)

})();


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Periodically retrieve updated list of posts

(function() {

  var updateEvery = 5 * 60; // 5 minutes

  var inProgress = false;
  function updateItemsData() {

    // Only send one request at a time
    if (inProgress) return;

    var xhr = new XMLHttpRequest();
    function onResponse() {
      if (xhr.readyState != 4) return;
      inProgress = false;

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
        if (count > 0) {
          window.dataItems = items;

          // If the number of slides changed, start over with the first slide.
          if (window.dataItemsCount && (window.dataItemsCount !== count)) window.dataItemsStartOver();

          window.dataItemsCount = count;
        }
      }
      catch (e) {
        // Fail silently and just let the current push data remain (don't want to interrupt the UX)
        if (console && console.error) console.error('ERROR getting posts via XHR', e);
      }

    };
    var url = window.location.href;
    xhr.onreadystatechange = onResponse;
    xhr.open('GET', url);
    xhr.send();
    inProgress = true;
  }

  setInterval(updateItemsData, updateEvery * 1000);
})();

