# CTZN User Interface

These are HTML and CSS patterns for [ctznapp.com](http://ctznapp.com) and [getctzn.com](http://getctzn.com)

The patterns are published on GitHub:
<http://goodinc.github.io/ctzn-ui/>

## Project Goals

* Make the interface load quickly.

* Use minimal bandwidth for images and styles.

* Make the interface usable on any device.

* Make the interface look good in modern browsers on any size screen.

* Make the interface accessible for users with diverse input devices, like touchscreens and screen readers.

* Use simple, consistent HTML patterns to make integration with templates easy.

* Use simple, consistent CSS patterns so rules and selectors can be reused.



## Handy regular expressions

These are useful for updating files in this repository (for example, using search and replace in a text editor like Sublime Text).


### Find the icons in each HTML file…

    <!-- images/icons.svg -->[\s<a-z0-9A-Z="\.:/>,-/#]+?(?=</svg>)</svg>


### Find knockout attributes…

    data-bind="[^"]*"


### Find knockout elements…

    <!-- ko [^-]* -->


### Find the icon elements within a label…

    <label>([\s]+)<svg class="icon"([^>]*)><use xlink:href="#([^"]+)"></use><foreignobject>([^<]+)</foreignobject></svg><br />

#### And replace…

    <label>$1<svg class="icon"$2><use xlink:href="#$3"></use></svg><span>$4</span><br />

