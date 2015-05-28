# CTZN User Interface

These are HTML prototypes that represent the CTZN app.

The site is published on GitHub:
<http://goodinc.github.io/ctzn-ui/>

## Project Goals

* Make the app load fast.

* Use minimal bandwidth for images and styles.

* Make the app usable on any device.

* Make the app look good in modern browsers on any size screen.

* Make the app accessible for users with diverse input devices, like touchscreens and screen readers.

* Use simple, consistent HTML patterns to make integration with templates easy.

* Use simple, consistent CSS patterns so rules and selectors can be reused.



# Handy regular expressions.

These have been useful for updating files in this repository. (For example, using search and replace in Sublime Text)


## Replace the icons in each HTML file (to add new icons)…

<!-- images/icons.svg -->[\s<a-z0-9A-Z="\.:/>,-/#]+?(?=</svg>)</svg>


## Replace the styles in HTML emails with the latest CSS…

<!-- https://github.com/goodinc/ctzn-ui/blob/gh-pages/assets/css/email.css -->(.|\s)+?(?=</style>)</style>


## Remove knockout attributes (to reduce the HTML to a bare minimum)…

 data-bind="[^"]*"


## Remove knockout elements…

<!-- ko [^-]* -->
<!-- /ko -->


## Find the icon elements within a label…

<label>([\s]+)<svg class="icon"([^>]*)><use xlink:href="#([^"]+)"></use><foreignobject>([^<]+)</foreignobject></svg><br />

And replace…
<label>$1<svg class="icon"$2><use xlink:href="#$3"></use></svg><span>$4</span><br />
